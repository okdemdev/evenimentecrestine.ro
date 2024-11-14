import React, { useCallback } from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationPermissionPopupProps {
  onClose: () => void;
  onRequestLocation: () => void;
}

export default function LocationPermissionPopup({
  onClose,
  onRequestLocation,
}: LocationPermissionPopupProps) {
  const handlePermissionRequest = useCallback(() => {
    // Call the location request handler
    onRequestLocation();

    // The popup will be closed by the useGeolocation hook after successful permission
  }, [onRequestLocation]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 px-4 py-6">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="w-12 h-12 bg-[#6a7bff]/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-[#6a7bff]" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Permiteți accesul la locație?
          </h3>

          <p className="text-gray-600 mb-6">
            Pentru a vă arăta evenimente relevante din zona dvs., avem nevoie de permisiunea de a
            accesa locația dvs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePermissionRequest}
              className="flex-1 bg-[#6a7bff] text-white px-4 py-3 rounded-lg hover:bg-[#6a7bff]/90 transition-colors text-base font-medium"
            >
              Permite accesul
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors text-base font-medium"
            >
              Nu acum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
