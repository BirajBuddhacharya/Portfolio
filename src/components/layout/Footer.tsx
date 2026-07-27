'use client';

import Link from 'next/link';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Résumé', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-[110px] border-t border-white/[0.08]"
      style={{ background: '#0B0B0E' }}
    >
      <div className="max-w-[1180px] mx-auto px-7 py-[52px] grid gap-8"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
      >
        <div>
          <div
            className="text-[20px] font-semibold mb-[10px]"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em', color: '#EDEDEF' }}
          >
            Biraj Buddhacharya<span style={{ color: '#FF6B6B' }}>.</span>
          </div>
          <div
            className="text-[12px] leading-[1.8]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#6E6E78' }}
          >
            Kathmandu, Nepal<br />birajbuddhacharya@gmail.com
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#4A4A52' }}
          >
            Pages
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12.5px] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#8A8A93' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FF6B6B'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A93'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-[10px]">
          <div
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#4A4A52' }}
          >
            Elsewhere
          </div>
          {[
            { label: 'GitHub', href: 'https://github.com/birajbuddhacharya' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/biraj-buddhacharya' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12.5px] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#8A8A93' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FF6B6B'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A93'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-[10px]">
          <div
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#4A4A52' }}
          >
            System
          </div>
          <Link
            href="/admin"
            className="text-[12.5px] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#8A8A93' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FF6B6B'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#8A8A93'; }}
          >
            Admin panel
          </Link>
          <div
            className="mt-auto text-[11.5px] blink-cursor"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#4A4A52' }}
          >
            © 2026 — built from scratch
          </div>
        </div>
      </div>
    </footer>
  );
}
