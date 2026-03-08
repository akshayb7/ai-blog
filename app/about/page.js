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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About the Captain
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Petroleum engineer turned AI director. These are the field notes.
            </p>
          </div>

          {/* Main Content */}
          <Card className="mb-8 border-white/20">
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
                  I trained as a petroleum engineer. Then I watched AlphaGo play Move 37 and that was basically it — I
                  spent the next few years pivoting hard into AI, went back to first principles, and ended up as
                  Director of AI/Data Science at a post-Series A startup. The path is not obvious in retrospect either.
                </p>

                <p className="leading-relaxed mb-6">
                  I've spent the last several years building at work while quietly going deep on things nobody asked me to —
                  distributed systems internals, local model inference, fine-tuning pipelines, whatever I was genuinely
                  curious about that week. These expedition logs are where that ends up. Not tutorials. Field notes.
                  The difference matters: tutorials clean up the mess, field notes keep it in.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">What I Write About</h3>

                <p className="leading-relaxed mb-4">
                  Right now: Ray's distributed architecture (7-part series, still going), local AI image generation on
                  Apple Silicon, and soon — fine-tuning techniques I've actually run. The throughline is systems thinking
                  applied to ML infrastructure. I want to know why something behaves the way it does, not just that it works.
                </p>

                <p className="leading-relaxed mb-6">
                  Every post has real commands, real benchmarks, and the failures that happened before the thing worked.
                  I'm not interested in writing content that could have been generated without running the code.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Outside the Terminal</h3>

                <p className="leading-relaxed mb-4">
                  I DJ — mostly for myself, occasionally for people willing to tolerate my taste in techno. I follow
                  F1 with the kind of attention I should probably reserve for more productive things. One Piece has
                  been part of my life for 14 years — I've caught up, I can talk about it for hours, and yes, the
                  blog being called Expedition Logs is not a coincidence.
                </p>

                <p className="leading-relaxed mb-4">
                  I got into hardware before I got into software. Digit magazine — and I think Chip — both came
                  bundled with CDs full of games and software demos, and I read through them obsessively until I
                  designed my first PC build in 7th standard. Got my first graphics card that year to play cricket on it.
                  That wiring never really left.
                </p>

                <p className="leading-relaxed">
                  Outside of that: I love food and I have a system for finding the good spots in any city. I dance —
                  salsa specifically, which I took up as deliberate embarrassment training and ended up genuinely enjoying.
                  I read poetry. I'm deep into anime. And I have a weakness for a well-written self-help book, which I
                  will defend aggressively if pressed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Connect Section */}
          <Card className="text-center border-white/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Distributed systems, ML infrastructure, AI tools, or where to eat in your city — I'm around.
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
