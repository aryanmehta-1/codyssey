import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './pages.css';

export default function NotFoundPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, marginBottom: 8 }}>404</h1>
        <p className="text-secondary" style={{ marginBottom: 24 }}>This corner of the Codeverse hasn't been charted yet.</p>
        <Link to="/dashboard"><Button>Return to Dashboard</Button></Link>
      </div>
    </div>
  );
}
