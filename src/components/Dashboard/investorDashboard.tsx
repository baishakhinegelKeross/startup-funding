"use client";

import React, { useState } from "react";
import Link from "next/link";
import MyInvestments from "@/components/Investor/MyInvestments/MyInvestment";
import ProfileUpdate from "@/components/Investor/myProfile/myProfile";
import authStore from "@/store/authStore";

import AdminDashboard from "@/app/adminDashboard/page";
import Fundraiser from "@/app/fundraiser/page";
import Investor from "@/app/investor/page"
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';


// Define the Sidebar class to handle toggling and manage state
class SidebarState {
  private isCollapsed: boolean;

  constructor() {
    this.isCollapsed = false;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getCollapseState() {
    return this.isCollapsed;
  }
}

const sidebarState = new SidebarState();

interface SidebarProps {
  userRole: "investor"; // Only investor role is considered
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] =
    useState<string>("My Investments");
  const { clearUserData } = authStore();

  const handleToggleSidebar = () => {
    sidebarState.toggleCollapse();
    setIsSidebarOpen(sidebarState.getCollapseState());
  };

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
    
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "My Investments":
        return <MyInvestments />;
      case "My Profile":
        return <ProfileUpdate />;
      case "Admin Dashboard":
        return <AdminDashboard />;
      case "Fundraiser":
        return <Fundraiser />;
      case "Investor":
        return <Investor />;
      default:
        return "Hi Admin";
    }
  };

  // Function to conditionally apply active styles to buttons
  const getButtonClass = (section: string) => {
    const baseClass =
      "flex items-center space-x-4 hover:bg-gray-700 py-2 px-4 rounded-lg w-full text-left transition-all duration-300 ease-in-out transform hover:scale-105";
    const activeClass =
      "bg-cyan-800 text-white font-semibold shadow-md transform scale-105"; // Active style

    return section === selectedSection
      ? `${baseClass} ${activeClass}`
      : baseClass;
  };

  return (
    <div className="flex w-full">
     
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-gray-800 text-white h-screen p-4 space-y-6 flex-shrink-0 flex flex-col`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-2xl font-bold text-white ${
              isSidebarOpen ? "block" : "hidden"
            } flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:text-indigo-400`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5"
              />
            </svg>
            <span>Back</span>
          </Link>
        </div>
         
         {/* Admin */}
        <div className="space-y-4 mt-8">
          <Button
          variant={"profilebtn"}
            onClick={() => handleSelectSection("AdminDashboard")}
            className={getButtonClass("AdminDashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v12M3 12h12"
              />
            </svg>
            <span className={isSidebarOpen ? "block" : "hidden"}>Admin</span>
          </Button>
        </div>
      
      {/* Fundraiser */}
        <div className="space-y-4 mt-8">
          <Button
          variant={"profilebtn"}
            onClick={() => handleSelectSection("Fundraiser")}
            className={getButtonClass("Fundraiser")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v12M3 12h12"
              />
            </svg>
            <span className={isSidebarOpen ? "block" : "hidden"}>Fundraiser</span>
          </Button>
        </div>

        {/* Investor */}
        <div className="space-y-4 mt-8 flex-1">
          <Button
          variant={"profilebtn"}
            onClick={() => handleSelectSection("Investor")}
            className={getButtonClass("Investor")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v12M3 12h12"
              />
            </svg>
            <span className={isSidebarOpen ? "block" : "hidden"}>Investor</span>
          </Button>
        </div>



        
        <Button
          onClick={() => {
            handleSelectSection("Logout");
            clearUserData();
          }}
          className={getButtonClass("Logout")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 17l4-4m0 0l-4-4m4 4H7"
            />
          </svg>
          <span className={isSidebarOpen ? "block" : "hidden"}>Logout</span>
        </Button>
      </div>

     
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
