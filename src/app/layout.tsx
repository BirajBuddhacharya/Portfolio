import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Sora } from "next/font/google";
import { Toaster } from "../../components/components/ui/sonner";
import { QueryProvider } from "../providers/QueryProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Biraj Buddhacharya | ML Engineer & Full-stack Developer",
  description:
    "Machine learning engineer and full-stack developer. I build backends that think — RAG chatbots, recommendation engines, and analytics systems — and the interfaces that make them usable.",
  keywords:
    "Biraj Buddhacharya, ML Engineer, Full-stack Developer, Machine Learning, FastAPI, React, PyTorch, LangChain, Portfolio",
  authors: [{ name: "Biraj Buddhacharya" }],
  robots: "index, follow",
  metadataBase: new URL("https://birajbuddhacharya.com.np"),
  verification: {
    google: "MfMgvrHxXGqKqKNEvhpvELHqDe7tx5nX-T6quHavP2Q",
  },
  openGraph: {
    title: "Biraj Buddhacharya | ML Engineer & Full-stack Developer",
    description:
      "Machine learning engineer and full-stack developer building backends that think.",
    url: "https://birajbuddhacharya.com.np",
    type: "website",
    images: [{ url: "https://birajbuddhacharya.com.np/img/logo.png" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Biraj Buddhacharya",
  url: "https://birajbuddhacharya.com.np",
  sameAs: [
    "https://www.linkedin.com/in/biraj-buddhacharya",
    "https://github.com/birajbuddhacharya",
  ],
  jobTitle: "ML Engineer & Full-stack Developer",
  image: "https://birajbuddhacharya.com.np/img/logo.png",
  description:
    "Machine learning engineer and full-stack developer based in Kathmandu, Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${sora.variable}`}
        style={{ fontFamily: "var(--font-sora), system-ui, sans-serif" }}
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
