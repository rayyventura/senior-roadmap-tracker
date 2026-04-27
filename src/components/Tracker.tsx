'use client';

import { useMemo, useState, useTransition } from 'react';
import type { RoadmapPillar, RoadmapCategory } from '@/lib/roadmap-data';
import styles from './Tracker.module.css';

type Props = {
  roadmap: RoadmapPillar[];
  initialProgress: Record<string, boolean>;
};

function categoryItemIds(cat: RoadmapCategory): string[] {
  const ids: string[] = [];
  if (cat.items) ids.push(...cat.items.map((i) => i.id));
  if (cat.subgroups) for (const sg of cat.subgroups) ids.push(...sg.items.map((i) => i.id));
  return ids;
}

function pillarItemIds(p: RoadmapPillar): string[] {
  return p.categories.flatMap(categoryItemIds);
}

export default function Tracker({ roadmap, initialProgress }: Props) {
  const [progress, setProgress] = useState<Record<string, boolean>>(initialProgress);
  const [activePillar, setActivePillar] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  const totals = useMemo(() => {
    const allIds = roadmap.flatMap(pillarItemIds);
    const done = allIds.filter((id) => progress[id]).length;
    return { total: allIds.length, done };
  }, [roadmap, progress]);

  const pillarStats = useMemo(() => {
    return roadmap.map((p) => {
      const ids = pillarItemIds(p);
      const done = ids.filter((id) => progress[id]).length;
      return { id: p.id, total: ids.length, done, pct: ids.length ? done / ids.length : 0 };
    });
  }, [roadmap, progress]);

  const visiblePillars = activePillar === 'all'
    ? roadmap
    : roadmap.filter((p) => p.id === activePillar);

  async function toggle(id: string) {
    const next = !progress[id];
    setProgress((p) => ({ ...p, [id]: next }));
    startTransition(async () => {
      try {
        await fetch(`/api/items/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ done: next }),
        });
      } catch {
        // revert on failure
        setProgress((p) => ({ ...p, [id]: !next }));
      }
    });
  }

  async function resetAll() {
    if (!confirm('Reset all progress to zero?')) return;
    const backup = progress;
    const cleared: Record<string, boolean> = {};
    for (const k of Object.keys(progress)) cleared[k] = false;
    setProgress(cleared);
    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch {
      setProgress(backup);
    }
  }

  const overallPct = totals.total ? Math.round((totals.done / totals.total) * 100) : 0;

  return (
    <div className={styles.shell}>
      {/* TOP BANNER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandRow}>
            <span className={`mono ${styles.brand}`}>RAYANE / DEV-OPS</span>
            <span className={`mono ${styles.year}`}>VOL. MMXXVI</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine1}>The Senior</span>
            <span className={styles.titleLine2}>
              <em>Engineer&apos;s</em> Almanac
            </span>
          </h1>

          <p className={styles.tagline}>
            A field guide across four pillars — technical foundation, production architecture,
            positioning &amp; interviews, and the AI edge. {totals.total} disciplines to internalize.
          </p>

          <div className={styles.headerMeta}>
            <button className={styles.resetBtn} onClick={resetAll}>
              <span className="mono">↺ Reset progress</span>
            </button>
            <span className={`mono ${styles.savedDot}`}>
              <span className={styles.dot} data-active={isPending} /> {isPending ? 'syncing' : 'autosaved'}
            </span>
          </div>
        </div>
      </header>

      {/* MASTER METER */}
      <section className={styles.meter}>
        <div className={styles.meterGrid}>
          <div className={styles.meterLeft}>
            <span className={`mono ${styles.meterLabel}`}>Overall mastery</span>
            <div className={styles.meterFigure}>
              <span className={styles.meterPct}>{overallPct}</span>
              <span className={styles.meterPctSign}>%</span>
            </div>
            <span className={`mono ${styles.meterCount}`}>
              {totals.done.toString().padStart(3, '0')} / {totals.total} items
            </span>
          </div>

          <div className={styles.meterRight}>
            <svg viewBox="0 0 100 100" className={styles.ring}>
              <circle cx="50" cy="50" r="44" className={styles.ringTrack} />
              <circle
                cx="50" cy="50" r="44"
                className={styles.ringFill}
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - overallPct / 100)}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* PILLAR FILTER STRIP */}
      <nav className={styles.filterStrip}>
        <button
          className={styles.filterBtn}
          data-active={activePillar === 'all'}
          onClick={() => setActivePillar('all')}
        >
          <span className={`mono ${styles.filterTag}`}>00</span>
          <span className={styles.filterLabel}>All pillars</span>
          <span className={`mono ${styles.filterPct}`}>{overallPct}%</span>
        </button>
        {roadmap.map((p, i) => {
          const stat = pillarStats[i];
          const pct = Math.round(stat.pct * 100);
          return (
            <button
              key={p.id}
              className={styles.filterBtn}
              data-active={activePillar === p.id}
              onClick={() => setActivePillar(p.id)}
            >
              <span className={`mono ${styles.filterTag}`}>{p.number}</span>
              <span className={styles.filterLabel}>{p.label}</span>
              <span className={`mono ${styles.filterPct}`}>{pct}%</span>
            </button>
          );
        })}
      </nav>

      {/* PILLARS */}
      <main className={styles.main}>
        {visiblePillars.map((pillar, idx) => {
          const stat = pillarStats[roadmap.findIndex((p) => p.id === pillar.id)];
          const pct = Math.round(stat.pct * 100);
          return (
            <article key={pillar.id} className={styles.pillar} style={{ animationDelay: `${idx * 80}ms` }}>
              <div className={styles.pillarHead}>
                <div className={styles.pillarHeadLeft}>
                  <span className={`mono ${styles.pillarNum}`}>PILLAR / {pillar.number}</span>
                  <h2 className={styles.pillarTitle}>{pillar.label}</h2>
                  <p className={styles.pillarTagline}>{pillar.tagline}</p>
                </div>
                <div className={styles.pillarHeadRight}>
                  <div className={styles.pillarBar}>
                    <div className={styles.pillarBarFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`mono ${styles.pillarStat}`}>
                    {stat.done.toString().padStart(2, '0')}/{stat.total.toString().padStart(2, '0')} · {pct}%
                  </span>
                </div>
              </div>

              <div className={styles.categoryList}>
                {pillar.categories.map((cat) => (
                  <CategoryBlock
                    key={cat.id}
                    category={cat}
                    progress={progress}
                    onToggle={toggle}
                  />
                ))}
              </div>
            </article>
          );
        })}

        <footer className={styles.foot}>
          <span className={`mono ${styles.footLabel}`}>END OF ALMANAC</span>
          <span className={styles.footRule} />
          <span className={`mono ${styles.footMeta}`}>
            {totals.done}/{totals.total} · keep going
          </span>
        </footer>
      </main>
    </div>
  );
}

function CategoryBlock({
  category,
  progress,
  onToggle,
}: {
  category: RoadmapCategory;
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const ids = categoryItemIds(category);
  const done = ids.filter((id) => progress[id]).length;
  const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;

  return (
    <section className={styles.category} data-open={open}>
      <button className={styles.categoryHead} onClick={() => setOpen((o) => !o)}>
        <span className={styles.categoryChevron}>{open ? '−' : '+'}</span>
        <h3 className={styles.categoryTitle}>{category.label}</h3>
        <span className={`mono ${styles.categoryStat}`}>
          {done.toString().padStart(2, '0')} / {ids.length.toString().padStart(2, '0')}
        </span>
        <span className={styles.categoryMiniBar}>
          <span className={styles.categoryMiniFill} style={{ width: `${pct}%` }} />
        </span>
      </button>

      {open && (
        <div className={styles.categoryBody}>
          {category.items && (
            <ItemList items={category.items} progress={progress} onToggle={onToggle} />
          )}
          {category.subgroups?.map((sg) => (
            <div key={sg.id} className={styles.subgroup}>
              <span className={`mono ${styles.subgroupLabel}`}>// {sg.label}</span>
              <ItemList items={sg.items} progress={progress} onToggle={onToggle} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ItemList({
  items,
  progress,
  onToggle,
}: {
  items: { id: string; label: string }[];
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className={styles.itemList}>
      {items.map((item, i) => {
        const done = !!progress[item.id];
        return (
          <li key={item.id} className={styles.item} data-done={done}>
            <button className={styles.itemBtn} onClick={() => onToggle(item.id)}>
              <span className={styles.itemBox}>
                <svg viewBox="0 0 16 16" className={styles.itemBoxSvg}>
                  <path
                    d="M3 8.5 L7 12 L13.5 4.5"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={`mono ${styles.itemNum}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.itemLabel}>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
