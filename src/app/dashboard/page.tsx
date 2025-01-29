'use client';

import React from 'react';
import FounderSidebar from '@/components/Dashboard/founderDashboard'; // Import the FounderSidebar component
import InvestorSidebar from '@/components/Dashboard/investorDashboard'; // Import the InvestorSidebar component

const DashboardPage: React.FC = () => {
  const userRole: 'founder' | 'investor' = 'investor'; // Set the userRole to founder or investor

  return (
    <div className="flex">

      {userRole === 'founder' ? (
        <FounderSidebar userRole={userRole} />
      ) : userRole === 'investor' ? (
        <InvestorSidebar userRole={userRole} />
      ) : null}
    </div>
  );
};

export default DashboardPage;
