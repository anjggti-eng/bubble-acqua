import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Reusable back-button header.
 * variant="overlay" → transparent, absolute, for use inside cover images.
 * variant="solid"   → bg-background, fixed top bar with safe-area padding (default).
 */
export default function PageHeader({ title, backTo, variant = 'solid' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) navigate(backTo);
    else navigate(-1);
  };

  if (variant === 'overlay') {
    return (
      <div className="flex items-center gap-2 px-4 pt-safe h-14" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleBack}
          className="bg-black/40 border border-white/20 text-white backdrop-blur-sm hover:bg-black/60"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        {title && <h1 className="font-heading text-lg font-semibold text-white drop-shadow">{title}</h1>}
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border max-w-lg mx-auto"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center gap-3 px-4 h-14">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleBack}
          className="shrink-0 text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        {title && <h1 className="font-heading text-lg font-semibold truncate">{title}</h1>}
      </div>
    </div>
  );
}