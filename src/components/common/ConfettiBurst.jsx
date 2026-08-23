import { useMemo } from 'react';

const COLORS = ['#6366f1', '#c026d3', '#22d3ee', '#ffc23c', '#2dd4a7', '#ff7a45'];

/**
 * Lightweight, dependency-free CSS confetti burst. Purely decorative —
 * mounted for ~1.2s by the parent (level-up / perfect-quiz / badge unlock)
 * then unmounted. No canvas or animation library needed.
 */
export default function ConfettiBurst({ pieceCount = 28 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: pieceCount }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: COLORS[i % COLORS.length],
        delay: `${Math.random() * 0.3}s`,
        duration: `${0.9 + Math.random() * 0.6}s`,
        size: 5 + Math.round(Math.random() * 5),
        rotate: Math.random() > 0.5 ? '50%' : '2px',
      })),
    [pieceCount]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.rotate,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
