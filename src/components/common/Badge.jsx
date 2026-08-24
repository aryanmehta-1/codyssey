import './Badge.css';

export default function Badge({ children, tone = 'default' }) {
  return <span className={`badge-chip badge-chip--${tone}`}>{children}</span>;
}
