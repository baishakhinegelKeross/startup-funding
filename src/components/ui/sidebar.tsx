import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  children: React.ReactNode;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  className,
  children,
}) => {
  return (
    <motion.aside
      initial={{ width: isOpen ? 280 : 80 }}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-screen border-r border-gray-800 bg-gray-900/95 backdrop-blur-xl',
        className
      )}
    >
      {children}
    </motion.aside>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
  isOpen,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center px-4 py-3 transition-colors',
        active
          ? 'bg-blue-500/10 text-blue-400'
          : 'text-[#fff] hover:bg-gray-800/50 hover:text-gray-200'
      )}
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={false}
          animate={{ scale: active ? 1.1 : 1 }}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
            active ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 group-hover:text-gray-200'
          )}
        >
          {icon}
        </motion.div>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-sm font-medium"
          >
            {label}
          </motion.span>
        )}
      </div>
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 h-full w-1 bg-blue-500"
        />
      )}
    </motion.button>
  );
};