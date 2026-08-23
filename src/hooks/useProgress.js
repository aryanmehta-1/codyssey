import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext.jsx';

/** Thin accessor hook so components never import StudentContext directly. */
export function useProgress() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useProgress must be used within a StudentProvider');
  return ctx;
}
