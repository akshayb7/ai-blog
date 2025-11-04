'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with newsletter service (ConvertKit, Substack, etc.)
    console.log('Newsletter signup:', email);
    alert('Newsletter signup coming soon!');
    setEmail('');
  };

  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 text-center border border-white/20">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Get the latest posts on ML, AI, and GenAI delivered to your inbox. No spam, just quality content.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 glass-card"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}