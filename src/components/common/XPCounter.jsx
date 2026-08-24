export default function XPCounter({ value = 0, className = '', prefix = '', suffix = ' XP' }) {
  return (
    <span className={`mono ${className}`}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
