'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function PinEntry() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      if (response.ok) {
        // Store auth state in session storage
        sessionStorage.setItem('dashboard-auth', 'true');
        router.refresh();
      } else {
        setError('PIN incorect');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Autentificare Admin</h1>
            <p className="text-gray-600">Introdu PIN-ul pentru a accesa dashboard-ul</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Introdu PIN-ul"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#6a7bff] hover:bg-[#6a7bff]/90"
              disabled={loading || pin.length < 4}
            >
              {loading ? 'Se verifică...' : 'Accesează'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
