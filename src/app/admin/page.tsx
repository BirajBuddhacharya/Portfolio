'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  PenLine,
  Mail,
  Settings,
  LogOut,
  Plus,
  Search,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  useAdminOverview,
  useAdminChart,
  useAdminTopPages,
  useAdminActivity,
  useAdminInbox,
  useAdminProjects,
  useAdminPosts,
  useAdminAbout,
  useAdminResume,
} from '../../services/adminService';
import { useAboutEducation } from '../../services/aboutService';
import { useAdminLogout } from '../../services/authService';
import { api } from '../../lib/apiClient';
import { placeholder } from '../../data/placeholder';

// ─── types ───────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'projects' | 'posts' | 'about' | 'experience' | 'education-certs' | 'skills' | 'editor' | 'inbox' | 'settings';
type InboxMsg = (typeof placeholder.admin.inbox)[number];
type ResumeRow = { title: string; period: string; organization: string; body: string };
type SkillRow = { title: string; body: string };

// ─── design tokens ────────────────────────────────────────────────────────────
const BG = '#09090B';
const SURFACE = '#0C0C0F';
const CARD = '#111115';
const BORDER = 'rgba(255,255,255,0.07)';
const ACCENT = '#FF6B6B';
const MUTED = '#6E6E78';
const TEXT = '#EDEDEF';
const TEXT2 = '#A1A1AA';

const mono = 'var(--font-jetbrains-mono), monospace';
const heading = 'var(--font-space-grotesk), sans-serif';
const body = 'var(--font-sora), system-ui, sans-serif';

// ─── Nav item ────────────────────────────────────────────────────────────────
const navItems: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'posts', label: 'Posts', icon: FileText },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education-certs', label: 'Education & Certs', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'editor', label: 'Editor', icon: PenLine },
  { id: 'inbox', label: 'Inbox', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isLive = status === 'live' || status === 'published';
  return (
    <span
      className="text-[10.5px] px-[9px] py-[3px] rounded-full border"
      style={{
        fontFamily: mono,
        color: isLive ? '#10B981' : MUTED,
        background: isLive ? '#10B98118' : 'rgba(255,255,255,0.04)',
        borderColor: isLive ? '#10B98140' : BORDER,
      }}
    >
      {status}
    </span>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10.5px] uppercase tracking-[0.14em] mb-4"
      style={{ fontFamily: mono, color: MUTED }}
    >
      {children}
    </div>
  );
}

