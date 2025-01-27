// src/app/admin/pendingStartups/layout.tsx
import React from 'react';
import Classes from './page.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const PendingStartupsLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="">
            {/* Main Content */}
            <main className='p-6'>
                <header className="p-2 mb-2">
                    <h1 className="text-2xl font-bold">Campaign Admin Approval</h1>
                </header>
                <div className={Classes['campaign-approval']}>{children}</div>
            </main>
        </div>
    );
};

export default PendingStartupsLayout;