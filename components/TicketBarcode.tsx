'use client';

import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export function TicketBarcode() {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, '1234567890', {
        width: 1.5,
        height: 50,
        displayValue: false,
        margin: 0,
      });
    }
  }, []);

  return (
    <div className="flex justify-center p-4">
      <svg ref={barcodeRef}></svg>
    </div>
  );
}
