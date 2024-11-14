'use client';

import React from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationPermissionPopupProps {
  onClose: () => void;
  onRequestLocation: () => void;
}

export default function LocationPermissionPopup({
  onClose,
  onRequestLocation,
}: LocationPermissionPopupProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 p-4 z-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#6a7bff]" />
            <h3 className="font-semibold text-gray-900">Activează locația</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Pentru a-ți arăta evenimente din apropierea ta, avem nevoie de permisiunea de a-ți accesa
          locația.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Mai târziu
          </button>
          <button
            onClick={onRequestLocation}
            className="px-4 py-1.5 text-sm bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white rounded-md transition-colors"
          >
            Activează locația
          </button>
        </div>
      </div>
    </div>
  );
}
