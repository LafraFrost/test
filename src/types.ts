export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export enum LocationErrorType {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
  UNSUPPORTED = 'UNSUPPORTED',
  UNKNOWN = 'UNKNOWN'
}

export interface LocationState {
  data: LocationData | null;
  error: LocationErrorType | null;
  errorMessage: string | null;
  loading: boolean;
}