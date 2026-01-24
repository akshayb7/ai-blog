'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    <Card className="rounded-3xl border-white/20">
      <CardHeader className="text-center md:pb-2">
        <CardTitle className="text-3xl font-bold mb-2">Stay Updated</CardTitle>
        <CardDescription className="text-base max-w-2xl mx-auto">
          Get notified when I finish another deep dive. No spam, I promise.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 glass-card bg-transparent"
          />
          <Button
            type="submit"
            className="px-6 py-6 text-base rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-shadow bg-gradient-to-r from-amber-500 to-orange-600 border-0"
          >
            Subscribe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}