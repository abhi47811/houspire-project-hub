import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { FileBox, Globe, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignSettings {
  selectedStyle?: string;
  falseCeilingDrop?: number;
  selectedVastu?: string[];
  customRequirements?: string;
  generationPath?: string;
}

interface Template {
  id: string;
  name: string;
  room_type: string | null;
  settings: DesignSettings | null;
  is_public: boolean;
  times_used: number;
  created_at: string;
  user_id: string;
}

interface UseTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType: string | null;
  onApply: (settings: DesignSettings) => void;
}

export function UseTemplateDialog({
  open,
  onOpenChange,
  roomType,
  onApply,
}: UseTemplateDialogProps) {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const { data: templates, isLoading } = useQuery({
    queryKey: ['design-templates', roomType],
    queryFn: async () => {
      // Fetch user's own templates and public templates
      const { data, error } = await supabase
        .from('design_templates')
        .select('*')
        .or(`user_id.eq.${user?.id},is_public.eq.true`)
        .order('times_used', { ascending: false });

      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        settings: item.settings as unknown as DesignSettings | null,
      })) as Template[];
    },
    enabled: open && !!user?.id,
  });

  // Filter templates by room type if specified
  const filteredTemplates = templates?.filter(t => 
    !roomType || !t.room_type || t.room_type === roomType
  ) || [];

  const handleApply = async () => {
    if (!selectedTemplate || !selectedTemplate.settings) return;

    // Update times_used
    await supabase
      .from('design_templates')
      .update({ times_used: selectedTemplate.times_used + 1 })
      .eq('id', selectedTemplate.id);

    // Ensure we have complete settings with defaults
    const completeSettings: DesignSettings = {
      selectedStyle: selectedTemplate.settings.selectedStyle || '',
      falseCeilingDrop: selectedTemplate.settings.falseCeilingDrop || 8,
      selectedVastu: selectedTemplate.settings.selectedVastu || [],
      customRequirements: selectedTemplate.settings.customRequirements || '',
      generationPath: selectedTemplate.settings.generationPath || 'smart_defaults',
    };

    onApply(completeSettings);
    toast({
      title: 'Template Applied',
      description: `"${selectedTemplate.name}" settings applied to this room.`,
    });
    onOpenChange(false);
    setSelectedTemplate(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedTemplate(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileBox className="h-5 w-5" />
            Use Template
          </DialogTitle>
          <DialogDescription>
            Apply a saved template to this room.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Label className="text-sm font-medium">Available Templates</Label>
          
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileBox className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No templates found</p>
              <p className="text-sm">Save your current settings as a template to use it later.</p>
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2 pr-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50",
                      selectedTemplate?.id === template.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'bg-card'
                    )}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{template.name}</span>
                          {template.is_public ? (
                            <Badge variant="secondary" className="text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              Public
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <User className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {template.room_type && (
                            <span>{template.room_type.replace(/_/g, ' ')}</span>
                          )}
                          {template.settings?.selectedStyle && (
                            <span>{template.settings.selectedStyle.replace(/_/g, ' ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {template.times_used} uses
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {selectedTemplate && (
            <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
              <p className="font-medium mb-2">Template Preview:</p>
              <p><span className="text-muted-foreground">Style:</span> {selectedTemplate.settings?.selectedStyle?.replace(/_/g, ' ') || 'Not set'}</p>
              <p><span className="text-muted-foreground">Ceiling Drop:</span> {selectedTemplate.settings?.falseCeilingDrop || 8}"</p>
              {selectedTemplate.settings?.selectedVastu?.length > 0 && (
                <p><span className="text-muted-foreground">Vastu:</span> {selectedTemplate.settings.selectedVastu.length} preferences</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={!selectedTemplate}
          >
            Apply Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
