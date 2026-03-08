import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import PerformanceMonitor from '@/components/blog/PerformanceMonitor';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  metadataBase: new URL('https://blog.akshayworks.com'),
  title: 'Akshay\'s Expedition Logs - ML, AI & Deep Learning',
  description: 'Documenting the journey through Machine Learning, Deep Learning, and Generative AI with practical implementations and visual explanations',
  keywords: ['Machine Learning', 'Deep Learning', 'AI', 'GenAI', 'Data Science', 'Neural Networks', 'Akshay'],
  authors: [{ name: 'Akshay' }],
  openGraph: {
    title: 'Akshay\'s Expedition Logs - ML, AI & Deep Learning',
    description: 'Documenting the journey through ML, DL, and GenAI with practical implementations',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshay\'s Expedition Logs - ML, AI & Deep Learning',
    description: 'Documenting the journey through ML, DL, and GenAI with practical implementations',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${ibmPlexSans.className}`} suppressHydrationWarning>
      <body className="antialiased">
        <PerformanceMonitor />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}