'use client';

import { useState, useEffect } from 'react';

interface GeolocationState {
  city: string | null;
  country: string | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    city: null,
    country: null,
    loading: true,
    error: null,
  });
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const requestGeolocation = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState((prev) => ({
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

          setState({
            city: data.city || null,
            country: data.countryName || null,
            loading: false,
            error: null,
          });

          // Save to localStorage to persist the permission
          localStorage.setItem('locationPermission', 'granted');
        } catch (error) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: 'Failed to fetch location details',
          }));
        }
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    );
  };

  useEffect(() => {
    const hasPermission = localStorage.getItem('locationPermission');

    if (hasPermission === 'granted') {
      requestGeolocation();
    } else if (hasPermission === null) {
      setShowPermissionPopup(true);
    }
  }, []);

  return {
    ...state,
    showPermissionPopup,
    setShowPermissionPopup,
    requestGeolocation,
  };
}
