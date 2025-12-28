import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit, Wand2, Plus, Trash2, FileText } from 'lucide-react';

interface ManualPromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  roomType?: string;
  selectedStyle?: string;
}

const promptTemplates = [
  {
    id: 'modern',
    name: 'Modern Minimal',
    prompt: 'Create a modern minimalist interior with clean lines, neutral colors, and functional furniture. Focus on open space and natural light.',
  },
  {
    id: 'luxury',
    name: 'Luxury Contemporary',
    prompt: 'Design a luxurious contemporary space with premium materials like marble, brass accents, and designer furniture. Include statement lighting and rich textures.',
  },
  {
    id: 'indian',
    name: 'Modern Indian',
    prompt: 'Create a modern Indian interior blending contemporary aesthetics with traditional elements. Include brass accents, ethnic textiles, and carved wood details.',
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian Cozy',
    prompt: 'Design a warm Scandinavian interior with light wood tones, soft textiles, and hygge elements. Focus on comfort and natural materials.',
  },
];

const quickSnippets = [
  { label: 'LED cove lighting', text: 'with LED cove lighting around the false ceiling' },
  { label: 'Marble flooring', text: 'with Italian marble flooring in a herringbone pattern' },
  { label: 'Brass accents', text: 'featuring brass accent pieces and hardware' },
  { label: 'Floor-to-ceiling windows', text: 'with floor-to-ceiling windows for natural light' },
  { label: 'Indoor plants', text: 'incorporating indoor plants and greenery' },
  { label: 'Smart home', text: 'with integrated smart home controls' },
  { label: 'Textured walls', text: 'with textured accent wall in warm tones' },
  { label: 'Wooden ceiling', text: 'with exposed wooden beam ceiling' },
];

export function ManualPromptEditor({ value, onChange, roomType, selectedStyle }: ManualPromptEditorProps) {
  const [showTemplates, setShowTemplates] = useState(false);

  const applyTemplate = (template: typeof promptTemplates[0]) => {
    const prefix = roomType ? `For a ${roomType?.replace('_', ' ') || 'room'}: ` : '';
    onChange(prefix + template.prompt);
    setShowTemplates(false);
  };

  const addSnippet = (snippet: typeof quickSnippets[0]) => {
    const newValue = value.trim() ? `${value.trim()}, ${snippet.text}` : snippet.text;
    onChange(newValue);
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit className="h-4 w-4 text-orange-500" />
            <CardTitle className="text-sm">Manual Prompt</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <FileText className="h-3.5 w-3.5 mr-1" />
            Templates
          </Button>
        </div>
        <CardDescription className="text-xs">
          Write your own detailed prompt for complete creative control
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Templates Panel */}
        {showTemplates && (
          <Card className="bg-muted/30">
            <CardContent className="p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">Quick Templates</p>
              <div className="grid grid-cols-2 gap-2">
                {promptTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2 px-3"
                    onClick={() => applyTemplate(template)}
                  >
                    <Wand2 className="h-3.5 w-3.5 mr-2 shrink-0" />
                    <span className="text-xs truncate">{template.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Textarea */}
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Describe your ideal ${roomType?.replace('_', ' ') || 'room'} design...

Example: Create a modern living room with a neutral color palette, L-shaped sectional sofa in beige fabric, walnut wood coffee table, floor-to-ceiling windows with sheer curtains, LED cove lighting, and minimalist artwork on the walls.`}
            className="min-h-[150px] resize-none text-sm"
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">{wordCount} words</span>
            {value && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onChange('')}
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>

        {/* Quick Add Snippets */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Quick Add</p>
          <ScrollArea className="w-full">
            <div className="flex gap-1.5 pb-2 flex-wrap">
              {quickSnippets.map((snippet, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 text-[10px] py-0.5"
                  onClick={() => addSnippet(snippet)}
                >
                  <Plus className="h-2.5 w-2.5 mr-1" />
                  {snippet.label}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Tips */}
        <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">💡 Tips for better results:</p>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            <li>Be specific about materials and finishes</li>
            <li>Mention color palette explicitly</li>
            <li>Describe lighting setup in detail</li>
            <li>Include furniture positioning if needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
