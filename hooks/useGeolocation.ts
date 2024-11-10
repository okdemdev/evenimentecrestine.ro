'use client';

import { useState, useEffect } from 'react';

interface Location {
  city: string;
  country: string;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location>({
    city: '',
    country: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ro`
          );
          const data = await response.json();

          setLocation({
            city: data.city || '',
            country: data.countryName || '',
            loading: false,
            error: null,
          });
        } catch (error) {
          setLocation((prev) => ({
            ...prev,
            loading: false,
            error: 'Failed to fetch location details',
          }));
        }
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    );
  }, []);

  return location;
}
