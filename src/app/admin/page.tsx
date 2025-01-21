"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Lazy load components
const PendingStartups = dynamic(() => import('./pendingStartups/page'));
const UpdateProfile = dynamic(() => import('@/components/admin/updateProfile/updateProfile'));

interface AdminPageProps {
  selectedSection: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ selectedSection }) => {
  const renderContent = () => {
    switch (selectedSection) {
      case 'Dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Welcome to the Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your platform and users from one central location.</p>
          </motion.div>
        );
      case 'Manage Users':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="text-4xl font-bold text-gray-100">Manage Users</h1>
          </motion.div>
        );
      case 'Pending Startups':
        return <PendingStartups />;
      case 'myProfile':
        return <UpdateProfile />;
      case 'Logout':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-100">Logging out...</h1>
            <p className="text-gray-400">Thank you for using our platform.</p>
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="text-4xl font-bold text-gray-100">Select a section</h1>
          </motion.div>
        );
    }
  };

  return renderContent();
};

export default AdminPage;