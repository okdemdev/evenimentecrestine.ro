'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const subscriptionStatus = localStorage.getItem('newsletter-subscribed');
    if (subscriptionStatus === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok && data.error !== 'Acest email este deja înregistrat pentru notificări.') {
        throw new Error(data.error);
      }

      // Store subscription status in localStorage
      localStorage.setItem('newsletter-subscribed', 'true');
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="text-center space-y-3 py-4 animate-in fade-in duration-500">
        <div className="flex justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Mulțumim pentru abonare!</h3>
          <p className="text-sm text-gray-600">
            Te vom notifica când apar evenimente noi în zona ta.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
      <Input
        type="email"
        placeholder="Email-ul tău"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-2 h-10"
        required
      />
      <Button
        type="submit"
        className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white"
        disabled={loading}
      >
        {loading ? 'Se procesează...' : 'Abonează-te'}
      </Button>
    </form>
  );
}
