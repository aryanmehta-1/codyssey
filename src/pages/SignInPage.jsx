import { useState } from 'react';
import Link from '../components/common/Link';
import { useNavigation } from '../hooks/useNavigation';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignIn, hasErrors } from '../utils/validation';
import './pages.css';

export default function SignInPage() {
  const { signIn, currentUser } = useAuth();
  const { navigate } = useNavigation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateSignIn(form);
    setErrors(validation);
    if (hasErrors(validation)) return;

    const result = signIn(form);
    if (!result.success) {
      setFormError(result.error);
      return;
    }
    navigate(result.user.onboardingComplete ? 'dashboard' : 'setup');
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__logo">
          <div className="auth-card__logo-mark">⚡</div>
          <strong style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif", fontSize: 18 }}>Codyssey</strong>
        </div>
        <h2 style={{ marginBottom: 4 }}>Welcome back</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 22 }}>Ready for today's quest?</p>

        {formError && <div className="auth-card__error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <Input label="Email" id="email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" error={errors.email} required />
          <Input label="Password" id="password" type="password" value={form.password} onChange={update('password')} error={errors.password} required />
          <Button type="submit" fullWidth size="lg">Sign In</Button>
        </form>

        <p className="auth-card__footer">
          New to Codyssey? <Link to="/signup" style={{ color: '#6366f1', fontWeight: 600 }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
