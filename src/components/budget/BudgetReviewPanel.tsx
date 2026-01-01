import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Edit2, Save, X, Download, IndianRupee } from 'lucide-react'
import { toast } from 'sonner'

interface BudgetReviewPanelProps {
  projectId: string
  roomId: string
  renderId: string
}

export function BudgetReviewPanel({ projectId, roomId, renderId }: BudgetReviewPanelProps) {
  const queryClient = useQueryClient()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<{ quantity: number; custom_price: number | null }>({ quantity: 1, custom_price: null })

  // Fetch budget items
  const { data: budgetItems, isLoading } = useQuery({
    queryKey: ['budget-items', renderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items')
        .select('*')
        .eq('render_id', renderId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data
    }
  })

  // Update budget item mutation
  const updateMutation = useMutation({
    mutationFn: async (item: { id: string; quantity: number; custom_price: number | null }) => {
      const { data, error } = await supabase
        .from('budget_items')
        .update({
          quantity: item.quantity,
          custom_price: item.custom_price,
          user_edited: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', item.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items', renderId] })
      toast.success('Item updated successfully')
      setEditingId(null)
    },
    onError: (error) => {
      toast.error(`Failed to update item: ${error.message}`)
    }
  })

  // Approve item mutation
  const approveMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { data, error } = await supabase
        .from('budget_items')
        .update({ status: 'approved' })
        .eq('id', itemId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items', renderId] })
      toast.success('Item approved')
    }
  })

  // Reject item mutation
  const rejectMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { data, error } = await supabase
        .from('budget_items')
        .update({ status: 'rejected' })
        .eq('id', itemId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-items', renderId] })
      toast.success('Item rejected')
    }
  })

  // Export to CSV
  const handleExportExcel = async () => {
    if (!budgetItems) return

    const approvedItems = budgetItems.filter(item => item.status === 'approved')
    if (approvedItems.length === 0) {
      toast.error('No approved items to export')
      return
    }

    const excelData = approvedItems.map(item => ({
      'Item Name': item.item_name,
      'Category': item.category,
      'Specification': item.specification || '-',
      'Unit': item.unit,
      'Quantity': item.quantity,
      'Rate (₹)': item.rate,
      'Amount (₹)': item.amount || 0,
      'GST %': item.gst_percent,
      'GST Amount (₹)': item.gst_amount || 0,
      'Total (₹)': item.total || 0
    }))

    const headers = Object.keys(excelData[0])
    const csv = [
      headers.join(','),
      ...excelData.map(row => headers.map(h => `"${row[h as keyof typeof row]}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `budget_${projectId}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast.success('Budget exported successfully')
  }

  // Calculate totals
  const summary = budgetItems?.reduce(
    (acc, item) => {
      if (item.status === 'approved') {
        acc.amount += item.amount || 0
        acc.gst += item.gst_amount || 0
        acc.total += item.total || 0
        acc.count += 1
      }
      return acc
    },
    { amount: 0, gst: 0, total: 0, count: 0 }
  ) || { amount: 0, gst: 0, total: 0, count: 0 }

  const handleEdit = (item: typeof budgetItems[0]) => {
    setEditingId(item.id)
    setEditForm({
      quantity: item.quantity,
      custom_price: item.custom_price || item.rate
    })
  }

  const handleSave = () => {
    if (!editingId) return
    updateMutation.mutate({ id: editingId, ...editForm })
  }

  const getConfidenceBadge = (confidence: number | null) => {
    const conf = confidence || 0
    if (conf >= 0.8) return <Badge className="bg-green-500">High {Math.round(conf * 100)}%</Badge>
    if (conf >= 0.6) return <Badge className="bg-yellow-500">Medium {Math.round(conf * 100)}%</Badge>
    return <Badge className="bg-red-500">Low {Math.round(conf * 100)}%</Badge>
  }

  const getMatchBadge = (strategy: string | null) => {
    const badges: Record<string, { color: string; label: string }> = {
      exact: { color: 'bg-green-600', label: 'Exact Match' },
      synonym: { color: 'bg-blue-600', label: 'Synonym' },
      fuzzy: { color: 'bg-orange-600', label: 'Fuzzy Match' },
      llm: { color: 'bg-purple-600', label: 'AI Match' }
    }
    const badge = badges[strategy || ''] || { color: 'bg-gray-600', label: 'Unmatched' }
    return <Badge className={badge.color}>{badge.label}</Badge>
  }

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading budget items...</div>
  }

  if (!budgetItems || budgetItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Budget Items</CardTitle>
          <CardDescription>
            No items have been extracted from this render yet.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budget Review</h2>
          <p className="text-muted-foreground">Review AI-extracted items</p>
        </div>
        <Button onClick={handleExportExcel} disabled={summary.count === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      <div className="space-y-4">
        {budgetItems.map((item) => (
          <Card key={item.id} className={item.status === 'rejected' ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.item_name}</CardTitle>
                  <CardDescription>{item.specification || item.category}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    {getConfidenceBadge(item.ai_confidence)}
                    {getMatchBadge(item.match_strategy)}
                    <Badge variant="outline" className="capitalize">{item.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.status === 'pending' && (
                    <>
                      {editingId === item.id ? (
                        <>
                          <Button size="sm" onClick={handleSave}><Save className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}><X className="w-4 h-4" /></Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}><Edit2 className="w-4 h-4" /></Button>
                          <Button size="sm" onClick={() => approveMutation.mutate(item.id)}><CheckCircle2 className="w-4 h-4 mr-1" />Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(item.id)}><X className="w-4 h-4 mr-1" />Reject</Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === item.id ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input type="number" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: parseInt(e.target.value) })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Custom Price (₹)</label>
                    <Input type="number" value={editForm.custom_price || ''} onChange={(e) => setEditForm({ ...editForm, custom_price: parseFloat(e.target.value) })} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-4 text-sm">
                  <div><p className="text-muted-foreground">Quantity</p><p className="font-semibold">{item.quantity} {item.unit}</p></div>
                  <div><p className="text-muted-foreground">Rate</p><p className="font-semibold">₹{(item.custom_price || item.rate).toLocaleString('en-IN')}</p></div>
                  <div><p className="text-muted-foreground">Amount</p><p className="font-semibold">₹{(item.amount || 0).toLocaleString('en-IN')}</p></div>
                  <div><p className="text-muted-foreground">GST ({item.gst_percent}%)</p><p className="font-semibold">₹{(item.gst_amount || 0).toLocaleString('en-IN')}</p></div>
                  <div><p className="text-muted-foreground">Total</p><p className="font-semibold text-green-600">₹{(item.total || 0).toLocaleString('en-IN')}</p></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><IndianRupee className="w-5 h-5" />Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><p className="text-muted-foreground text-sm">Approved Items</p><p className="text-2xl font-bold">{summary.count}</p></div>
            <div><p className="text-muted-foreground text-sm">Amount</p><p className="text-2xl font-bold">₹{summary.amount.toLocaleString('en-IN')}</p></div>
            <div><p className="text-muted-foreground text-sm">GST</p><p className="text-2xl font-bold text-orange-600">₹{summary.gst.toLocaleString('en-IN')}</p></div>
            <div><p className="text-muted-foreground text-sm">Grand Total</p><p className="text-3xl font-bold text-green-600">₹{summary.total.toLocaleString('en-IN')}</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
