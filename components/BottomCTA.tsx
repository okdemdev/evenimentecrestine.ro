'use client';

import { ParticipateButton } from './ParticipateButton';

interface BottomCTAProps {
  isVisible: boolean;
}

export function BottomCTA({ isVisible }: BottomCTAProps) {
  const shouldShow = !isVisible;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/80 border-t border-gray-100 p-4 lg:hidden z-50 transition-all duration-300 ${
        shouldShow ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Vrei să participi?</h3>
          <p className="text-sm text-gray-600">Înregistrează-te acum</p>
        </div>
        <ParticipateButton />
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
