import PageContainer from '../components/layout/PageContainer';
import BadgeGrid from '../components/rewards/BadgeGrid';
import { useProgress } from '../hooks/useProgress';

export default function RewardsPage() {
  const { badges } = useProgress();
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <PageContainer title="Rewards">
      <p className="text-secondary" style={{ marginBottom: 20 }}>
        {unlockedCount} / {badges.length} badges unlocked
      </p>
      <BadgeGrid badges={badges} />
    </PageContainer>
  );
}
