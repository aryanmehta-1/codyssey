import Sidebar from './Sidebar';
import Navbar from './Navbar';
import LevelUpModal from '../rewards/LevelUpModal';
import AchievementModal from '../rewards/AchievementModal';
import { useProgress } from '../../hooks/useProgress';
import './PageContainer.css';

/**
 * Authenticated app shell: sidebar + top navbar + scrollable content.
 * Level-up and achievement celebrations are mounted here (not on individual
 * pages) so they fire the instant XP crosses a threshold or a badge unlocks,
 * no matter which page the learner happens to be on.
 */
export default function PageContainer({ title, children }) {
  const { lastLevelUp, clearLevelUpToast, lastUnlockedBadge, clearBadgeToast } = useProgress();

  return (
    <div className="app-shell">
      <div className="app-mesh-bg" />
      <Sidebar />
      <main className="page-container page-enter">
        <Navbar title={title} />
        {children}
      </main>
      <LevelUpModal level={lastLevelUp} onClose={clearLevelUpToast} />
      <AchievementModal badge={lastUnlockedBadge} onClose={clearBadgeToast} />
    </div>
  );
}
