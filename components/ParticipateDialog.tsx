'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, User } from 'lucide-react';

interface ParticipateDialogProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticipateDialog({ eventId, isOpen, onClose }: ParticipateDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPhoneNumber('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, name, email, phoneNumber }),
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
      <DialogContent
        className="sm:max-w-[425px] p-0 overflow-hidden rounded-2xl"
        // Prevent automatic focus on inputs
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#6a7bff] to-[#8b96ff] text-white p-8"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Confirmă participarea
            </DialogTitle>
            <p className="text-center text-white/80 mt-2">
              Completează datele tale pentru a primi biletul
            </p>
          </DialogHeader>
        </motion.div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-[#6a7bff]" />
                Nume și prenume
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ion Popescu"
                className="w-full px-4 py-2 rounded-xl border-gray-200 focus:border-[#6a7bff] focus:ring-[#6a7bff]"
                required
                autoComplete="name"
                autoFocus={false}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6a7bff]" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-2 rounded-xl border-gray-200 focus:border-[#6a7bff] focus:ring-[#6a7bff]"
                required
                // Prevent mobile keyboard from showing up automatically
                autoComplete="email"
                autoFocus={false}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6a7bff]" />
                Număr de telefon
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07xxxxxxxx"
                className="w-full px-4 py-2 rounded-xl border-gray-200 focus:border-[#6a7bff] focus:ring-[#6a7bff]"
                required
                // Prevent mobile keyboard from showing up automatically
                autoComplete="tel"
                autoFocus={false}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p>Vei primi un email de confirmare</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p>Poți anula oricând participarea</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p>Nu este nevoie să prezinți biletul la intrare</p>
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl hover:bg-gray-50"
            >
              Anulează
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#6a7bff] to-[#8b96ff] text-white rounded-xl hover:opacity-90 transition-opacity"
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
