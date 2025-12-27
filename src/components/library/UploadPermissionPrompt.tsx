import React, { useState } from 'react';
import { Library, Users, Shield, Award, Info, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface UploadPermissionPromptProps {
  open: boolean;
  imageUrl: string;
  analysis: {
    room_type: string;
    design_style: string;
    confidence: number;
  };
  onDecision: (addToLibrary: boolean) => void;
  onClose?: () => void;
}

export function UploadPermissionPrompt({
  open,
  imageUrl,
  analysis,
  onDecision,
  onClose
}: UploadPermissionPromptProps) {
  const [addToLibrary, setAddToLibrary] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const handleContinue = () => {
    onDecision(addToLibrary);
  };

  const handleSkip = () => {
    onDecision(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Library className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Add to Houspire Library?</DialogTitle>
              <DialogDescription>
                Help future users by sharing this reference
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Image Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <img
              src={imageUrl}
              alt="Reference preview"
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
          </div>
          <div className="flex flex-col justify-center space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Room Type</span>
              <p className="font-semibold text-foreground">{analysis.room_type}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Style</span>
              <p className="font-semibold text-foreground">{analysis.design_style}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">AI Confidence</span>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">
                  {Math.round(analysis.confidence * 100)}%
                </p>
                <Badge 
                  variant="secondary"
                  className={cn(
                    analysis.confidence >= 0.9 ? "bg-green-500/20 text-green-700" :
                    analysis.confidence >= 0.7 ? "bg-yellow-500/20 text-yellow-700" :
                    "bg-red-500/20 text-red-700"
                  )}
                >
                  {analysis.confidence >= 0.9 ? "High" : analysis.confidence >= 0.7 ? "Medium" : "Low"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Consent */}
        <div className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setAddToLibrary(!addToLibrary)}
        >
          <Checkbox
            id="share-consent"
            checked={addToLibrary}
            onCheckedChange={(checked) => setAddToLibrary(checked === true)}
            className="mt-1"
          />
          <div className="flex-1">
            <label htmlFor="share-consent" className="font-medium text-foreground cursor-pointer">
              Share this reference with other Houspire users
            </label>
            <p className="text-sm text-muted-foreground mt-1">
              Your contribution helps build a better library for everyone
            </p>
          </div>
        </div>

        {/* Benefits */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Info className="h-5 w-5 text-primary" />
              What happens if I share:
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary rounded-full flex-shrink-0 mt-0.5">
                  <Users className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Future users can browse & use it</p>
                  <p className="text-sm text-muted-foreground">
                    Helps others find great references faster
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-green-600 rounded-full flex-shrink-0 mt-0.5">
                  <Award className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">You get credit for contribution</p>
                  <p className="text-sm text-muted-foreground">
                    Track how many projects you've helped
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-purple-600 rounded-full flex-shrink-0 mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">100% anonymous & private</p>
                  <p className="text-sm text-muted-foreground">
                    No personal information is included
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Details (Expandable) */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <Shield className="h-4 w-4" />
              {showDetails ? 'Hide' : 'Show'} privacy details
              {showDetails ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 p-4 bg-muted rounded-lg text-sm space-y-3">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">What we store:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✅ Reference image only</li>
                  <li>✅ Room type and style</li>
                  <li>✅ City (for climate matching)</li>
                  <li>✅ Color palette and furniture details</li>
                  <li>✅ Performance metrics (success rate)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-foreground">What we NEVER store:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>❌ Your name or contact info</li>
                  <li>❌ Property address</li>
                  <li>❌ Client information</li>
                  <li>❌ Original uncleaned photos</li>
                  <li>❌ Project details</li>
                </ul>
              </div>
              
              <p className="text-muted-foreground pt-3 border-t border-border">
                You can remove your contribution anytime from your profile settings.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Warning if not sharing */}
        {!addToLibrary && (
          <Alert className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-500/10">
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This reference will be saved for your project only 
              and won't be available to other users.
            </AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Don't Share
          </Button>
          <Button 
            onClick={handleContinue}
            className={cn(
              "flex-1",
              !addToLibrary && "bg-muted-foreground hover:bg-muted-foreground/90"
            )}
          >
            {addToLibrary ? '✅ Share & Continue' : 'Continue Without Sharing'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// INLINE VERSION (Non-modal, for embedding in forms)
// ============================================================================

interface UploadPermissionInlineProps {
  onDecision: (addToLibrary: boolean) => void;
}

export function UploadPermissionInline({ onDecision }: UploadPermissionInlineProps) {
  const [addToLibrary, setAddToLibrary] = useState(true);

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary rounded-lg flex-shrink-0">
            <Library className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">
              📚 Add to Houspire Library?
            </h3>
            <p className="text-muted-foreground text-sm">
              Share this reference to help future users. Your contribution is 100% anonymous.
            </p>
          </div>
        </div>

        <div 
          className="flex items-start gap-3 cursor-pointer p-4 bg-background rounded-lg border-2 border-transparent hover:border-primary/30 transition-all mb-4"
          onClick={() => setAddToLibrary(!addToLibrary)}
        >
          <Checkbox
            checked={addToLibrary}
            onCheckedChange={(checked) => setAddToLibrary(checked === true)}
            className="mt-0.5"
          />
          <div>
            <span className="font-medium text-foreground">
              Yes, share with other users
            </span>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>• Future users can browse & use it</li>
              <li>• You get credit for contribution</li>
              <li>• No personal info included</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onDecision(false)}>
            Don't Share
          </Button>
          <Button
            size="sm"
            className={cn("flex-1", !addToLibrary && "bg-muted-foreground")}
            onClick={() => onDecision(addToLibrary)}
          >
            {addToLibrary ? '✅ Share & Continue' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UploadPermissionPrompt;