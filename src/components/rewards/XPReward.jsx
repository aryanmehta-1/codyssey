import './rewards.css';

/**
 * XPReward — Member 2
 *
 * Inline pill showing an XP amount.
 * Used in quiz results, quest confirmations, and XP history feeds.
 *
 * Props:
 *   amount  – number
 *   label   – optional override text (default: "+{amount} XP")
 *   size    – 'sm' | 'md' (default 'md')
 */
export default function XPReward({ amount, label, size = 'md' }) {
  const text = label || `+${amount} XP`;
  return (
    <span className={`xp-reward-pill xp-reward-pill--${size}`}>
      ✨ {text}
    </span>
  );
}
