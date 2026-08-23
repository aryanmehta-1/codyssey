import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SetupPage from './pages/SetupPage';
import Dashboard from './pages/Dashboard';
import CodeversePage from './pages/CodeversePage';
import LearnPage from './pages/LearnPage';
import QuestPage from './pages/QuestPage';
import SkillsPage from './pages/SkillsPage';
import AssessmentPage from './pages/AssessmentPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * App.jsx only configures routing + providers (providers live in main.jsx).
 * Protected routes redirect unauthenticated users to /signin, and users who
 * haven't finished onboarding get sent to /setup first.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/setup" element={<SetupPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/codeverse" element={<ProtectedRoute><CodeversePage /></ProtectedRoute>} />
      <Route path="/learn" element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
      <Route path="/quests" element={<ProtectedRoute><QuestPage /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><AssessmentPage /></ProtectedRoute>} />
      <Route path="/skills" element={<ProtectedRoute><SkillsPage /></ProtectedRoute>} />
      <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
