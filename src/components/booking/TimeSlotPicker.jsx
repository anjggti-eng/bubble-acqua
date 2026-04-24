import React from 'react';
import { Button } from '@/components/ui/button';

export default function TimeSlotPicker({ slots, selectedTime, onSelect, bookedTimes }) {
  const bookedSet = new Set(bookedTimes || []);

  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map((time) => {
        const isBooked = bookedSet.has(time);
        const isSelected = selectedTime === time;

        return (
          <Button
            key={time}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            disabled={isBooked}
            onClick={() => onSelect(time)}
            className={`text-sm font-medium transition-all ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : isBooked
                ? 'opacity-40 line-through'
                : 'hover:border-primary/50 hover:text-primary'
            }`}
          >
            {time}
          </Button>
        );
      })}
    </div>
  );
}