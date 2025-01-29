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
                <div className={Classes['campaign-approval']}>{children}</div>
            </main>
        </div>
    );
};

export default PendingStartupsLayout;