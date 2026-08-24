import Sidebar from './Sidebar';
import Navbar from './Navbar';
import LevelUpModal from '../rewards/LevelUpModal';
import AchievementModal from '../rewards/AchievementModal';
import { useProgress } from '../../hooks/useProgress';
import './PageContainer.css';

export default function PageContainer({ title, children }) {
  const { lastLevelUp, clearLevelUpToast, lastUnlockedBadge, clearBadgeToast } = useProgress();

  const activeLevelUp = lastLevelUp;
  const activeBadge = activeLevelUp ? null : lastUnlockedBadge;

  return (
    <div className="app-shell">
      <div className="app-mesh-bg" />
      <Sidebar />
      <main className="page-container page-enter">
        <Navbar title={title} />
        {children}
      </main>
      <LevelUpModal level={activeLevelUp} onClose={clearLevelUpToast} />
      <AchievementModal badge={activeBadge} onClose={clearBadgeToast} />
    </div>
  );
}
