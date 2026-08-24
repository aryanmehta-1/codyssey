import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  icon = null,
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}
