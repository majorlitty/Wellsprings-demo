import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  NavScreen,
  PortalMode,
  Property,
  Customer,
  Project,
  PaymentPlan,
  PaymentRecord,
  ConstructionMilestone,
  ProgressUpdate,
  PropertyEnquiry,
  AppDemoData,
} from '../types';
import { INITIAL_DEMO_DATA } from '../data/seedData';

const STORAGE_KEY = 'wellsprings_shared_demo_data_v2';

interface AppContextType {
  // Navigation & Mode
  currentScreen: NavScreen;
  currentMode: PortalMode;
  navigateTo: (screen: NavScreen, propertyId?: string) => void;
  switchMode: (mode: PortalMode) => void;

  // Currency preference
  currency: 'NGN' | 'GBP' | 'USD';
  setCurrency: (c: 'NGN' | 'GBP' | 'USD') => void;

  // Selected Property
  selectedPropertyId: string;
  selectedProperty: Property;
  setSelectedPropertyId: (id: string) => void;

  // Shared Data Model (Single Source of Truth)
  demoData: AppDemoData;
  properties: Property[];
  customer: Customer;
  project: Project;
  paymentPlan: PaymentPlan;
  paymentRecords: PaymentRecord[];
  milestones: ConstructionMilestone[];
  progressUpdates: ProgressUpdate[];
  enquiries: PropertyEnquiry[];

  // Mutators & Reset
  resetDemoData: () => void;
  addEnquiry: (enquiry: Omit<PropertyEnquiry, 'id' | 'submittedAt' | 'status'>) => void;
  isResetNotificationVisible: boolean;
  dismissResetNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [currentMode, setCurrentMode] = useState<PortalMode>('public');
  const [currency, setCurrency] = useState<'NGN' | 'GBP' | 'USD'>('NGN');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('prop-guzape-cliffcrest');
  const [isResetNotificationVisible, setIsResetNotificationVisible] = useState<boolean>(false);

  // Initialize shared demo data from localStorage if available, or fall back to seed data
  const [demoData, setDemoData] = useState<AppDemoData>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.properties && parsed.project && parsed.milestones) {
            return parsed as AppDemoData;
          }
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial seed data.', e);
    }
    return INITIAL_DEMO_DATA;
  });

  // Persist demo changes to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
      }
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  }, [demoData]);

  // Sync portal mode with current screen
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

  const navigateTo = useCallback((screen: NavScreen, propertyId?: string) => {
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    setCurrentScreen(screen);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const switchMode = useCallback((mode: PortalMode) => {
    setCurrentMode(mode);
    if (mode === 'public') {
      setCurrentScreen('home');
    } else if (mode === 'customer') {
      setCurrentScreen('customer-dashboard');
    } else if (mode === 'staff') {
      setCurrentScreen('staff-management');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Reset demo data function: restores pristine sample data and updates localStorage
  const resetDemoData = useCallback(() => {
    const freshSeed: AppDemoData = {
      ...INITIAL_DEMO_DATA,
      lastUpdated: new Date().toISOString(),
    };
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshSeed));
      }
    } catch (e) {
      console.warn('Error clearing localStorage', e);
    }
    setDemoData(freshSeed);
    setSelectedPropertyId('prop-guzape-cliffcrest');
    setIsResetNotificationVisible(true);
  }, []);

  const dismissResetNotification = useCallback(() => {
    setIsResetNotificationVisible(false);
  }, []);

  // Action: Add enquiry from customer or public form
  const addEnquiry = useCallback(
    (newEnquiryData: Omit<PropertyEnquiry, 'id' | 'submittedAt' | 'status'>) => {
      const newEnquiry: PropertyEnquiry = {
        ...newEnquiryData,
        id: `enq-${Date.now()}`,
        submittedAt: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'new',
      };

      setDemoData((prev) => ({
        ...prev,
        enquiries: [newEnquiry, ...prev.enquiries],
        lastUpdated: new Date().toISOString(),
      }));
    },
    []
  );

  const selectedProperty =
    demoData.properties.find((p) => p.id === selectedPropertyId) || demoData.properties[0];

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        currentMode,
        navigateTo,
        switchMode,
        currency,
        setCurrency,
        selectedPropertyId,
        selectedProperty,
        setSelectedPropertyId,
        demoData,
        properties: demoData.properties,
        customer: demoData.customer,
        project: demoData.project,
        paymentPlan: demoData.paymentPlan,
        paymentRecords: demoData.paymentRecords,
        milestones: demoData.milestones,
        progressUpdates: demoData.progressUpdates,
        enquiries: demoData.enquiries,
        resetDemoData,
        addEnquiry,
        isResetNotificationVisible,
        dismissResetNotification,
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
