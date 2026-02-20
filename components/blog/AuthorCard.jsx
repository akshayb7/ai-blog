import { Github, Linkedin, Globe } from 'lucide-react';
import { StrawHat } from '@/components/ui/straw-hat';

export default function AuthorCard() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-800">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm">
          <StrawHat className="w-8 h-8 text-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-100">
            Akshay
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            ML engineer writing the deep dives I wish existed when I was learning.
            Currently into distributed systems, Ray internals, and figuring out why things break at scale.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://github.com/akshayb7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/akshayb7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://portfolio.akshayworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
