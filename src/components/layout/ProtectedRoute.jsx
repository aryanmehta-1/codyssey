import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/** Redirects unauthenticated users to Sign In; sends users mid-onboarding back to Setup. */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (currentUser && !currentUser.onboardingComplete) return <Navigate to="/setup" replace />;
  return children;
}
