'use client';

import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const requestGeolocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();
      console.log('Location data:', data);

      setCity(data.city || null);
      setCountry(data.country_name || null);
      setShowPermissionPopup(false);
    } catch (err) {
      console.error('Full error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGeolocation();
  }, []);

  return {
    city,
    country,
    loading,
    error,
    showPermissionPopup,
    setShowPermissionPopup,
    requestGeolocation,
  };
}