// ─── Tag search combobox ─────────────────────────────────────────────────────
function TagSearch({
  selectedTags,
  onAdd,
}: {
  selectedTags: string[];
  onAdd: (tag: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    // local Next route, so bypass the backend baseURL
    api
      .get<{ tags: string[] }>('/api/tags', { baseURL: '' })
      .then(({ data }) => { setAllTags(data.tags); setLoading(false); })
      .catch(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    function onDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const filtered = allTags.filter(
    (t) =>
      !selectedTags.includes(t) &&
      (query === '' || t.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => { setOpen((p) => !p); setQuery(''); }}
        className="flex items-center justify-center w-[22px] h-[22px] rounded-[6px] border cursor-pointer transition-colors duration-150"
        style={{
          background: open ? `${ACCENT}20` : 'transparent',
          borderColor: open ? `${ACCENT}55` : BORDER,
          color: open ? ACCENT : MUTED,
        }}
        title="Add tag"
      >
        <Plus size={12} strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 w-[260px] rounded-[14px] border overflow-hidden"
            style={{ background: '#0F0F12', borderColor: `${ACCENT}30`, boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${ACCENT}18` }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-2 px-3 py-[10px] border-b"
              style={{ borderColor: BORDER }}
            >
              <Search size={13} style={{ color: MUTED, flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tags..."
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#3F3F46]"
                style={{ fontFamily: mono, color: TEXT }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ color: MUTED, cursor: 'pointer' }}>
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[200px] overflow-y-auto py-1">
              {loading ? (
                <div className="px-4 py-3 text-[12px]" style={{ fontFamily: mono, color: MUTED }}>
                  Loading...
                </div>
              ) : filtered.length === 0 ? (
                <div className="px-4 py-3 text-[12px]" style={{ fontFamily: mono, color: MUTED }}>
                  {query ? 'No matches' : 'All tags added'}
                </div>
              ) : (
                filtered.map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onAdd(tag);
                      setQuery('');
                      setOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-[8px] text-[13px] text-left cursor-pointer transition-colors duration-100 gap-2"
                    style={{ fontFamily: mono, color: TEXT2 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${ACCENT}12`;
                      (e.currentTarget as HTMLElement).style.color = TEXT;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = TEXT2;
                    }}
                  >
                    <span
                      className="w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: `${ACCENT}80` }}
                    />
                    {tag}
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div
              className="px-3 py-[7px] border-t text-[10.5px]"
              style={{ borderColor: BORDER, fontFamily: mono, color: MUTED }}
            >
              ↵ to select · esc to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dashboard tab ───────────────────────────────────────────────────────────
function DashboardTab() {
  const { data: stats = [] } = useAdminOverview();
  const { data: bars = [] } = useAdminChart();
  const { data: topPages = [] } = useAdminTopPages();
  const { data: activity = [] } = useAdminActivity();

  const maxBar = Math.max(...bars);

  return (
    <div className="grid grid-cols-4 gap-4 auto-rows-[120px]">

      {/* Visitor chart — 2 cols × 2 rows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="col-span-2 row-span-2 rounded-[16px] p-5 border flex flex-col"
        style={{ background: CARD, borderColor: BORDER }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <SectionLabel>visitors — last 14 days</SectionLabel>
          </div>
          <span
            className="text-[11px] px-3 py-1 rounded-full border"
            style={{ fontFamily: mono, color: '#10B981', background: '#10B98118', borderColor: '#10B98140' }}
          >
            +18.4%
          </span>
        </div>
        <div className="flex-1 flex items-end gap-[5px]">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
              <motion.div
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
                style={{
                  height: `${(h / maxBar) * 100}%`,
                  background: i === bars.length - 1 ? ACCENT : `${ACCENT}55`,
                  borderRadius: 4,
                  transformOrigin: 'bottom',
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stat cards — first 2 stacked in col 3 */}
      {stats.slice(0, 2).map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
          className="rounded-[16px] p-5 border flex flex-col justify-between"
          style={{ background: CARD, borderColor: BORDER }}
        >
          <div className="text-[11px]" style={{ fontFamily: mono, color: MUTED }}>{s.label}</div>
          <div>
            <div
              className="text-[32px] font-semibold leading-none mb-1"
              style={{ fontFamily: heading, color: TEXT }}
            >
              {s.value}
            </div>
            <div className="text-[11px]" style={{ fontFamily: mono, color: MUTED }}>{s.delta}</div>
          </div>
        </motion.div>
      ))}

      {/* Quick actions — col 4, row-span-2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28 }}
        className="row-span-2 rounded-[16px] p-5 border flex flex-col gap-3"
        style={{
          background: `rgba(255,107,107,0.07)`,
          borderColor: `${ACCENT}35`,
          boxShadow: `0 0 0 1px ${ACCENT}18 inset`,
        }}
      >
        <div
          className="text-[10.5px] uppercase tracking-[0.14em]"
          style={{ fontFamily: mono, color: ACCENT }}
        >
          Quick Actions
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {[{ label: '+ New post' }, { label: '+ New project' }].map((a) => (
            <button
              key={a.label}
              className="flex items-center text-[13px] px-4 py-[10px] rounded-[10px] border w-full text-left transition-colors duration-150 cursor-pointer"
              style={{
                fontFamily: mono,
                color: TEXT,
                background: 'rgba(0,0,0,0.35)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}50`;
                (e.currentTarget as HTMLElement).style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.color = TEXT;
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top pages — 2 cols × 1 row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.32 }}
        className="col-span-2 rounded-[16px] p-5 border"
        style={{ background: CARD, borderColor: BORDER }}
      >
        <SectionLabel>top pages</SectionLabel>
        <div className="flex flex-col gap-[6px]">
          {topPages.slice(0, 3).map((pg) => (
            <div key={pg.path} className="flex items-center gap-3">
              <span className="text-[12px] w-[80px] shrink-0" style={{ fontFamily: mono, color: TEXT2 }}>{pg.path}</span>
              <div className="flex-1 h-[4px] rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pg.pct}%`, background: `${ACCENT}88` }}
                />
              </div>
              <span className="text-[11px] w-[50px] text-right" style={{ fontFamily: mono, color: MUTED }}>{pg.views}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent activity — 2 cols × 2 rows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36 }}
        className="col-span-2 row-span-2 rounded-[16px] p-5 border flex flex-col"
        style={{ background: CARD, borderColor: BORDER }}
      >
        <SectionLabel>recent activity</SectionLabel>
        <div className="flex flex-col gap-4 flex-1 overflow-auto">
          {activity.map((a, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="w-[6px] h-[6px] rounded-full mt-[7px] shrink-0"
                style={{ background: ACCENT }}
              />
              <div>
                <div className="text-[13px] leading-snug" style={{ color: TEXT2 }}>{a.text}</div>
                <div className="text-[11px] mt-1" style={{ fontFamily: mono, color: MUTED }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Unread messages — 2 cols × 2 rows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="col-span-2 row-span-2 rounded-[16px] p-5 border flex flex-col"
        style={{ background: CARD, borderColor: BORDER }}
      >
        <SectionLabel>unread messages</SectionLabel>
        <div className="flex flex-col gap-3 flex-1 overflow-auto">
          {placeholder.admin.inbox.filter(m => !m.read).slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="rounded-[12px] p-3 border"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: BORDER }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-medium" style={{ color: TEXT }}>{m.name}</span>
                <span className="text-[10.5px]" style={{ fontFamily: mono, color: MUTED }}>{m.time}</span>
              </div>
              <div className="text-[12px] mb-1" style={{ color: TEXT2 }}>{m.subject}</div>
              <div
                className="text-[11.5px] leading-snug overflow-hidden"
                style={{ color: MUTED, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
              >
                {m.body}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

// ─── Projects tab ─────────────────────────────────────────────────────────────
function ProjectsTab() {
  const { data: projects = [] } = useAdminProjects();
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <SectionLabel>all projects</SectionLabel>
        <button
          className="text-[12px] px-4 py-2 rounded-[10px] border cursor-pointer transition-colors duration-150"
          style={{ fontFamily: mono, color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}10` }}
        >
          + New project
        </button>
      </div>
      <div className="rounded-[16px] border overflow-hidden" style={{ borderColor: BORDER }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}`, background: 'rgba(255,255,255,0.02)' }}>
              {['Project', 'Type', 'Year', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: mono, color: MUTED }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <motion.tr
                key={p.title}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ borderBottom: i < projects.length - 1 ? `1px solid ${BORDER}` : 'none' }}
              >
                <td className="px-5 py-[14px] text-[13.5px] font-medium" style={{ color: TEXT }}>{p.title}</td>
                <td className="px-5 py-[14px] text-[12.5px]" style={{ fontFamily: mono, color: TEXT2 }}>{p.kind}</td>
                <td className="px-5 py-[14px] text-[12.5px]" style={{ fontFamily: mono, color: MUTED }}>{p.year}</td>
                <td className="px-5 py-[14px]"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-[14px]">
                  <div className="flex gap-2">
                    <button className="text-[11px] px-3 py-1 rounded-[8px] border cursor-pointer transition-colors duration-150" style={{ fontFamily: mono, color: TEXT2, borderColor: BORDER, background: 'transparent' }}>edit</button>
                    <button className="text-[11px] px-3 py-1 rounded-[8px] border cursor-pointer transition-colors duration-150" style={{ fontFamily: mono, color: '#EF4444', borderColor: '#EF444430', background: '#EF444410' }}>del</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Posts tab ────────────────────────────────────────────────────────────────
function PostsTab() {
  const { data: posts = [] } = useAdminPosts();
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <SectionLabel>all posts</SectionLabel>
        <button
          className="text-[12px] px-4 py-2 rounded-[10px] border cursor-pointer transition-colors duration-150"
          style={{ fontFamily: mono, color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}10` }}
        >
          + New post
        </button>
      </div>
      <div className="rounded-[16px] border overflow-hidden" style={{ borderColor: BORDER }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}`, background: 'rgba(255,255,255,0.02)' }}>
              {['Title', 'Tags', 'Date', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: mono, color: MUTED }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <motion.tr
                key={p.title}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ borderBottom: i < posts.length - 1 ? `1px solid ${BORDER}` : 'none' }}
              >
                <td className="px-5 py-[14px] text-[13px] max-w-[360px]" style={{ color: TEXT }}>{p.title}</td>
                <td className="px-5 py-[14px]">
                  <div className="flex flex-wrap gap-[5px]">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10.5px] px-[9px] py-[3px] rounded-full border"
                        style={{ fontFamily: mono, color: TEXT2, borderColor: BORDER, background: 'rgba(255,255,255,0.04)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-[14px] text-[12px]" style={{ fontFamily: mono, color: MUTED }}>{p.date}</td>
                <td className="px-5 py-[14px]"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-[14px]">
                  <div className="flex gap-2">
                    <button className="text-[11px] px-3 py-1 rounded-[8px] border cursor-pointer" style={{ fontFamily: mono, color: TEXT2, borderColor: BORDER, background: 'transparent' }}>edit</button>
                    <button className="text-[11px] px-3 py-1 rounded-[8px] border cursor-pointer" style={{ fontFamily: mono, color: '#EF4444', borderColor: '#EF444430', background: '#EF444410' }}>del</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Editor tab ───────────────────────────────────────────────────────────────
function EditorTab() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addTag = (t: string) => setSelectedTags((prev) => prev.includes(t) ? prev : [...prev, t]);
  const removeTag = (t: string) => setSelectedTags((prev) => prev.filter((x) => x !== t));

  const inputStyle = {
    background: '#131317',
    borderColor: BORDER,
    color: TEXT,
    fontFamily: body,
  };

  return (
    <div className="flex gap-5">

      {/* Main editor area */}
      <div className="flex-1 flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full rounded-[12px] border px-5 py-3 text-[20px] font-semibold outline-none transition-colors duration-150 placeholder:text-[#3F3F46]"
          style={{ ...inputStyle, fontFamily: heading, letterSpacing: '-0.02em' }}
          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`; }}
          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
        />
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Excerpt — the summary shown on the blog list..."
          className="w-full rounded-[12px] border px-5 py-3 text-[14px] leading-relaxed outline-none resize-none transition-colors duration-150 placeholder:text-[#3F3F46]"
          style={inputStyle}
          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`; }}
          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your markdown here..."
          className="flex-1 w-full rounded-[12px] border px-5 py-4 text-[14px] leading-relaxed outline-none resize-none transition-colors duration-150 placeholder:text-[#3F3F46] min-h-[460px]"
          style={{ ...inputStyle, fontFamily: mono, fontSize: 13 }}
          onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`; }}
          onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
        />
      </div>

      {/* Sidebar */}
      <div className="w-[220px] shrink-0 flex flex-col gap-4">

        {/* Status card */}
        <div className="rounded-[14px] border p-4" style={{ background: CARD, borderColor: BORDER }}>
          <SectionLabel>publish</SectionLabel>
          <div className="flex flex-col gap-2 mb-4">
            {[
              { label: 'Status', value: 'Draft' },
              { label: 'Visibility', value: 'Private' },
              { label: 'Read time', value: content ? `${Math.max(1, Math.ceil(content.split(' ').length / 200))} min` : '—' },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between text-[12px]">
                <span style={{ fontFamily: mono, color: MUTED }}>{r.label}</span>
                <span style={{ color: TEXT2 }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="w-full py-[9px] rounded-[10px] border text-[12px] font-medium cursor-pointer transition-colors duration-150"
              style={{ fontFamily: mono, color: TEXT2, borderColor: BORDER, background: 'rgba(255,255,255,0.04)' }}
            >
              Save draft
            </button>
            <button
              className="w-full py-[9px] rounded-[10px] text-[12px] font-medium cursor-pointer transition-colors duration-150"
              style={{ fontFamily: mono, color: '#111', background: ACCENT }}
            >
              Publish
            </button>
          </div>
        </div>

        {/* Cover image */}
        <div className="rounded-[14px] border p-4" style={{ background: CARD, borderColor: BORDER }}>
          <SectionLabel>cover image</SectionLabel>
          <div
            className="rounded-[10px] border border-dashed flex items-center justify-center py-6 text-[11.5px] cursor-pointer transition-colors duration-150"
            style={{ fontFamily: mono, color: MUTED, borderColor: 'rgba(255,255,255,0.12)' }}
          >
            drop image here
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-[14px] border p-4" style={{ background: CARD, borderColor: BORDER }}>
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-[10.5px] uppercase tracking-[0.14em]"
              style={{ fontFamily: mono, color: MUTED }}
            >
              Tags
            </div>
            <TagSearch selectedTags={selectedTags} onAdd={addTag} />
          </div>

          {selectedTags.length === 0 ? (
            <div
              className="text-[11.5px] py-2"
              style={{ fontFamily: mono, color: MUTED }}
            >
              No tags — click + to add
            </div>
          ) : (
            <div className="flex flex-wrap gap-[6px]">
              {selectedTags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[11px] px-[9px] py-[4px] rounded-full border"
                  style={{
                    fontFamily: mono,
                    color: ACCENT,
                    borderColor: `${ACCENT}44`,
                    background: `${ACCENT}10`,
                  }}
                >
                  {t}
                  <button
                    onClick={() => removeTag(t)}
                    className="cursor-pointer transition-opacity duration-100 leading-none"
                    style={{ color: `${ACCENT}99` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ACCENT; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${ACCENT}99`; }}
                  >
                    <X size={10} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Inbox tab ────────────────────────────────────────────────────────────────
function InboxTab() {
  const { data: msgs = [] } = useAdminInbox();
  const [selected, setSelected] = useState<InboxMsg | null>(msgs[0] ?? null);

  const unreadCount = msgs.filter((m) => !m.read).length;

  return (
    <div className="flex gap-4 h-[580px]">

      {/* List panel */}
      <div className="w-[280px] shrink-0 flex flex-col rounded-[16px] border overflow-hidden" style={{ borderColor: BORDER, background: CARD }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: BORDER }}>
          <span className="text-[12px] font-medium" style={{ color: TEXT }}>Inbox</span>
          {unreadCount > 0 && (
            <span
              className="text-[10px] px-2 py-[2px] rounded-full"
              style={{ fontFamily: mono, color: '#111', background: ACCENT }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex-1 overflow-auto">
          {msgs.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className="w-full text-left px-4 py-3 border-b transition-colors duration-150 cursor-pointer"
              style={{
                borderColor: BORDER,
                background: selected?.id === m.id ? 'rgba(255,107,107,0.06)' : 'transparent',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-[13px] font-medium truncate"
                  style={{ color: m.read ? TEXT2 : TEXT }}
                >
                  {!m.read && <span className="inline-block w-[6px] h-[6px] rounded-full mr-2 align-middle" style={{ background: ACCENT }} />}
                  {m.name}
                </span>
                <span className="text-[10px] shrink-0 ml-2" style={{ fontFamily: mono, color: MUTED }}>{m.time}</span>
              </div>
              <div className="text-[12px] truncate" style={{ color: MUTED }}>{m.subject}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-1 rounded-[16px] border flex flex-col overflow-hidden"
            style={{ background: CARD, borderColor: BORDER }}
          >
            <div className="px-6 py-5 border-b" style={{ borderColor: BORDER }}>
              <div className="text-[17px] font-semibold mb-1" style={{ fontFamily: heading, color: TEXT }}>{selected.subject}</div>
              <div className="flex items-center gap-2 text-[12px]" style={{ fontFamily: mono, color: MUTED }}>
                <span>{selected.name}</span>
                <span>·</span>
                <span>{selected.email}</span>
                <span>·</span>
                <span>{selected.time} ago</span>
              </div>
            </div>
            <div className="flex-1 px-6 py-5 overflow-auto text-[14px] leading-relaxed" style={{ color: TEXT2 }}>
              {selected.body}
            </div>
            <div className="px-6 py-4 border-t flex gap-2" style={{ borderColor: BORDER }}>
              {[
                { label: 'Reply', primary: true },
                { label: 'Archive', primary: false },
                { label: 'Mark read', primary: false },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="text-[12px] px-4 py-2 rounded-[10px] border cursor-pointer transition-colors duration-150"
                  style={{
                    fontFamily: mono,
                    color: btn.primary ? '#111' : TEXT2,
                    background: btn.primary ? ACCENT : 'rgba(255,255,255,0.04)',
                    borderColor: btn.primary ? ACCENT : BORDER,
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[13px]" style={{ fontFamily: mono, color: MUTED }}>
            select a message
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── About tab ────────────────────────────────────────────────────────────────
function AboutTab() {
  const { data: about } = useAdminAbout();

  const [headline, setHeadline] = useState(about?.headline ?? '');
  const [coverImage, setCoverImage] = useState(about?.coverImage ?? '');
  const [paragraphs, setParagraphs] = useState<string[]>(about?.paragraphs ?? []);
  const [facts, setFacts] = useState<typeof placeholder.about.facts>(about?.facts ?? []);

  const { data: educationEntries = [] } = useAboutEducation();

  const inputStyle = { background: '#131317', borderColor: BORDER, color: TEXT, outline: 'none' };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`;
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = BORDER;
  };

  return (
    <div className="max-w-[860px] flex flex-col gap-10">

      {/* ── Headline ── */}
      <div>
        <SectionLabel>page headline</SectionLabel>
        <input
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. ML engineer with a full-stack habit"
          className="w-full rounded-[10px] border px-4 py-[10px] text-[15px] font-semibold transition-colors duration-150"
          style={{ ...inputStyle, fontFamily: heading, letterSpacing: '-0.02em' }}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
        <div className="text-[11px] mt-2" style={{ fontFamily: mono, color: MUTED }}>
          The accent dot (.) is appended automatically on the public page.
        </div>
      </div>

      {/* ── Cover image ── */}
      <div>
        <SectionLabel>cover image</SectionLabel>
        <input
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/portrait.jpg  (or leave blank for placeholder)"
          className="w-full rounded-[10px] border px-4 py-[10px] text-[13.5px] transition-colors duration-150"
          style={inputStyle}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
        {coverImage && (
          <div
            className="mt-3 rounded-[12px] border overflow-hidden"
            style={{ borderColor: BORDER, maxWidth: 160, aspectRatio: '4/5' }}
          >
            <img
              src={coverImage}
              alt="cover preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      {/* ── Bio paragraphs ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <SectionLabel>bio paragraphs</SectionLabel>
          <button
            onClick={() => setParagraphs((prev) => [...prev, ''])}
            className="text-[11px] px-3 py-[5px] rounded-[8px] border cursor-pointer transition-colors duration-150"
            style={{ fontFamily: mono, color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}10` }}
          >
            + add paragraph
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={p}
                onChange={(e) => setParagraphs((prev) => prev.map((x, j) => j === i ? e.target.value : x))}
                rows={3}
                className="flex-1 rounded-[10px] border px-4 py-3 text-[13.5px] leading-relaxed resize-none transition-colors duration-150"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <button
                onClick={() => setParagraphs((prev) => prev.filter((_, j) => j !== i))}
                className="text-[11px] px-3 py-[7px] rounded-[8px] border cursor-pointer shrink-0 mt-[1px] transition-colors duration-150"
                style={{ fontFamily: mono, color: '#EF4444', borderColor: '#EF444430', background: '#EF444410' }}
              >
                del
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Education & certifications (view-only) ── */}
      <div>
        <SectionLabel>education &amp; certifications</SectionLabel>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {educationEntries.map((e, i) => (
            <div
              key={i}
              className="p-6 rounded-[16px] border border-white/[0.08]"
              style={{ background: '#0C0C0F' }}
            >
              <div
                className="text-[11.5px] mb-3"
                style={{ fontFamily: mono, color: ACCENT }}
              >
                {e.period}
              </div>
              <div
                className="text-[18px] font-semibold mb-[6px]"
                style={{ fontFamily: heading, letterSpacing: '-0.02em', color: TEXT }}
              >
                {e.title}
              </div>
              <div className="text-[14px] leading-[1.6]" style={{ color: '#8A8A93' }}>
                {e.place}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[11px] mt-3" style={{ fontFamily: mono, color: MUTED }}>
          Manage education entries in the Resume tab.
        </div>
      </div>

      {/* ── Beyond the keyboard (facts) ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <SectionLabel>beyond the keyboard</SectionLabel>
          <button
            onClick={() => setFacts((prev) => [...prev, { k: '', v: '' }])}
            className="text-[11px] px-3 py-[5px] rounded-[8px] border cursor-pointer transition-colors duration-150"
            style={{ fontFamily: mono, color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}10` }}
          >
            + add fact
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {facts.map((f, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={f.k}
                onChange={(e) => setFacts((prev) => prev.map((row, j) => j === i ? { ...row, k: e.target.value } : row))}
                placeholder="label"
                className="w-[180px] shrink-0 rounded-[9px] border px-3 py-[8px] text-[12px] transition-colors duration-150"
                style={{ ...inputStyle, fontFamily: mono }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <input
                value={f.v}
                onChange={(e) => setFacts((prev) => prev.map((row, j) => j === i ? { ...row, v: e.target.value } : row))}
                placeholder="value"
                className="flex-1 rounded-[9px] border px-3 py-[8px] text-[13.5px] transition-colors duration-150"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              <button
                onClick={() => setFacts((prev) => prev.filter((_, j) => j !== i))}
                className="text-[11px] px-3 py-[7px] rounded-[8px] border cursor-pointer shrink-0 transition-colors duration-150"
                style={{ fontFamily: mono, color: '#EF4444', borderColor: '#EF444430', background: '#EF444410' }}
              >
                del
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Save ── */}
      <button
        className="self-start text-[13px] font-medium px-6 py-[10px] rounded-[12px] cursor-pointer transition-opacity duration-150 hover:opacity-90"
        style={{ fontFamily: mono, color: '#111', background: ACCENT }}
      >
        Save changes
      </button>

    </div>
  );
}

// ─── Shared resume row editor ─────────────────────────────────────────────────
function ResumeRowEditor<T extends ResumeRow>({
  rows,
  setRows,
  addLabel,
}: {
  rows: T[];
  setRows: React.Dispatch<React.SetStateAction<T[]>>;
  addLabel: string;
}) {
  const inputStyle = { background: '#131317', borderColor: BORDER, color: TEXT, outline: 'none' };
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`;
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = BORDER;
  };
  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setRows((prev) => [...prev, { title: '', period: '', organization: '', body: '' } as T])}
          className="text-[11px] px-3 py-[5px] rounded-[8px] border cursor-pointer transition-colors duration-150"
          style={{ fontFamily: mono, color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}10` }}
        >
          {addLabel}
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-[14px] border p-4 flex flex-col gap-3"
            style={{ background: CARD, borderColor: BORDER }}
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px]" style={{ fontFamily: mono, color: MUTED }}>entry {i + 1}</div>
              <button
                onClick={() => setRows((prev) => prev.filter((_, j) => j !== i))}
                className="text-[10.5px] px-3 py-[4px] rounded-[7px] border cursor-pointer transition-colors duration-150"
                style={{ fontFamily: mono, color: '#EF4444', borderColor: '#EF444430', background: '#EF444410' }}
              >
                remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(['title', 'organization'] as const).map((field) => (
                <div key={field}>
                  <label className="block text-[10.5px] mb-1" style={{ fontFamily: mono, color: MUTED }}>{field}</label>
                  <input
                    value={row[field]}
                    onChange={(e) => setRows((prev) => prev.map((r, j) => j === i ? { ...r, [field]: e.target.value } : r))}
                    className="w-full rounded-[9px] border px-3 py-[8px] text-[13px] transition-colors duration-150"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[10.5px] mb-1" style={{ fontFamily: mono, color: MUTED }}>period</label>
              <input
                value={row.period}
                onChange={(e) => setRows((prev) => prev.map((r, j) => j === i ? { ...r, period: e.target.value } : r))}
                placeholder="e.g. 2023 — present"
                className="w-full rounded-[9px] border px-3 py-[8px] text-[13px] transition-colors duration-150"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            <div>
              <label className="block text-[10.5px] mb-1" style={{ fontFamily: mono, color: MUTED }}>body</label>
              <textarea
                value={row.body}
                onChange={(e) => setRows((prev) => prev.map((r, j) => j === i ? { ...r, body: e.target.value } : r))}
                rows={2}
                className="w-full rounded-[9px] border px-3 py-[8px] text-[13px] leading-relaxed resize-none transition-colors duration-150"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Experience tab ───────────────────────────────────────────────────────────
function ExperienceTab() {
  const { data: resumeAdmin } = useAdminResume();
  const [experiences, setExperiences] = useState<ResumeRow[]>(resumeAdmin?.experiences ?? []);
  return (
    <div className="max-w-[860px] flex flex-col gap-6">
      <SectionLabel>experience</SectionLabel>
      <ResumeRowEditor rows={experiences} setRows={setExperiences} addLabel="+ add experience" />
      <button
        className="self-start text-[13px] font-medium px-6 py-[10px] rounded-[12px] cursor-pointer transition-opacity duration-150 hover:opacity-90"
        style={{ fontFamily: mono, color: '#111', background: ACCENT }}
      >
        Save changes
      </button>
    </div>
  );
}

// ─── Education & Certs tab ────────────────────────────────────────────────────
function EducationCertsTab() {
  const { data: resumeAdmin } = useAdminResume();
  const [educationEntries, setEducationEntries] = useState<ResumeRow[]>(resumeAdmin?.education ?? []);
  const [certs, setCerts] = useState<ResumeRow[]>(resumeAdmin?.certifications ?? []);
  return (
    <div className="max-w-[860px] flex flex-col gap-10">
      <div>
        <SectionLabel>education</SectionLabel>
        <ResumeRowEditor rows={educationEntries} setRows={setEducationEntries} addLabel="+ add education" />
      </div>
      <div>
        <SectionLabel>certifications</SectionLabel>
        <ResumeRowEditor rows={certs} setRows={setCerts} addLabel="+ add certification" />
      </div>
      <button
        className="self-start text-[13px] font-medium px-6 py-[10px] rounded-[12px] cursor-pointer transition-opacity duration-150 hover:opacity-90"
        style={{ fontFamily: mono, color: '#111', background: ACCENT }}
      >
        Save changes
      </button>
    </div>
  );
}

// ─── Skills tab ───────────────────────────────────────────────────────────────
function SkillsTab() {
  const { data: resumeAdmin } = useAdminResume();
  const [skills, setSkills] = useState<SkillRow[]>(resumeAdmin?.skills ?? []);

  const inputStyle = { background: '#131317', borderColor: BORDER, color: TEXT, outline: 'none' };
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`;
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = BORDER;
  };

  return (
    <div className="max-w-[860px] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel>skills</SectionLabel>
        <button
          onClick={() => setSkills((prev) => [...prev, { title: '', body: '' }])}
          className="text-[11px] px-3 py-[5px] rounded-[8px] border cursor-pointer transition-colors duration-150"
          style={{ fontFamily: mono, color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}10` }}
        >
          + add category
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="rounded-[14px] border p-4 flex flex-col gap-3"
            style={{ background: CARD, borderColor: BORDER }}
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px]" style={{ fontFamily: mono, color: MUTED }}>category {i + 1}</div>
              <button
                onClick={() => setSkills((prev) => prev.filter((_, j) => j !== i))}
                className="text-[10.5px] px-3 py-[4px] rounded-[7px] border cursor-pointer transition-colors duration-150"
                style={{ fontFamily: mono, color: '#EF4444', borderColor: '#EF444430', background: '#EF444410' }}
              >
                remove
              </button>
            </div>
            <div>
              <label className="block text-[10.5px] mb-1" style={{ fontFamily: mono, color: MUTED }}>category name</label>
              <input
                value={skill.title}
                onChange={(e) => setSkills((prev) => prev.map((r, j) => j === i ? { ...r, title: e.target.value } : r))}
                className="w-full rounded-[9px] border px-3 py-[8px] text-[13px] transition-colors duration-150"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
            <div>
              <label className="block text-[10.5px] mb-1" style={{ fontFamily: mono, color: MUTED }}>items (comma-separated)</label>
              <textarea
                value={skill.body}
                onChange={(e) => setSkills((prev) => prev.map((r, j) => j === i ? { ...r, body: e.target.value } : r))}
                rows={2}
                className="w-full rounded-[9px] border px-3 py-[8px] text-[13px] leading-relaxed resize-none transition-colors duration-150"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="self-start text-[13px] font-medium px-6 py-[10px] rounded-[12px] cursor-pointer transition-opacity duration-150 hover:opacity-90"
        style={{ fontFamily: mono, color: '#111', background: ACCENT }}
      >
        Save changes
      </button>
    </div>
  );
}

// ─── Settings tab ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const fields = placeholder.admin.settingsFields;
  const [vals, setVals] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.label, f.value]))
  );

  const [notifEmail, setNotifEmail] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const inputStyle = {
    background: '#131317',
    borderColor: BORDER,
    color: TEXT,
    outline: 'none',
  };

  return (
    <div className="max-w-[680px] flex flex-col gap-8">

      {/* Profile fields */}
      <div>
        <SectionLabel>profile</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="block text-[11px] mb-2" style={{ fontFamily: mono, color: MUTED }}>{f.label}</label>
              <input
                value={vals[f.label]}
                onChange={(e) => setVals((prev) => ({ ...prev, [f.label]: e.target.value }))}
                className="w-full rounded-[10px] border px-4 py-[10px] text-[13.5px] transition-colors duration-150"
                style={inputStyle}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}55`; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Preferences toggles */}
      <div>
        <SectionLabel>preferences</SectionLabel>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Email notifications', desc: 'Get notified about new messages', val: notifEmail, set: setNotifEmail },
            { label: 'Dark mode', desc: 'Use the dark theme everywhere', val: darkMode, set: setDarkMode },
            { label: 'Analytics', desc: 'Share anonymous usage data', val: analytics, set: setAnalytics },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between rounded-[12px] border px-4 py-3"
              style={{ background: CARD, borderColor: BORDER }}
            >
              <div>
                <div className="text-[13.5px] font-medium" style={{ color: TEXT }}>{pref.label}</div>
                <div className="text-[12px]" style={{ color: MUTED }}>{pref.desc}</div>
              </div>
              <button
                onClick={() => pref.set(!pref.val)}
                className="relative w-[42px] h-[24px] rounded-full border cursor-pointer transition-colors duration-200"
                style={{
                  background: pref.val ? `${ACCENT}33` : 'rgba(255,255,255,0.06)',
                  borderColor: pref.val ? `${ACCENT}55` : BORDER,
                }}
              >
                <div
                  className="absolute top-[3px] w-[16px] h-[16px] rounded-full transition-all duration-200"
                  style={{
                    left: pref.val ? '22px' : '3px',
                    background: pref.val ? ACCENT : MUTED,
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <button
        className="self-start text-[13px] font-medium px-6 py-[10px] rounded-[12px] cursor-pointer transition-opacity duration-150 hover:opacity-90"
        style={{ fontFamily: mono, color: '#111', background: ACCENT }}
      >
        Save changes
      </button>

    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const logout = useAdminLogout();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const unread = placeholder.admin.inbox.filter((m) => !m.read).length;

  const tabContent: Record<Tab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    projects: <ProjectsTab />,
    posts: <PostsTab />,
    about: <AboutTab />,
    experience: <ExperienceTab />,
    'education-certs': <EducationCertsTab />,
    skills: <SkillsTab />,
    editor: <EditorTab />,
    inbox: <InboxTab />,
    settings: <SettingsTab />,
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: BG, color: TEXT, fontFamily: body }}
    >

      {/* ── Sidebar ── */}
      <aside
        className="w-[220px] shrink-0 flex flex-col border-r sticky top-0 h-screen"
        style={{ background: SURFACE, borderColor: BORDER }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: BORDER }}>
          <div
            className="text-[18px] font-bold mb-[2px]"
            style={{ fontFamily: heading, letterSpacing: '-0.03em', color: TEXT }}
          >
            BB
          </div>
          <div className="text-[11px]" style={{ fontFamily: mono, color: MUTED }}>
            biraj / admin
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-3 px-3 py-[9px] rounded-[10px] text-[13px] w-full text-left cursor-pointer transition-colors duration-150 relative"
                style={{
                  fontFamily: mono,
                  color: isActive ? ACCENT : MUTED,
                  background: isActive ? `${ACCENT}0F` : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <item.icon size={15} strokeWidth={1.6} />
                {item.label}
                {item.id === 'inbox' && unread > 0 && (
                  <span
                    className="ml-auto text-[9.5px] px-[7px] py-[2px] rounded-full"
                    style={{ color: '#111', background: ACCENT }}
                  >
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: avatar + back to site */}
        <div className="px-3 py-4 border-t" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
              style={{ background: `${ACCENT}22`, color: ACCENT }}
            >
              B
            </div>
            <div>
              <div className="text-[12.5px] font-medium" style={{ color: TEXT }}>Biraj</div>
              <div className="text-[10.5px]" style={{ fontFamily: mono, color: MUTED }}>admin</div>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-[8px] rounded-[10px] text-[12px] transition-colors duration-150"
            style={{ fontFamily: mono, color: MUTED, textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT2; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
          >
            ← back to site
          </Link>
          <button
            onClick={() => {
              logout();
              router.replace('/admin/login');
              router.refresh();
            }}
            className="flex items-center gap-2 px-3 py-[8px] rounded-[10px] text-[12px] w-full text-left cursor-pointer transition-colors duration-150"
            style={{ fontFamily: mono, color: MUTED, background: 'transparent' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
          >
            <LogOut size={13} strokeWidth={1.7} />
            sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div
          className="flex items-center justify-between px-8 py-4 border-b sticky top-0 z-10"
          style={{ background: SURFACE, borderColor: BORDER }}
        >
          <div>
            <div
              className="text-[19px] font-semibold leading-tight"
              style={{ fontFamily: heading, letterSpacing: '-0.025em', color: TEXT }}
            >
              {navItems.find((n) => n.id === activeTab)?.label}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[12px] px-4 py-[7px] rounded-[10px] border transition-colors duration-150"
              style={{ fontFamily: mono, color: TEXT2, borderColor: BORDER, background: 'transparent', textDecoration: 'none' }}
            >
              View site ↗
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
