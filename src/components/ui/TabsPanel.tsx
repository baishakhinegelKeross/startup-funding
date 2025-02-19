// TabsPanel.tsx
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Tab {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface TabsPanelProps {
    tabs: Tab[];
    activeTab: number;
    onTabChange: (index: number) => void;
    isValid: boolean;
}

const TabsPanel: React.FC<TabsPanelProps> = ({ tabs, activeTab, onTabChange, isValid }) => {
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    // Check scroll position to conditionally show/hide scroll buttons
    const checkScroll = () => {
        if (tabsContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
            setShowLeftScroll(scrollLeft > 0);
            setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (tabsContainerRef.current) {
            const scrollAmount = tabsContainerRef.current.clientWidth * 0.75;
            const targetScroll =
                tabsContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            tabsContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollToTab = (tabId: string) => {
        const tabElement = document.getElementById(`tab-${tabId}`);
        if (tabElement && tabsContainerRef.current) {
            const containerRect = tabsContainerRef.current.getBoundingClientRect();
            const tabRect = tabElement.getBoundingClientRect();

            if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
                tabElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
            }
        }
    };

    useEffect(() => {
        if (tabs[activeTab]) {
            scrollToTab(tabs[activeTab].id);
        }
    }, [activeTab, tabs]);

    // Detect mobile view to switch between select and tab list
    const [isMobileView, setIsMobileView] = useState(false);
    useEffect(() => {
        const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    return (
        <div className="border-b bg-muted/40 pt-2 pb-2">
            {isMobileView ? (
                <div className="p-2">
                    <select
                        value={tabs[activeTab].id}
                        onChange={(e) => {
                            const newIndex = tabs.findIndex((tab) => tab.id === e.target.value);
                            onTabChange(newIndex);
                        }}
                        className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {tabs.map((tab, index) => (
                            <option key={tab.id} value={tab.id} disabled={index > 0 && !isValid}>
                                {tab.label}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="relative hidden sm:block">
                    {showLeftScroll && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Scroll tabs left"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                        </button>
                    )}

                    <div
                        ref={tabsContainerRef}
                        className="overflow-x-auto scrollbar-hide mx-12"
                        onScroll={checkScroll}
                        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
                    >
                        <ul className="inline-flex min-w-full text-base font-medium text-center text-gray-500 rounded-lg shadow-sm dark:divide-gray-700 dark:text-gray-400 gap-4">
                            {tabs.map((tab, index) => {
                                const Icon = tab.icon;
                                const isFirst = index === 0;
                                const isLast = index === tabs.length - 1;
                                const isActive = activeTab === index;
                                return (
                                    <li key={tab.id} className="focus-within:z-10">
                                        <button
                                            id={`tab-${tab.id}`}
                                            onClick={() => onTabChange(index)}
                                            disabled={index > 0 && !isValid}
                                            className={cn(
                                                'inline-flex items-center justify-center h-10 px-4 gap-3 whitespace-nowrap text-[0.8rem]',
                                                isActive
                                                    ? 'text-white bg-blue-600 dark:bg-blue-700 dark:text-white shadow-lg border-b-4 border-blue-800'
                                                    : 'bg-gray-800 hover:text-white hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-white',
                                                isFirst ? 'rounded-l-md' : '',
                                                isLast ? 'rounded-r-md' : 'border-r border-gray-600',
                                                'focus:ring-4 focus:ring-blue-500 focus:outline-none',
                                                'transition-all duration-300 ease-in-out transform hover:scale-105',
                                                index > 0 && !isValid && 'opacity-50 cursor-not-allowed',
                                                !isActive && 'cursor-pointer'
                                            )}
                                            aria-current={isActive ? 'page' : undefined}
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-controls={`panel-${tab.id}`}
                                        >
                                            <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                            <span>{tab.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {showRightScroll && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Scroll tabs right"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TabsPanel;
