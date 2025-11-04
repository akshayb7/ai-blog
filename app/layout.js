import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'AI Lab - Machine Learning & AI Blog',
  description: 'Exploring Machine Learning, Deep Learning, and Generative AI through practical implementations and visual explanations',
  keywords: ['Machine Learning', 'Deep Learning', 'AI', 'GenAI', 'Data Science', 'Neural Networks'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'AI Lab - Machine Learning & AI Blog',
    description: 'Exploring ML, DL, and GenAI through practical implementations',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Lab - Machine Learning & AI Blog',
    description: 'Exploring ML, DL, and GenAI through practical implementations',
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