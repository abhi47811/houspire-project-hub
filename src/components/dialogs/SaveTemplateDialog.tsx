import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save, Globe } from 'lucide-react';

interface DesignSettings {
  selectedStyle: string;
  falseCeilingDrop: number;
  selectedVastu: string[];
  customRequirements: string;
  generationPath: string;
}

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: DesignSettings;
  roomType: string | null;
}

export function SaveTemplateDialog({
  open,
  onOpenChange,
  settings,
  roomType,
}: SaveTemplateDialogProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [templateName, setTemplateName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('design_templates')
        .insert([{
          user_id: user.id,
          name: templateName.trim(),
          room_type: roomType,
          settings: JSON.parse(JSON.stringify(settings)),
          is_public: isPublic,
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Template Saved',
        description: `"${templateName}" has been saved${isPublic ? ' and shared publicly' : ''}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['design-templates'] });
      onOpenChange(false);
      resetState();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const resetState = () => {
    setTemplateName('');
    setIsPublic(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Save as Template
          </DialogTitle>
          <DialogDescription>
            Save your current design settings as a reusable template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              placeholder="e.g., Modern Living Room - Mumbai Style"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-public"
              checked={isPublic}
              onCheckedChange={(checked) => setIsPublic(checked === true)}
            />
            <Label 
              htmlFor="is-public" 
              className="text-sm font-normal flex items-center gap-2 cursor-pointer"
            >
              <Globe className="h-4 w-4 text-muted-foreground" />
              Make public (other designers can use this template)
            </Label>
          </div>

          {settings.selectedStyle && (
            <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
              <p><span className="font-medium">Style:</span> {settings.selectedStyle.replace(/_/g, ' ')}</p>
              {roomType && (
                <p><span className="font-medium">Room Type:</span> {roomType.replace(/_/g, ' ')}</p>
              )}
              <p><span className="font-medium">Ceiling Drop:</span> {settings.falseCeilingDrop}"</p>
              {settings.selectedVastu.length > 0 && (
                <p><span className="font-medium">Vastu:</span> {settings.selectedVastu.length} preferences</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending || !templateName.trim()}
          >
            {saveMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
