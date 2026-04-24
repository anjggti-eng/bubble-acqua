import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value = 0, onChange, readonly = false, size = 'md' }) {
  const [hovered, setHovered] = useState(0);
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-7 h-7' };
  const cls = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = i <= (readonly ? value : (hovered || value));
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(i)}
            onMouseEnter={() => !readonly && setHovered(i)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={`transition-transform ${readonly ? 'cursor-default' : 'hover:scale-110 cursor-pointer'}`}
          >
            <Star
              className={`${cls} transition-colors ${
                filled ? 'fill-primary text-primary' : 'fill-transparent text-muted-foreground/40'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}