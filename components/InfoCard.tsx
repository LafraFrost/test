import React from 'react';
import { LocationData } from '../types';

interface InfoCardProps {
  data: LocationData;
}

export const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full animate-fade-in">
      <div className="bg-green-50 p-4 border-b border-green-100 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-green-800 text-lg">Posizione Rilevata</h3>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Latitudine</p>
            <p className="text-xl font-mono font-bold text-gray-800">{data.latitude.toFixed(6)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Longitudine</p>
            <p className="text-xl font-mono font-bold text-gray-800">{data.longitude.toFixed(6)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-blue-800 text-sm font-medium leading-relaxed">
            La tua posizione è approssimativa entro <span className="font-bold text-blue-900">{Math.round(data.accuracy)} metri</span>.
          </p>
        </div>
      </div>
    </div>
  );
};