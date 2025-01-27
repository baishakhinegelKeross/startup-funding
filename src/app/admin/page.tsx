"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Sidebar as ShadcnSidebar,
  SidebarItem,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { HomeIcon, UsersIcon, StartupIcon, ProfileIcon, LogoutIcon, MenuIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

// Lazy load components
const PendingStartups = dynamic(() => import('./pendingStartups/page'));
const UpdateProfile = dynamic(() => import('@/components/admin/updateProfile/updateProfile'));

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<string>('Dashboard');
  const router = useRouter();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  const handleAdminSection = (section: string) => { setSelectedSection(section); if (section === 'Pending Startups') { router.push('admin/pendingStartups'); } };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Dashboard':
        return <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Admin Dashboard</h1>;
      case 'Manage Users':
        return <h1 className="text-3xl font-semibold text-gray-800">Manage Users Section</h1>;
      case 'Pending Startups':
        return <PendingStartups />;
      case 'myProfile':
        return <UpdateProfile />;
      case 'Logout':
        return <h1 className="text-3xl font-semibold text-gray-800">You have been logged out.</h1>;
      default:
        return <h1 className="text-3xl font-semibold text-gray-800">Select a section to view content</h1>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ShadcnSidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        className="bg-gray-800 text-white transition-width duration-300"
      >
        <div className="flex items-center justify-between p-4">
          {/* Updated Link component without nested <a> */}
          <Link href="/" className={`flex items-center space-x-2 text-2xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <HomeIcon className="h-6 w-6" />
            <span>Back</span>
          </Link>

          <Button variant="ghost" onClick={handleToggleSidebar} className="lg:hidden" aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          <SidebarItem
            icon={<HomeIcon className="h-6 w-6" />}
            label="Dashboard"
            active={selectedSection === 'Dashboard'}
            onClick={() => handleSelectSection('Dashboard')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<UsersIcon className="h-6 w-6" />}
            label="Manage Users"
            active={selectedSection === 'Manage Users'}
            onClick={() => handleSelectSection('Manage Users')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<StartupIcon className="h-6 w-6" />}
            label="Pending Startups"
            active={selectedSection === 'Pending Startups'}
            onClick={() => handleAdminSection('Pending Startups')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<ProfileIcon className="h-6 w-6" />}
            label="My Profile"
            active={selectedSection === 'myProfile'}
            onClick={() => handleSelectSection('myProfile')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<LogoutIcon className="h-6 w-6" />}
            label="Logout"
            active={selectedSection === 'Logout'}
            onClick={() => handleSelectSection('Logout')}
            isOpen={isSidebarOpen}
          />
        </div>
      </ShadcnSidebar>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Sidebar;
