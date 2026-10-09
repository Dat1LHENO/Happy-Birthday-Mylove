import React from 'react';
import type { Wish } from '../types';

interface FloatingWishesProps {
  wishes: Wish[];
}

export default function FloatingWishes({ wishes }: FloatingWishesProps): React.JSX.Element {
  // Show a rolling window of the 4 most recent wishes
  const visibleWishes = wishes.slice(0, 4);

  return (
    <div className="floating-wishes-stack">
      {visibleWishes.map((item) => (
        <div key={item.id} className="wish-bubble">
          <span className="author">{item.author}:</span>
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  );
}
