import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavScreen, PortalMode, Property } from '../types';
import { PROPERTIES } from '../data/mockData';

interface AppContextType {
  currentScreen: NavScreen;
  currentMode: PortalMode;
  selectedPropertyId: string;
  selectedProperty: Property;
  navigateTo: (screen: NavScreen, propertyId?: string) => void;
  switchMode: (mode: PortalMode) => void;
  currency: 'NGN' | 'GBP' | 'USD';
  setCurrency: (c: 'NGN' | 'GBP' | 'USD') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [currentMode, setCurrentMode] = useState<PortalMode>('public');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('prop-guzape-heights');
  const [currency, setCurrency] = useState<'NGN' | 'GBP' | 'USD'>('NGN');

  // Sync mode whenever screen changes
  useEffect(() => {
    if (currentScreen === 'home' || currentScreen === 'listings' || currentScreen === 'property-detail') {
      setCurrentMode('public');
    } else if (
      currentScreen === 'customer-dashboard' ||
      currentScreen === 'construction-progress' ||
      currentScreen === 'financial-overview'
    ) {
      setCurrentMode('customer');
    } else if (currentScreen === 'staff-management') {
      setCurrentMode('staff');
    }
  }, [currentScreen]);

  const navigateTo = (screen: NavScreen, propertyId?: string) => {
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchMode = (mode: PortalMode) => {
    setCurrentMode(mode);
    if (mode === 'public') {
      setCurrentScreen('home');
    } else if (mode === 'customer') {
      setCurrentScreen('customer-dashboard');
    } else if (mode === 'staff') {
      setCurrentScreen('staff-management');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProperty =
    PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0];

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        currentMode,
        selectedPropertyId,
        selectedProperty,
        navigateTo,
        switchMode,
        currency,
        setCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
