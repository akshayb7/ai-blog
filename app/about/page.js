import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import { Github, Linkedin, Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Card, CardContent } from '@/components/ui/card';
import { StrawHat } from '@/components/ui/straw-hat';

export const metadata = {
  title: 'About | Akshay\'s Expedition Logs',
  description: 'Learn more about Akshay\'s Expedition Logs and the journey through AI and ML',
};

export default function AboutPage() {
  const allPosts = getAllPosts(); // For search

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/20 dark:from-slate-950 dark:via-amber-950/20 dark:to-slate-900">
      <Navigation posts={allPosts} />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 dark:shadow-amber-500/10">
              <StrawHat className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About the Captain
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Charting courses through distributed systems, ML infrastructure, and the occasional rabbit hole
            </p>
          </div>

          {/* Main Content */}
          <Card className="mb-8 border-gray-200/80 dark:border-slate-800 !bg-white dark:!bg-slate-900 !backdrop-blur-none shadow-sm">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-em:text-gray-700 dark:prose-em:text-gray-300
                dark:prose-invert">
                <h2 className="text-3xl font-bold mb-4">Hey, I'm Akshay</h2>

                <p className="leading-relaxed mb-6">
                  I'm an ML engineer who gets genuinely excited about distributed systems and production ML infrastructure.
                  The kind of person who finds satisfaction in understanding why a system behaves the way it does,
                  not just that it works.
                </p>

                <p className="leading-relaxed mb-6">
                  I started these expedition logs because I kept running into the same pattern:
                  documentation that explains <em>what</em> something does, but rarely <em>why</em> it was built that way
                  or <em>how</em> it actually works under the hood. So I write the deep dives I wish existed when I was learning.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">What I Write About</h3>

                <p className="leading-relaxed mb-4">
                  Mostly distributed systems and ML infrastructure—the stuff that makes training at scale actually work.
                  My current deep dive series is on Ray's architecture, breaking down everything from the task execution model
                  to the object store's zero-copy semantics.
                </p>

                <p className="leading-relaxed mb-6">
                  Every post includes real code, architecture diagrams, and the "aha" moments that come from actually
                  building with these systems. I believe in learning by doing, so expect practical examples you can run yourself.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">When I'm Not Debugging</h3>

                <p className="leading-relaxed">
                  I'm probably watching One Piece (yes, I'm still catching up), at a techno show somewhere,
                  or trying to convince my friends that distributed systems are actually interesting at dinner.
                  I also have an unhealthy relationship with F1 race weekends, cricket matches, and finding the best food spots in any city I visit.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Connect Section */}
          <Card className="text-center border-gray-200/80 dark:border-slate-800 !bg-white dark:!bg-slate-900 !backdrop-blur-none shadow-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Want to chat about distributed systems, ML, or argue about the best ramen spots? I'm always up for a conversation.
              </p>

              <div className="flex justify-center space-x-4">
                {[
                  { icon: Github, href: "https://github.com/akshayb7", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/akshayb7/", label: "LinkedIn" },
                  { icon: Globe, href: "https://portfolio.akshayworks.com", label: "Portfolio" },
                  { icon: Mail, href: "mailto:akshay10.bhardwaj@gmail.com", label: "Email" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                    className="p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors border border-transparent hover:border-amber-200 dark:hover:border-amber-800/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
