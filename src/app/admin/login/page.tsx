"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useAdminLogin } from "../../../services/authService";

const BG = "#09090B";
const CARD = "#111115";
const BORDER = "rgba(255,255,255,0.07)";
const ACCENT = "#FF6B6B";
const MUTED = "#6E6E78";
const TEXT = "#EDEDEF";

const mono = "var(--font-jetbrains-mono), monospace";
const heading = "var(--font-space-grotesk), sans-serif";
const body = "var(--font-sora), system-ui, sans-serif";

export default function AdminLoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useAdminLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email: email.trim(), password },
      {
        onSuccess: () => {
          router.replace("/admin");
          router.refresh();
        },
      },
    );
  };

  const inputStyle: React.CSSProperties = {
    background: "#131317",
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    padding: "12px 15px",
    color: TEXT,
    fontFamily: body,
    fontSize: 14,
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: BG, color: TEXT, fontFamily: body }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: 1000,
          height: 1000,
          top: -500,
          right: -400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,107,107,0.16) 0%, rgba(255,107,107,0) 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-[380px] relative z-10"
      >
        <div className="flex items-center gap-3 mb-7">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
            style={{
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}35`,
              color: ACCENT,
            }}
          >
            <Lock size={15} strokeWidth={1.8} />
          </div>
          <div>
            <div
              className="text-[19px] font-semibold leading-tight"
              style={{ fontFamily: heading, letterSpacing: "-0.025em" }}
            >
              Admin sign in
            </div>
            <div
              className="text-[11.5px]"
              style={{ fontFamily: mono, color: MUTED }}
            >
              biraj / admin
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-[18px] border p-7"
          style={{ background: CARD, borderColor: BORDER }}
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-[11px] uppercase tracking-[0.1em]"
              style={{ fontFamily: mono, color: MUTED }}
            >
              Email
            </label>
            <input
              type="email"
              autoComplete="username"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = `${ACCENT}55`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = BORDER;
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-[11px] uppercase tracking-[0.1em]"
              style={{ fontFamily: mono, color: MUTED }}
            >
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = `${ACCENT}55`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = BORDER;
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 py-[12px] rounded-[11px] text-[13px] font-semibold cursor-pointer transition-opacity duration-150 disabled:opacity-60"
            style={{
              fontFamily: mono,
              color: "#12080A",
              background: ACCENT,
              border: "none",
            }}
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link
          href="/"
          className="block mt-5 text-[12px] transition-colors duration-150"
          style={{ fontFamily: mono, color: MUTED, textDecoration: "none" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = TEXT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = MUTED;
          }}
        >
          ← back to site
        </Link>
      </motion.div>
    </div>
  );
}
