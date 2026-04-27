import { ROADMAP } from '@/lib/roadmap-data';
import { getProgressMap } from '@/lib/db';
import Tracker from '@/components/Tracker';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const progress = await getProgressMap();
  return <Tracker roadmap={ROADMAP} initialProgress={progress} />;
}
