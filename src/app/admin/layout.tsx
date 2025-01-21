"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sidebar as ShadcnSidebar,
    SidebarItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { HomeIcon, UsersIcon, StartupIcon, ProfileIcon, LogoutIcon, MenuIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [selectedSection, setSelectedSection] = useState<string>('Dashboard');
    const router = useRouter();

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSelectSection = (section: string) => {
        setSelectedSection(section);
    };

    const handleAdminSection = (section: string) => {
        setSelectedSection(section);
        if (section === 'Pending Startups') {
            router.push('admin/pendingStartups');
        }
    };

    return (
        <div className="flex h-screen bg-gray-950">
            <ShadcnSidebar
                isOpen={isSidebarOpen}
                onToggle={handleToggleSidebar}
                className="z-50"
            >
                <div className="flex items-center justify-between p-4">
                    <Link href="/" className="group flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20"
                        >
                            <HomeIcon className="h-6 w-6 text-blue-400" />
                        </motion.div>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-xl font-bold text-gray-100"
                            >
                                Admin Panel
                            </motion.span>
                        )}
                    </Link>

                    <Button
                        variant="ghost"
                        onClick={handleToggleSidebar}
                        className="lg:flex hover:bg-gray-800/50"
                        size="icon"
                    >
                        <MenuIcon className="h-5 w-5 text-gray-400" />
                    </Button>
                </div>

                <div className="mt-8 space-y-2 px-2">
                    <SidebarItem
                        icon={<HomeIcon className="h-5 w-5" />}
                        label="Dashboard"
                        active={selectedSection === 'Dashboard'}
                        onClick={() => handleSelectSection('Dashboard')}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<UsersIcon className="h-5 w-5" />}
                        label="Manage Users"
                        active={selectedSection === 'Manage Users'}
                        onClick={() => handleSelectSection('Manage Users')}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<StartupIcon className="h-5 w-5" />}
                        label="Pending Startups"
                        active={selectedSection === 'Pending Startups'}
                        onClick={() => handleAdminSection('Pending Startups')}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<ProfileIcon className="h-5 w-5" />}
                        label="My Profile"
                        active={selectedSection === 'myProfile'}
                        onClick={() => handleSelectSection('myProfile')}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<LogoutIcon className="h-5 w-5" />}
                        label="Logout"
                        active={selectedSection === 'Logout'}
                        onClick={() => handleSelectSection('Logout')}
                        isOpen={isSidebarOpen}
                    />
                </div>
            </ShadcnSidebar>

            <main className="flex-1 overflow-auto p-8 pl-[96px] lg:pl-[296px] transition-all duration-300">
                <div className="mx-auto max-w-7xl">
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;