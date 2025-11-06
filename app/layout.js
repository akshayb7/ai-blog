import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
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
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}