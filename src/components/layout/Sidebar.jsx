import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  BookOpen,
  Swords,
  Layers,
  Award,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/codeverse', label: 'Codeverse', icon: Rocket },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/quests', label: 'Quests', icon: Swords },
  { to: '/skills', label: 'Skills', icon: Layers },
  { to: '/rewards', label: 'Rewards', icon: Award },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-mark">⚡</span>
        <span className="sidebar-logo-text">Codyssey</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
          >
            <Icon size={19} strokeWidth={2} />
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}>
          <Settings size={19} />
          <span className="sidebar-label">Settings</span>
        </NavLink>
        <button className="sidebar-link sidebar-logout" onClick={logout}>
          <LogOut size={19} />
          <span className="sidebar-label">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
