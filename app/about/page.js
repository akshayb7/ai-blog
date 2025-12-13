import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import { Compass, Github, Linkedin, Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'About | Akshay\'s Expedition Logs',
  description: 'Learn more about Akshay\'s Expedition Logs and the journey through AI and ML',
};

export default function AboutPage() {
  const allPosts = getAllPosts(); // For search

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <Navigation posts={allPosts} />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Compass className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About Akshay's Expedition Logs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Documenting the journey through artificial intelligence, one expedition at a time
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
                <h2 className="text-3xl font-bold mb-4">Welcome! 👋</h2>

                <p className="leading-relaxed mb-6">
                  I'm Akshay, a machine learning engineer and AI enthusiast passionate about making complex concepts accessible.
                  These expedition logs are my space to document practical insights, tutorials, and explorations in the world of artificial intelligence.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">What You'll Find Here</h3>

                <ul className="space-y-3">
                  <li>
                    <strong className="font-semibold">Deep Learning Tutorials:</strong> From transformers to CNNs, breaking down architectures with visual explanations
                  </li>
                  <li>
                    <strong className="font-semibold">GenAI Explorations:</strong> Practical guides on LLMs, fine-tuning, and building AI applications
                  </li>
                  <li>
                    <strong className="font-semibold">ML Engineering:</strong> Best practices, tools, and techniques for production ML systems
                  </li>
                  <li>
                    <strong className="font-semibold">Data Science:</strong> Statistical methods, visualization, and analytical thinking
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">My Approach</h3>

                <p className="leading-relaxed mb-4">
                  I believe the best way to learn is by <em>doing</em>. Every post includes:
                </p>

                <ul className="space-y-2">
                  <li>✅ Practical code examples you can run</li>
                  <li>✅ Visual explanations of complex concepts</li>
                  <li>✅ Real-world applications and use cases</li>
                  <li>✅ Links to further resources</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Background</h3>

                <p className="leading-relaxed">
                  With a background in computer science and years of experience in machine learning,
                  I've worked on everything from computer vision systems to NLP applications.
                  I'm constantly learning and excited to share that journey with you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Connect Section */}
          <Card className="text-center border-white/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have questions, suggestions, or just want to chat about AI? Reach out!
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
                    className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
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
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
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