import './Card.css';

/** Base surface container used across dashboard, skills, and quest cards. */
export default function Card({ children, className = '', hover = false, onClick = null }) {
  return (
    <div
      className={`card ${hover ? 'card--hover' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' ? onClick() : null) : undefined}
    >
      {children}
    </div>
  );
}
