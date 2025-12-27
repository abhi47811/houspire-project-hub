import { useState } from 'react';
import { BookOpen, Check, X, Users, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LibraryCatalogPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConsent: (consent: boolean) => void;
  imageSrc?: string;
}

export function LibraryCatalogPrompt({
  open,
  onOpenChange,
  onConsent,
  imageSrc,
}: LibraryCatalogPromptProps) {
  const [shareToLibrary, setShareToLibrary] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (share: boolean) => {
    setIsSubmitting(true);
    await onConsent(share && shareToLibrary);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Add to Houspire Library?
          </DialogTitle>
          <DialogDescription>
            Help build a shared design reference library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Image Preview */}
          {imageSrc && (
            <div className="rounded-lg overflow-hidden border bg-muted aspect-video">
              <img
                src={imageSrc}
                alt="Reference preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 p-3 rounded-lg border bg-card cursor-pointer hover:border-primary/50 transition-colors">
            <Checkbox
              checked={shareToLibrary}
              onCheckedChange={(checked) => setShareToLibrary(!!checked)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <span className="font-medium text-sm">
                Share this reference with other users
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your image will be available in our design library
              </p>
            </div>
          </label>

          {/* Benefits */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              What happens if you share:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span>Future users can browse & use your reference</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span>You get credit as a contributor</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>No personal information is included</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            <X className="h-4 w-4 mr-2" />
            Don't Share
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none"
          >
            <Check className="h-4 w-4 mr-2" />
            {shareToLibrary ? 'Share & Continue' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
