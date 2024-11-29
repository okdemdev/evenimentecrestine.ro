'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ParticipateButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement participation logic
    setOpen(false);
    // TODO: Show success popup
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white"
      >
        Participă
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Înregistrare Participare</DialogTitle>
            <DialogDescription>
              Completează datele tale pentru a participa la acest eveniment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Număr de telefon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0712345678"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white">
              Confirmă Participarea
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
