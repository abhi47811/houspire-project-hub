import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface PromptPreviewProps {
  prompt: string;
  metadata?: {
    style?: string;
    roomType?: string;
    budgetTier?: string;
    usingSmartDefaults?: boolean;
    usingLibraryReference?: boolean;
  };
}

export function PromptPreview({ prompt, metadata }: PromptPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast({
      title: 'Prompt copied',
      description: 'The prompt has been copied to your clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = prompt.split(/\s+/).length;
  const charCount = prompt.length;
  const lineCount = prompt.split('\n').filter(l => l.trim()).length;

  // Get a preview (first 150 chars)
  const preview = prompt.length > 150 ? prompt.slice(0, 150) + '...' : prompt;

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            AI Prompt Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            {metadata?.usingSmartDefaults && (
              <Badge variant="secondary" className="text-[10px]">Smart Defaults</Badge>
            )}
            {metadata?.usingLibraryReference && (
              <Badge variant="secondary" className="text-[10px]">Library Reference</Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Stats */}
        <div className="flex gap-3 mb-2 text-[10px] text-muted-foreground">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
          <span>•</span>
          <span>{lineCount} sections</span>
          {metadata?.style && (
            <>
              <span>•</span>
              <span className="capitalize">{metadata.style.replace('_', ' ')}</span>
            </>
          )}
        </div>

        {/* Prompt Content */}
        {isExpanded ? (
          <ScrollArea className="h-[200px] rounded-md border bg-muted/30 p-3">
            <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed">
              {prompt}
            </pre>
          </ScrollArea>
        ) : (
          <div className="rounded-md border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground font-mono line-clamp-2">
              {preview}
            </p>
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-xs text-primary mt-1 hover:underline"
            >
              Show full prompt
            </button>
          </div>
        )}

        {/* Metadata Tags */}
        {(metadata?.roomType || metadata?.budgetTier) && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {metadata.roomType && (
              <Badge variant="outline" className="text-[10px] capitalize">
                {metadata.roomType.replace('_', ' ')}
              </Badge>
            )}
            {metadata.budgetTier && (
              <Badge variant="outline" className="text-[10px] capitalize">
                {metadata.budgetTier.replace('_', ' ')}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
