import Link from 'next/link';
import { Brain, Github, Linkedin, Twitter, Mail } from 'lucide-react';

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
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Lab</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Exploring the frontiers of artificial intelligence through practical 
              implementations, visual explanations, and hands-on tutorials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/posts" className="hover:text-gray-900 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-gray-900 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rss" className="hover:text-gray-900 transition-colors">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/50 transition-colors glass-card"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/50 transition-colors glass-card"
              >
                <Linkedin className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/50 transition-colors glass-card"
              >
                <Twitter className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="mailto:hello@ailab.com"
                className="p-2 rounded-lg hover:bg-white/50 transition-colors glass-card"
              >
                <Mail className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-gray-600 text-sm">
          <p>© {currentYear} AI Lab. Built with Next.js, MDX, and ❤️</p>
        </div>
      </div>
    </footer>
  );
}