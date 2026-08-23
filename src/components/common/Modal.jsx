import { useEffect } from 'react';
import './Modal.css';

/** Generic centered modal with backdrop, used by AchievementModal and confirmations. */
export default function Modal({ open, onClose, children, closeOnBackdrop = true }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape' && closeOnBackdrop) onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose, closeOnBackdrop]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => closeOnBackdrop && onClose?.()}
      role="presentation"
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
