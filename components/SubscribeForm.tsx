'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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

      if (!response.ok) throw new Error(data.error);

      toast.success('Mulțumim pentru abonare!', {
        description: 'Vei primi notificări când apar evenimente noi.',
      });
      setEmail('');
    } catch (error) {
      toast.error('Oops!', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

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
