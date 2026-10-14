import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'NOCTURNE — A Ritual in Every Cup', description: 'A cinematic coffee experience. An immersive experience by CRERISE.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
