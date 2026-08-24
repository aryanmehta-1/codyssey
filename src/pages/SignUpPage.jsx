import { useState } from 'react';
import Link from '../components/common/Link';
import { useNavigation } from '../hooks/useNavigation';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignUp, hasErrors } from '../utils/validation';
import './pages.css';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const { navigate } = useNavigation();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateSignUp(form);
    setErrors(validation);
    if (hasErrors(validation)) return;

    const result = signUp(form);
    if (!result.success) {
      setFormError(result.error);
      return;
    }
    navigate('setup');
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__logo">
          <div className="auth-card__logo-mark">⚡</div>
          <strong style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif", fontSize: 18 }}>Codyssey</strong>
        </div>
        <h2 style={{ marginBottom: 4 }}>Create your account</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 22 }}>
          Demo, client-side authentication — data is stored in your browser only.
        </p>

        {formError && <div className="auth-card__error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <Input label="Full Name" id="name" value={form.name} onChange={update('name')} placeholder="Aryan Sharma" error={errors.name} required />
          <Input label="Email" id="email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" error={errors.email} required />
          <Input label="Password" id="password" type="password" value={form.password} onChange={update('password')} placeholder="At least 6 characters" error={errors.password} required />
          <Input label="Confirm Password" id="confirmPassword" type="password" value={form.confirmPassword} onChange={update('confirmPassword')} error={errors.confirmPassword} required />
          <Button type="submit" fullWidth size="lg">Create Account</Button>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to="/signin" style={{ color: '#6366f1', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
