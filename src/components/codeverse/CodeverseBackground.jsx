import { useMemo } from 'react';
import './codeverse.css';

export default function CodeverseBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        size: Math.random() > 0.7 ? 4 : 2,
      })),
    []
  );

  return (
    <div className="codeverse-stars" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="codeverse-star"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
        />
      ))}
    </div>
  );
}
