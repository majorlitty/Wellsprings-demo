/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoSwitcher } from './components/shared/DemoSwitcher';
import { TopBar } from './components/layout/TopBar';
import { Footer } from './components/layout/Footer';

// Page components for all 7 foundation screens
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { ConstructionProgressPage } from './pages/ConstructionProgressPage';
import { FinancialOverviewPage } from './pages/FinancialOverviewPage';
import { StaffManagementPage } from './pages/StaffManagementPage';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomePage />;
      case 'listings':
        return <ListingsPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'customer-dashboard':
        return <CustomerDashboardPage />;
      case 'construction-progress':
        return <ConstructionProgressPage />;
      case 'financial-overview':
        return <FinancialOverviewPage />;
      case 'staff-management':
        return <StaffManagementPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-neutral-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Demonstration Role & Screen Navigator */}
      <DemoSwitcher />

      {/* Main Top Bar (Compliant with 3-Zone Contract) */}
      <TopBar />

      {/* Viewport Content */}
      <main className="flex-1 w-full">
        {renderScreen()}
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
