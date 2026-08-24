import {
  LayoutDashboard,
  Rocket,
  BookOpen,
  Swords,
  Award,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../hooks/useNavigation';
import './Sidebar.css';

const NAV_ITEMS = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'codeverse', label: 'Codeverse', icon: Rocket },
  { page: 'learn', label: 'Learn', icon: BookOpen },
  { page: 'quests', label: 'Quests', icon: Swords },
  { page: 'rewards', label: 'Rewards', icon: Award },
  { page: 'profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const { currentPage, navigate } = useNavigation();

  const handleLogout = () => {
    logout();
    navigate('landing');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('dashboard')} style={{ cursor: 'pointer' }}>
        <span className="sidebar-logo-mark">⚡</span>
        <span className="sidebar-logo-text">Codyssey</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ page, label, icon: Icon }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => navigate(page)}
              className={`sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            >
              <Icon size={19} strokeWidth={2} />
              <span className="sidebar-label">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          onClick={() => navigate('settings')}
          className={`sidebar-link ${currentPage === 'settings' ? 'sidebar-link--active' : ''}`}
        >
          <Settings size={19} />
          <span className="sidebar-label">Settings</span>
        </button>
        <button type="button" className="sidebar-link sidebar-logout" onClick={handleLogout}>
          <LogOut size={19} />
          <span className="sidebar-label">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
