import React, { useState, useCallback } from 'react';
import { LocationState, LocationErrorType } from './types';
import { Button } from './components/Button';
import { InfoCard } from './components/InfoCard';
import { ErrorAlert } from './components/ErrorAlert';

const App: React.FC = () => {
  const [locationState, setLocationState] = useState<LocationState>({
    data: null,
    error: null,
    errorMessage: null,
    loading: false,
  });

  const handleGetLocation = useCallback(() => {
    // Check browser support
    if (!('geolocation' in navigator)) {
      setLocationState({
        data: null,
        loading: false,
        error: LocationErrorType.UNSUPPORTED,
        errorMessage: 'Il tuo browser non supporta la geolocalizzazione.',
      });
      return;
    }

    // Set loading state
    setLocationState(prev => ({ ...prev, loading: true, error: null, errorMessage: null }));

    const successHandler = (position: GeolocationPosition) => {
      setLocationState({
        data: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        },
        error: null,
        errorMessage: null,
        loading: false,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      let message = 'Impossibile rilevare la posizione.';
      let errorType = LocationErrorType.UNKNOWN;

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorType = LocationErrorType.PERMISSION_DENIED;
          message = '⚠️ Non hai consentito l’accesso alla posizione. Senza questo permesso la web app non può funzionare correttamente.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorType = LocationErrorType.POSITION_UNAVAILABLE;
          message = 'Le informazioni sulla posizione non sono disponibili. Riprova più tardi o spostati in un\'area aperta.';
          break;
        case error.TIMEOUT:
          errorType = LocationErrorType.TIMEOUT;
          message = 'La richiesta di ottenere la posizione è scaduta. Controlla la tua connessione e riprova.';
          break;
        default:
          message = 'Si è verificato un errore sconosciuto nel recupero della posizione.';
      }

      setLocationState({
        data: null,
        loading: false,
        error: errorType,
        errorMessage: message,
      });
    };

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      
      {/* Header / Brand */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">GeoFinder</h1>
        <p className="text-slate-500 max-w-xs mx-auto">
          Ottieni le tue coordinate GPS precise con un solo click.
        </p>
      </div>

      {/* Main Content Card */}
      <main className="w-full max-w-md space-y-6">
        
        {/* Error Display */}
        {locationState.errorMessage && (
          <ErrorAlert message={locationState.errorMessage} />
        )}

        {/* Success Display */}
        {locationState.data && (
          <InfoCard data={locationState.data} />
        )}

        {/* Action Button - Always visible, changes state */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           {!locationState.data ? (
              <p className="text-sm text-slate-500 text-center mb-4">
                Cliccando il pulsante qui sotto, il browser ti chiederà il permesso di accedere alla tua posizione attuale.
              </p>
           ) : (
             <p className="text-sm text-slate-500 text-center mb-4">
                Vuoi aggiornare la tua posizione?
             </p>
           )}
          
          <Button 
            onClick={handleGetLocation} 
            isLoading={locationState.loading}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
          >
            {locationState.data ? 'Aggiorna Posizione' : 'Rileva la mia posizione'}
          </Button>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400">
        <p>GeoFinder utilizza la Geolocation API standard.</p>
        <p>Nessun dato viene salvato sui nostri server.</p>
      </footer>
    </div>
  );
};

export default App;