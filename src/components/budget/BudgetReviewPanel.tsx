import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle2, Edit2, Save, X, Download, IndianRupee } from 'lucide-react'
import { toast } from 'sonner'

interface BudgetReviewPanelProps {
  projectId: string
  roomId: string
  renderId: string
}

interface BudgetItem {
  id: string
  ai_item_name: string
  ai_confidence: number
  ai_category: string
  quantity: number
  pricing_item_id: string | null
  match_strategy: string | null
  match_confidence: number
  alternative_matches: any[]
  city_id: string
  base_price: number | null
  city_price: number | null
  subtotal: number | null
  gst_rate: number
  gst_amount: number | null
  total: number | null
  status: 'pending' | 'approved' | 'rejected' | 'unmatched'
  user_edited: boolean
  custom_price: number | null
  user_notes: string | null
  pricing_items?: {
    item_name: string
    specification: string
    recommended_brands: string
    unit: string
  }
  cities?: {
    city_name: string
  }
}

export function BudgetReviewPanel({ projectId, roomId, renderId }: BudgetReviewPanelProps) {
  const queryClient = useQueryClient()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  // Fetch budget items
  const { data: budgetItems, isLoading } = useQuery({
    queryKey: ['budget-items', renderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items')
        .select(`
          *,
          pricing_items(*),
          cities(*)
        `)
        .eq('render_id', renderId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data as BudgetItem[]
    }
  })

  // Update budget item mutation
  const updateMutation = useMutation({
    mutationFn: async (item: Partial<BudgetItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('budget_items')
        .update({
          quantity: item.quantity,
          custom_price: item.custom_price,
          user_notes: item.user_notes,
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
        .update({
          status: 'approved',
          approved_at: new Date().toISOString()
        })
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

  // Export to Excel
  const handleExportExcel = async () => {
    if (!budgetItems) return

    // Create Excel-compatible data
    const excelData = budgetItems
      .filter(item => item.status === 'approved')
      .map(item => ({
        'Item Name': item.pricing_items?.item_name || item.ai_item_name,
        'Specification': item.pricing_items?.specification || '-',
        'Unit': item.pricing_items?.unit || 'piece',
        'Quantity': item.quantity,
        'Rate (₹)': item.city_price || item.custom_price || 0,
        'Subtotal (₹)': item.subtotal || 0,
        'GST %': item.gst_rate,
        'GST Amount (₹)': item.gst_amount || 0,
        'Total (₹)': item.total || 0,
        'Notes': item.user_notes || '-'
      }))

    // Convert to CSV (simple Excel compatibility)
    const headers = Object.keys(excelData[0])
    const csv = [
      headers.join(','),
      ...excelData.map(row => headers.map(h => `"${row[h as keyof typeof row]}"`).join(','))
    ].join('\n')

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `houspire_budget_${projectId}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast.success('Budget exported successfully')
  }

  // Calculate totals
  const summary = budgetItems?.reduce(
    (acc, item) => {
      if (item.status === 'approved') {
        acc.subtotal += item.subtotal || 0
        acc.gst += item.gst_amount || 0
        acc.total += item.total || 0
        acc.count += 1
      }
      return acc
    },
    { subtotal: 0, gst: 0, total: 0, count: 0 }
  ) || { subtotal: 0, gst: 0, total: 0, count: 0 }

  const handleEdit = (item: BudgetItem) => {
    setEditingId(item.id)
    setEditForm({
      quantity: item.quantity,
      custom_price: item.custom_price || item.city_price,
      user_notes: item.user_notes || ''
    })
  }

  const handleSave = () => {
    if (!editingId) return
    updateMutation.mutate({ id: editingId, ...editForm })
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return <Badge className="bg-green-500">High {Math.round(confidence * 100)}%</Badge>
    if (confidence >= 0.6) return <Badge className="bg-yellow-500">Medium {Math.round(confidence * 100)}%</Badge>
    return <Badge className="bg-red-500">Low {Math.round(confidence * 100)}%</Badge>
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
            No items have been extracted from this render yet. Please ensure the render is approved to trigger budget extraction.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budget Review</h2>
          <p className="text-muted-foreground">
            Review and approve AI-extracted items from your render
          </p>
        </div>
        <Button onClick={handleExportExcel} disabled={summary.count === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Budget Items */}
      <div className="space-y-4">
        {budgetItems.map((item) => (
          <Card key={item.id} className={item.status === 'rejected' ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    {item.pricing_items?.item_name || item.ai_item_name}
                  </CardTitle>
                  <CardDescription>
                    {item.pricing_items?.specification || 'No specification'}
                  </CardDescription>
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
                          <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" onClick={() => approveMutation.mutate(item.id)}>
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(item.id)}>
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === item.id ? (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      type="number"
                      value={editForm.quantity}
                      onChange={(e) => setEditForm({ ...editForm, quantity: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Custom Price (₹)</label>
                    <Input
                      type="number"
                      value={editForm.custom_price}
                      onChange={(e) => setEditForm({ ...editForm, custom_price: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      value={editForm.user_notes}
                      onChange={(e) => setEditForm({ ...editForm, user_notes: e.target.value })}
                      placeholder="Add notes about this item..."
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unit Price</p>
                    <p className="font-semibold">₹{(item.custom_price || item.city_price || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-semibold">₹{(item.subtotal || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">GST ({item.gst_rate}%)</p>
                    <p className="font-semibold">₹{(item.gst_amount || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-semibold text-green-600">₹{(item.total || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">City</p>
                    <p className="font-semibold">{item.cities?.city_name || 'N/A'}</p>
                  </div>
                </div>
              )}

              {item.user_notes && !editingId && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm"><strong>Notes:</strong> {item.user_notes}</p>
                </div>
              )}

              {item.pricing_items?.recommended_brands && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm"><strong>Recommended Brands:</strong> {item.pricing_items.recommended_brands}</p>
                </div>
              )}

              {item.alternative_matches && item.alternative_matches.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Alternative Matches:</p>
                  <div className="flex gap-2">
                    {item.alternative_matches.map((alt: any, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {alt.name} ({Math.round(alt.confidence * 100)}%)
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Budget Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-sm">Approved Items</p>
              <p className="text-2xl font-bold">{summary.count}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Subtotal</p>
              <p className="text-2xl font-bold">₹{summary.subtotal.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">GST</p>
              <p className="text-2xl font-bold text-orange-600">₹{summary.gst.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Grand Total</p>
              <p className="text-3xl font-bold text-green-600">₹{summary.total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
