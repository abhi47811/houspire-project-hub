import { useState, useEffect } from 'react';
import { Edit3, RotateCcw, Sparkles, AlertTriangle, Check, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface PromptEditorProps {
  initialPrompt: string;
  generationPath: 'smart_defaults' | 'library' | 'manual' | 'bypass' | null;
  selectedStyle: string | null;
  roomType: string | null;
  onPromptChange: (prompt: string) => void;
  isReadOnly?: boolean;
}

export function PromptEditor({
  initialPrompt,
  generationPath,
  selectedStyle,
  roomType,
  onPromptChange,
  isReadOnly = false,
}: PromptEditorProps) {
  const [editedPrompt, setEditedPrompt] = useState(initialPrompt);
  const [isEditing, setIsEditing] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const hasChanges = editedPrompt !== initialPrompt;

  useEffect(() => {
    setEditedPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleReset = () => {
    setEditedPrompt(initialPrompt);
    onPromptChange(initialPrompt);
  };

  const handleSave = () => {
    onPromptChange(editedPrompt);
    setIsEditing(false);
  };

  const getPathBadge = () => {
    switch (generationPath) {
      case 'smart_defaults':
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">Smart Defaults</Badge>;
      case 'library':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">Library Reference</Badge>;
      case 'manual':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/30">Manual Prompt</Badge>;
      case 'bypass':
        return <Badge variant="destructive">Bypass Mode</Badge>;
      default:
        return <Badge variant="outline">Auto-generated</Badge>;
    }
  };

  const truncatedPrompt = editedPrompt.length > 300 
    ? `${editedPrompt.slice(0, 300)}...` 
    : editedPrompt;

  return (
    <Card className="border-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Generation Prompt
          </CardTitle>
          <div className="flex items-center gap-2">
            {getPathBadge()}
            {hasChanges && (
              <Badge variant="outline" className="text-amber-600 border-amber-500">
                Modified
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Metadata row */}
        <div className="flex flex-wrap gap-2 text-xs">
          {selectedStyle && (
            <Badge variant="secondary" className="text-xs">
              Style: {selectedStyle?.replace('_', ' ') || ''}
            </Badge>
          )}
          {roomType && (
            <Badge variant="secondary" className="text-xs">
              Room: {roomType?.replace('_', ' ') || ''}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {editedPrompt.length} chars
          </Badge>
        </div>

        {/* Bypass warning */}
        {generationPath === 'bypass' && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/30 text-sm">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <span className="text-destructive">
              Bypass mode: This prompt will be sent directly without style enhancements.
            </span>
          </div>
        )}

        {/* Prompt display/edit */}
        {isEditing && !isReadOnly ? (
          <div className="space-y-2">
            <Textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Enter your generation prompt..."
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Check className="h-3 w-3 mr-1" />
                Save Changes
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              {hasChanges && (
                <Button size="sm" variant="ghost" onClick={handleReset}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Collapsible open={showFullPrompt} onOpenChange={setShowFullPrompt}>
              <div className="p-3 rounded-lg bg-muted/50 border font-mono text-xs leading-relaxed">
                {showFullPrompt ? editedPrompt : truncatedPrompt}
              </div>
              {editedPrompt.length > 300 && (
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full text-xs mt-1">
                    {showFullPrompt ? (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Show Full Prompt ({editedPrompt.length} chars)
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              )}
            </Collapsible>

            {!isReadOnly && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit Prompt
                </Button>
                {hasChanges && (
                  <Button size="sm" variant="ghost" onClick={handleReset}>
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset to Original
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PromptEditor;
