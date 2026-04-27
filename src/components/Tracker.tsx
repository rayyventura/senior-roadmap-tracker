'use client';

import { useMemo, useState, useTransition } from 'react';
import type { RoadmapPillar, RoadmapCategory } from '@/lib/roadmap-data';
import type { Resource } from '@/lib/db';
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
            positioning and interviews, and the AI edge. {totals.total} disciplines to internalize.
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
          <ItemBlock
            key={item.id}
            itemId={item.id}
            label={item.label}
            index={i}
            done={done}
            onToggle={onToggle}
          />
        );
      })}
    </ul>
  );
}

function ItemBlock({
  itemId,
  label,
  index,
  done,
  onToggle,
}: {
  itemId: string;
  label: string;
  index: number;
  done: boolean;
  onToggle: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [resourceType, setResourceType] = useState<'link' | 'file'>('link');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [addingResource, setAddingResource] = useState(false);

  async function loadResources() {
    if (resources.length > 0 || loadingResources) return;
    
    setLoadingResources(true);
    try {
      const response = await fetch(`/api/resources/${encodeURIComponent(itemId)}`);
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoadingResources(false);
    }
  }

  const handleExpandClick = () => {
    if (!expanded && resources.length === 0) {
      loadResources();
    }
    setExpanded(!expanded);
  };

  async function handleAddResource(e: React.FormEvent) {
    e.preventDefault();
    if (!resourceTitle || (resourceType === 'link' && !resourceUrl)) return;

    setAddingResource(true);
    try {
      let fileData: string | undefined;
      if (resourceType === 'file' && resourceFile) {
        fileData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(resourceFile);
        });
      }

      const response = await fetch(`/api/resources/${encodeURIComponent(itemId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: resourceType,
          title: resourceTitle,
          url: resourceType === 'link' ? resourceUrl : undefined,
          fileData: fileData,
        }),
      });

      if (response.ok) {
        const newResource = await response.json();
        setResources([newResource, ...resources]);
        setResourceTitle('');
        setResourceUrl('');
        setResourceFile(null);
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding resource:', error);
    } finally {
      setAddingResource(false);
    }
  }

  async function handleDeleteResource(resourceId: string) {
    try {
      const response = await fetch(
        `/api/resources/${encodeURIComponent(resourceId)}?action=delete-resource`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setResources(resources.filter((r) => r.id !== resourceId));
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  }

  return (
    <li key={itemId} className={styles.item} data-done={done} data-expanded={expanded}>
      <div className={styles.itemHeader}>
        <button className={styles.itemBtn} onClick={() => onToggle(itemId)}>
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
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={styles.itemLabel}>{label}</span>
        </button>
        <button
          className={styles.itemExpand}
          onClick={handleExpandClick}
          title={expanded ? 'Collapse resources' : 'Expand resources'}
          data-expanded={expanded}
        >
          <svg viewBox="0 0 16 16" className={styles.expandIcon}>
            <path d="M4 6 L8 10 L12 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className={styles.itemResources}>
          <div className={styles.resourcesContainer}>
            {resources.length > 0 ? (
              <div className={styles.resourcesList}>
                {resources.map((resource) => (
                  <div key={resource.id} className={styles.resourceItem} data-type={resource.type}>
                    <div className={styles.resourceContent}>
                      <a
                        href={resource.url || (resource.file_data ? resource.file_data : '#')}
                        target={resource.url ? '_blank' : undefined}
                        rel={resource.url ? 'noopener noreferrer' : undefined}
                        className={styles.resourceLink}
                        download={resource.type === 'file' ? resource.title : undefined}
                        onClick={(e) => {
                          if (resource.type === 'file' && resource.file_data) {
                            e.preventDefault();
                            const link = document.createElement('a');
                            link.href = resource.file_data;
                            link.download = resource.title;
                            link.click();
                          }
                        }}
                      >
                        <span className={styles.resourceIcon}>
                          {resource.type === 'link' ? '🔗' : '📎'}
                        </span>
                        <span className={styles.resourceTitle}>{resource.title}</span>
                      </a>
                    </div>
                    <button
                      className={styles.resourceDelete}
                      onClick={() => handleDeleteResource(resource.id)}
                      title="Delete resource"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noResources}>No resources yet</p>
            )}

            {!showAddForm ? (
              <button
                className={styles.addResourceBtn}
                onClick={() => setShowAddForm(true)}
              >
                + Add resource
              </button>
            ) : (
              <form className={styles.resourceForm} onSubmit={handleAddResource}>
                <div className={styles.formGroup}>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value as 'link' | 'file')}
                    className={styles.formInput}
                  >
                    <option value="link">Link</option>
                    <option value="file">File</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Resource title"
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>

                {resourceType === 'link' && (
                  <div className={styles.formGroup}>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={resourceUrl}
                      onChange={(e) => setResourceUrl(e.target.value)}
                      className={styles.formInput}
                      required
                    />
                  </div>
                )}

                {resourceType === 'file' && (
                  <div className={styles.formGroup}>
                    <input
                      type="file"
                      onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
                      className={styles.formInput}
                      required
                    />
                  </div>
                )}

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={addingResource}
                  >
                    {addingResource ? 'Adding...' : 'Add'}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setShowAddForm(false);
                      setResourceTitle('');
                      setResourceUrl('');
                      setResourceFile(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
