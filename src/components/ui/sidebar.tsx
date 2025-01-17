// @shadcn/ui/sidebar.tsx

import React from 'react';
import { Button } from './button';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, children, className }) => {
  return (
    <div
      className={`flex flex-col ${isOpen ? 'w-64' : 'w-16'} ${className}`}
    >
      {children}
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isOpen: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, isOpen }) => {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      className="flex items-center space-x-4 w-full text-left rounded-lg transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Button>
  );
};
