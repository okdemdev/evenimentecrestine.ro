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
      if (typeof window !== 'undefined' && window.location.protocol !== 'https:') {
        console.warn('Geolocation requires HTTPS');
      }

      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      console.log('Requesting geolocation...');

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log('Got position:', {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            });
            resolve(pos);
          },
          (err: GeolocationPositionError) => {
            console.error('Position error code:', err.code);
            console.error('Position error message:', err.message);

            let errorMessage = 'Unknown error occurred';
            switch (err.code) {
              case err.PERMISSION_DENIED:
                errorMessage =
                  'Location permission denied. Please enable location services in your browser settings.';
                break;
              case err.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable. Please try again.';
                break;
              case err.TIMEOUT:
                errorMessage =
                  'Location request timed out. Please check your connection and try again.';
                break;
            }
            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000,
          }
        );
      });

      const { latitude, longitude } = position.coords;

      console.log('Fetching location data...');
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ro`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();
      console.log('Location data:', data);

      const cityName =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.suburb ||
        data.address.municipality;

      console.log('Setting city:', cityName);
      setCity(cityName || null);
      setCountry(data.address.country || null);
      setShowPermissionPopup(false);
    } catch (err) {
      console.error('Full error:', err);

      if (err instanceof Error) {
        console.error('Error message:', err.message);
        setError(err.message);

        if (err.message.includes('permission') || err.message.includes('denied')) {
          setShowPermissionPopup(true);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        if (typeof window !== 'undefined' && navigator.permissions) {
          const result = await navigator.permissions.query({
            name: 'geolocation' as PermissionName,
          });
          console.log('Initial permission status:', result.state);

          if (result.state === 'prompt') {
            setShowPermissionPopup(true);
          } else if (result.state === 'granted') {
            await requestGeolocation();
          } else if (result.state === 'denied') {
            setShowPermissionPopup(true);
          }

          result.addEventListener('change', () => {
            console.log('Permission status changed:', result.state);
            if (result.state === 'granted') {
              requestGeolocation();
            }
          });
        }
      } catch (error) {
        console.error('Permission check error:', error);
        setShowPermissionPopup(true);
      }
    };

    checkAndRequestPermission();
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
