import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/** Thin accessor hook so components never import AuthContext directly. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
