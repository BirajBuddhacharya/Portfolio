'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="max-w-[1180px] mx-auto px-7 pt-[110px]">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="border border-[rgba(255,107,107,0.28)] rounded-[24px] py-[70px] px-8 text-center"
        style={{
          background: 'radial-gradient(120% 140% at 50% 0%, rgba(255,107,107,0.12) 0%, rgba(255,107,107,0) 60%), #0C0C0F',
        }}
      >
        <h2
          className="mb-4"
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: 'clamp(32px, 5.6vw, 60px)',
            letterSpacing: '-0.04em',
            fontWeight: 600,
            color: '#EDEDEF',
            margin: '0 0 16px',
          }}
        >
          Let&apos;s build something<span style={{ color: '#FF6B6B' }}>.</span>
        </h2>
        <p
          className="mx-auto mb-[30px] text-[16px] leading-[1.65] max-w-[46ch]"
          style={{ color: '#8A8A93' }}
        >
          Freelance work, full-time roles, or just a good ML problem to chew on — my inbox is open.
        </p>
        <Link
          href="/contact"
          className="inline-block px-[30px] py-[15px] rounded-[12px] text-[13.5px] font-semibold transition-colors duration-200"
          style={{
            background: '#FF6B6B',
            color: '#12080A',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#FF867F'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#FF6B6B'; }}
        >
          Start a conversation
        </Link>
      </motion.div>
    </section>
  );
}
