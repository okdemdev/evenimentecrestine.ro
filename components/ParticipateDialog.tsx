'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { CalendarIcon, Clock3Icon, MapPin } from 'lucide-react';

interface ParticipateDialogProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticipateDialog({ eventId, isOpen, onClose }: ParticipateDialogProps) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, email, phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      router.push(data.ticketUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="bg-[#6a7bff] text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Confirmă participarea
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Număr de telefon
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07xxxxxxxx"
                className="w-full px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-1.5">
            <p>• Vei primi un email de confirmare</p>
            <p>• Poți anula oricând participarea</p>
            <p>• Nu este nevoie să prezinți biletul la intrare</p>
          </div>

          <div className="flex gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Anulează
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#6a7bff] hover:bg-[#6a7bff]/90"
              disabled={loading}
            >
              {loading ? 'Se procesează...' : 'Confirmă'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
