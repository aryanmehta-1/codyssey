import './Badge.css';

/** Small badge chip used for skill tags, difficulty stars, and status pills. */
export default function Badge({ children, tone = 'default' }) {
  return <span className={`badge-chip badge-chip--${tone}`}>{children}</span>;
}
