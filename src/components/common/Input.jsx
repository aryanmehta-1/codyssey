import './Input.css';

/** Reusable labeled input with inline validation error text. */
export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
}) {
  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="field__label">
          {label}
          {required && <span className="field__required"> *</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`field__input ${error ? 'field__input--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
