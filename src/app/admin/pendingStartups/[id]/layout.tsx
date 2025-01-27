// src/app/admin/pendingStartups/layout.tsx
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const PendingStartupsLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen">
            {/* Main Content */}
            <main className="p-6">
                <header className="p-2 mb-2">
                    <h1 className="text-2xl font-bold">Campaign Admin Approval</h1>
                </header>
                <div>{children}</div>
            </main>
        </div>
    );
};

export default PendingStartupsLayout;