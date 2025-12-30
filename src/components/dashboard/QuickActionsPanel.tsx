import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Zap, Plus, Upload, BarChart3, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAttentionCounts } from '@/hooks/useAttentionCounts';
import { AttentionDot } from '@/components/ui/badge-indicator';

export function QuickActionsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { hasAnyAttention } = useAttentionCounts();

  const actions = [
    { icon: Plus, label: 'New Project', path: '/projects?action=new' },
    { icon: Upload, label: 'Bulk Upload', path: '/projects?action=upload' },
    { icon: BarChart3, label: 'View Reports', path: '/admin?tab=analytics' },
    { icon: Search, label: 'Search Vendors', path: '/vendors' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2">
      {/* Action buttons */}
      <div className={cn(
        'flex flex-col gap-2 transition-all duration-300',
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}>
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="secondary"
            size="sm"
            className="shadow-premium-md justify-start gap-2 px-4 hover:shadow-premium-lg transition-all duration-200 hover:-translate-x-1 bg-card/95 backdrop-blur-sm"
            onClick={() => { navigate(action.path); setIsOpen(false); }}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Main FAB */}
      <div className="relative">
        <Button
          size="lg"
          className={cn(
            'h-14 w-14 rounded-full shadow-premium-lg transition-all duration-300',
            'bg-gradient-to-br from-primary to-primary/80 hover:shadow-premium-xl hover:scale-105',
            isOpen && 'rotate-45'
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
        </Button>
        {/* Attention indicator */}
        {hasAnyAttention && !isOpen && (
          <AttentionDot className="absolute -top-0.5 -right-0.5" />
        )}
      </div>
    </div>
  );
}
