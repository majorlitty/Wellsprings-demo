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
  updateEnquiryStatus: (enquiryId: string, status: PropertyEnquiry['status']) => void;
  updateMilestone: (
    milestoneId: string,
    updates: {
      status: 'completed' | 'in_progress' | 'upcoming';
      progressPercentage: number;
      plannedEndDate?: string;
      actualEndDate?: string;
    }
  ) => void;
  addProgressUpdate: (update: Omit<ProgressUpdate, 'id'>) => void;
  addPaymentRecord: (payment: Omit<PaymentRecord, 'id'>) => void;
  updatePaymentRecord: (
    paymentId: string,
    updates: {
      status: PaymentRecord['status'];
      illustrativeNote?: string;
    }
  ) => void;
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

  // Action: Update enquiry status (staff action)
  const updateEnquiryStatus = useCallback(
    (enquiryId: string, status: PropertyEnquiry['status']) => {
      setDemoData((prev) => ({
        ...prev,
        enquiries: prev.enquiries.map((enq) =>
          enq.id === enquiryId ? { ...enq, status } : enq
        ),
        lastUpdated: new Date().toISOString(),
      }));
    },
    []
  );

  // Action: Update milestone status, percentage, and target date (staff action)
  // Ensures validation between 0-100 and keeps overall construction progress strictly consistent
  const updateMilestone = useCallback(
    (
      milestoneId: string,
      updates: {
        status: 'completed' | 'in_progress' | 'upcoming';
        progressPercentage: number;
        plannedEndDate?: string;
        actualEndDate?: string;
      }
    ) => {
      setDemoData((prev) => {
        const updatedMilestones = prev.milestones.map((m) => {
          if (m.id !== milestoneId) return m;

          let finalPercentage = Math.max(0, Math.min(100, Math.round(updates.progressPercentage)));
          let finalStatus = updates.status;
          let finalActualEndDate = updates.actualEndDate || m.actualEndDate;

          // Consistency enforcement:
          if (finalStatus === 'completed') {
            finalPercentage = 100;
            if (!finalActualEndDate) {
              finalActualEndDate = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });
            }
          } else if (finalStatus === 'upcoming') {
            finalPercentage = 0;
            finalActualEndDate = undefined;
          } else if (finalStatus === 'in_progress') {
            if (finalPercentage === 0) finalPercentage = 10;
            if (finalPercentage === 100) finalPercentage = 95;
            finalActualEndDate = undefined;
          }

          return {
            ...m,
            status: finalStatus,
            progressPercentage: finalPercentage,
            plannedEndDate: updates.plannedEndDate || m.plannedEndDate,
            actualEndDate: finalActualEndDate,
          };
        });

        // Reconcile overall construction progress dynamically from milestones
        const totalConstructionBudget = prev.project.constructionBudgetNgn || 330_000_000;
        const totalEarnedNgn = updatedMilestones.reduce(
          (sum, m) => sum + (m.progressPercentage / 100) * m.allocatedConstructionBudgetNgn,
          0
        );
        const newOverallProgressPercentage = totalConstructionBudget > 0
          ? Math.round((totalEarnedNgn / totalConstructionBudget) * 100)
          : 0;

        // Current active milestone
        const activeMilestone =
          updatedMilestones.find((m) => m.status === 'in_progress') ||
          updatedMilestones.find((m) => m.status === 'upcoming') ||
          updatedMilestones[updatedMilestones.length - 1];

        const updatedProject = {
          ...prev.project,
          overallProgressPercentage: newOverallProgressPercentage,
          currentMilestoneId: activeMilestone.id,
          currentMilestoneName: `${activeMilestone.name}: ${activeMilestone.title}`,
        };

        return {
          ...prev,
          milestones: updatedMilestones,
          project: updatedProject,
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    []
  );

  // Action: Add construction progress update (staff action)
  // Appears automatically on Screen 4 (Customer Dashboard) and Screen 5 (Construction Progress)
  const addProgressUpdate = useCallback(
    (newUpdateData: Omit<ProgressUpdate, 'id'>) => {
      const newUpdate: ProgressUpdate = {
        ...newUpdateData,
        id: `upd-${Date.now()}`,
      };

      setDemoData((prev) => ({
        ...prev,
        progressUpdates: [newUpdate, ...prev.progressUpdates],
        project: {
          ...prev.project,
          lastInspectionDate: newUpdate.updateDate,
        },
        lastUpdated: new Date().toISOString(),
      }));
    },
    []
  );

  // Action: Add simulated payment record (staff action)
  // Reconciles project paid totals dynamically based strictly on confirmed_cleared status
  const addPaymentRecord = useCallback(
    (newPaymentData: Omit<PaymentRecord, 'id'>) => {
      setDemoData((prev) => {
        const newRecord: PaymentRecord = {
          ...newPaymentData,
          id: `pay-${Date.now()}`,
        };

        const updatedPayments = [newRecord, ...prev.paymentRecords];

        // Strict Fiduciary Rule: Only qualifying confirmed/cleared records count toward paid totals
        const cleared = updatedPayments.filter((r) => r.status === 'confirmed_cleared');
        const clearedLand = cleared
          .filter((r) => r.category === 'land')
          .reduce((sum, r) => sum + r.amountNgn, 0);
        const clearedConstruction = cleared
          .filter((r) => r.category === 'construction')
          .reduce((sum, r) => sum + r.amountNgn, 0);
        const totalCleared = clearedLand + clearedConstruction;

        const landBudget = prev.project.landBudgetNgn || 120_000_000;
        const constructionBudget = prev.project.constructionBudgetNgn || 330_000_000;
        const totalBudget = landBudget + constructionBudget;

        const updatedProject = {
          ...prev.project,
          landPaidNgn: clearedLand,
          constructionPaidNgn: clearedConstruction,
          totalPaidNgn: totalCleared,
          landRemainingNgn: Math.max(0, landBudget - clearedLand),
          constructionRemainingNgn: Math.max(0, constructionBudget - clearedConstruction),
          totalRemainingNgn: Math.max(0, totalBudget - totalCleared),
        };

        return {
          ...prev,
          paymentRecords: updatedPayments,
          project: updatedProject,
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    []
  );

  // Action: Update existing payment record status (staff action)
  // Re-derives land, construction, and total paid totals strictly from confirmed_cleared records
  const updatePaymentRecord = useCallback(
    (
      paymentId: string,
      updates: {
        status: PaymentRecord['status'];
        illustrativeNote?: string;
      }
    ) => {
      setDemoData((prev) => {
        const target = prev.paymentRecords.find((p) => p.id === paymentId);
        if (!target) return prev;

        const updatedPayments = prev.paymentRecords.map((p) => {
          if (p.id !== paymentId) return p;
          return {
            ...p,
            status: updates.status,
            illustrativeNote:
              updates.illustrativeNote !== undefined ? updates.illustrativeNote : p.illustrativeNote,
          };
        });

        // Strict Fiduciary Rule: Only qualifying confirmed/cleared records count toward paid totals
        const cleared = updatedPayments.filter((r) => r.status === 'confirmed_cleared');
        const clearedLand = cleared
          .filter((r) => r.category === 'land')
          .reduce((sum, r) => sum + r.amountNgn, 0);
        const clearedConstruction = cleared
          .filter((r) => r.category === 'construction')
          .reduce((sum, r) => sum + r.amountNgn, 0);
        const totalCleared = clearedLand + clearedConstruction;

        const landBudget = prev.project.landBudgetNgn || 120_000_000;
        const constructionBudget = prev.project.constructionBudgetNgn || 330_000_000;
        const totalBudget = landBudget + constructionBudget;

        const updatedProject = {
          ...prev.project,
          landPaidNgn: clearedLand,
          constructionPaidNgn: clearedConstruction,
          totalPaidNgn: totalCleared,
          landRemainingNgn: Math.max(0, landBudget - clearedLand),
          constructionRemainingNgn: Math.max(0, constructionBudget - clearedConstruction),
          totalRemainingNgn: Math.max(0, totalBudget - totalCleared),
        };

        return {
          ...prev,
          paymentRecords: updatedPayments,
          project: updatedProject,
          lastUpdated: new Date().toISOString(),
        };
      });
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
        updateEnquiryStatus,
        updateMilestone,
        addProgressUpdate,
        addPaymentRecord,
        updatePaymentRecord,
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
