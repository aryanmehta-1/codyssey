import { useEffect, useState } from 'react';

export default function QuizTimer({ seconds = 30, resetKey, onExpire }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [resetKey, seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onExpire]);

  return (
    <span className="mono text-secondary" style={{ fontSize: 13 }}>
      ⏱ {remaining}s
    </span>
  );
}
