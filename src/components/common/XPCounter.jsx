import { useEffect, useRef, useState } from 'react';

/**
 * Animated "odometer" XP counter — smoothly counts from its previous
 * value to the new one whenever `value` changes, with a small pop.
 */
export default function XPCounter({ value, className = '', prefix = '', suffix = ' XP' }) {
  const [display, setDisplay] = useState(value);
  const [bump, setBump] = useState(false);
  const prevValue = useRef(value);
  const frameRef = useRef(null);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    if (from === to) return;

    setBump(true);
    const duration = 600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        prevValue.current = to;
      }
    };
    frameRef.current = requestAnimationFrame(tick);

    const bumpTimeout = setTimeout(() => setBump(false), 400);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(bumpTimeout);
    };
  }, [value]);

  return (
    <span className={`mono ${bump ? 'xp-counter--bump' : ''} ${className}`} style={{ display: 'inline-block' }}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}
