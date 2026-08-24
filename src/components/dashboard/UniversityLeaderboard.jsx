import { useState } from 'react';
import Card from '../common/Card';
import { collegeDetails } from '../../data/colleges';
import { Building2, Trophy, Users, Zap } from 'lucide-react';
import './dashboard.css';

export default function UniversityLeaderboard({ userCollege }) {
  const [selectedUniv, setSelectedUniv] = useState(null);

  const sortedColleges = [...collegeDetails].sort((a, b) => b.totalXP - a.totalXP);
  const topXP = sortedColleges[0]?.totalXP || 1;

  return (
    <Card className="univ-card">
      <div className="univ-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="univ-card__icon-badge">
            <Trophy size={20} color="#ffc23c" />
          </div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>University Standings</h3>
            <p className="text-secondary" style={{ fontSize: 12 }}>
              Inter-University CS Coding Leaderboard
            </p>
          </div>
        </div>
        <span className="badge-chip badge-chip--primary" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Building2 size={12} />
          {userCollege ? userCollege.split(' ')[0] : 'All Universities'}
        </span>
      </div>

      <div className="univ-card__list">
        {sortedColleges.map((univ, index) => {
          const isUserCollege = userCollege && (userCollege.toLowerCase().includes(univ.id) || univ.name.toLowerCase().includes(userCollege.toLowerCase()));
          const percent = Math.round((univ.totalXP / topXP) * 100);

          return (
            <div
              key={univ.id}
              className={`univ-row ${isUserCollege ? 'univ-row--highlight' : ''}`}
              onClick={() => setSelectedUniv(selectedUniv?.id === univ.id ? null : univ)}
            >
              <div className="univ-row__rank">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
              </div>

              <div className="univ-row__info">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{univ.badge}</span>
                    <strong style={{ fontSize: 14 }}>{univ.shortName}</strong>
                    {isUserCollege && (
                      <span className="univ-row__tag">YOUR CAMPUS</span>
                    )}
                  </div>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: '#ffc23c' }}>
                    {univ.totalXP.toLocaleString()} XP
                  </span>
                </div>

                <div className="univ-row__bar-bg">
                  <div
                    className="univ-row__bar-fill"
                    style={{
                      width: `${percent}%`,
                      background: univ.color,
                    }}
                  />
                </div>

                <div className="univ-row__meta">
                  <span><Users size={11} inline /> {univ.studentsCount} Students</span>
                  <span><Zap size={11} inline /> Top: {univ.topSkill}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
