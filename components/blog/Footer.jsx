import Link from 'next/link';
import { Compass, Github, Linkedin, Globe, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Expedition Logs</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Exploring the frontiers of artificial intelligence through practical 
              implementations, visual explanations, and hands-on tutorials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/posts" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/akshayb7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors glass-card"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/akshayb7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors glass-card"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://portfolio.akshayworks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors glass-card"
                aria-label="Portfolio"
              >
                <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="mailto:akshay10.bhardwaj@gmail.com"
                className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors glass-card"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {currentYear} Akshay's Expedition Logs. Built with Next.js, MDX, and ❤️</p>
        </div>
      </div>
    </footer>
  );
}