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

    try {
      // First, request permission explicitly
      const permissionResult = await navigator.permissions.query({ name: 'geolocation' });

      if (permissionResult.state === 'denied') {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Location permission denied',
        }));
        localStorage.removeItem('locationPermission');
        return;
      }

      // Then get the position
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

          if (error.code === error.PERMISSION_DENIED) {
            localStorage.removeItem('locationPermission');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Location permission denied',
      }));
      localStorage.removeItem('locationPermission');
    }
  };

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    // Immediately trigger the browser's permission prompt
    getLocation();
  };

  useEffect(() => {
    const hasPermission = localStorage.getItem('locationPermission');

    if (hasPermission === 'granted') {
      getLocation();
    } else if (!state.city && !state.error) {
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
