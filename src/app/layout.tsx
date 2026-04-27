import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '2026 — Senior Engineer Roadmap',
  description: 'Track progress across the 2026 senior software engineer roadmap.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
