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
    loading: false,
    error: null,
  });
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const getLocation = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos),
          (err) => reject(err),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

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

        localStorage.setItem('locationPermission', 'granted');
        setShowPermissionPopup(false);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch location details',
        }));
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to get location',
      }));

      if (error.code === 1) {
        // PERMISSION_DENIED
        localStorage.removeItem('locationPermission');
      }
    }
  };

  const requestGeolocation = () => {
    // This will trigger the browser's native permission prompt
    getLocation();
  };

  useEffect(() => {
    const hasPermission = localStorage.getItem('locationPermission');

    if (hasPermission === 'granted') {
      getLocation();
    } else {
      // Only show the custom popup if we haven't asked for permission before
      const hasAskedBefore = localStorage.getItem('locationAsked');
      if (!hasAskedBefore && !state.city && !state.error) {
        setShowPermissionPopup(true);
        localStorage.setItem('locationAsked', 'true');
      }
    }
  }, []);

  return {
    ...state,
    showPermissionPopup,
    setShowPermissionPopup,
    requestGeolocation,
  };
}
