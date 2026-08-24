import { useNavigation } from './hooks/useNavigation';
import { useAuth } from './hooks/useAuth';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SetupPage from './pages/SetupPage';
import Dashboard from './pages/Dashboard';
import CodeversePage from './pages/CodeversePage';
import LearnPage from './pages/LearnPage';
import QuestPage from './pages/QuestPage';
import AssessmentPage from './pages/AssessmentPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';


export default function App() {
  const { currentPage, isPublicPage } = useNavigation();
  const { currentUser } = useAuth();

  
  if (!currentUser && !isPublicPage) {
    return <SignInPage />;
  }

  
  if (currentUser && !currentUser.onboardingComplete && currentPage !== 'setup' && !isPublicPage) {
    return <SetupPage />;
  }

  switch (currentPage) {
    case 'landing':
    case '':
      return <LandingPage />;
    case 'signin':
      return <SignInPage />;
    case 'signup':
      return <SignUpPage />;
    case 'setup':
      return <SetupPage />;
    case 'dashboard':
      return <Dashboard />;
    case 'codeverse':
      return <CodeversePage />;
    case 'learn':
      return <LearnPage />;
    case 'quests':
      return <QuestPage />;
    case 'quiz':
      return <AssessmentPage />;
    case 'rewards':
      return <RewardsPage />;
    case 'profile':
      return <ProfilePage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <NotFoundPage />;
  }
}