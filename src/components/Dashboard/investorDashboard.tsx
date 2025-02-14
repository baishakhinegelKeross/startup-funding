"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MyInvestments from "@/components/Investor/MyInvestments/MyInvestment";
import ProfileUpdate from "@/components/Investor/myProfile/myProfile";
import authStore from "@/store/authStore";
import AdminDashboard from "@/app/adminDashboard/page";
import ListOfInvestor from "@/components/Investor/listOfInvester/index"
import Fundraiser from "@/app/fundraiser/page";
import Investor from "@/app/investor/page";

import MyCampaignsnew from "@/app/myCampaignsnew/page";
import KycForm from "@/components/Investor/Kyc";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Home from "@/app/disputes/page";

// Icons import
import {
  LayoutDashboard,
  Users,
  Wallet,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import MyCampaigns from "../founder/myCampaigns/myCampaigns";
import { useAuth } from "@/lib/auth-context";


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

// interface SidebarProps {
//   userRole: "investor";
// }

const Sidebar: React.FC = ({ }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] =
    useState<string>("My Investments");
  const { clearUserData } = authStore();
  const [sidebarMenu, setsidemenu] = useState<any>([]);
  const handleToggleSidebar = () => {
    sidebarState.toggleCollapse();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "My Campaigns":
        return <MyCampaignsnew />;
      // case "My Investments":
      //   return <MyInvestments />;
      case "My Profile":
        return <ProfileUpdate />;
      case "AdminDashboard":
        return <AdminDashboard />;
      case "Fundraiser":
        return <Fundraiser />;
      case "Investor":
        return <Investor />;
      case "Kyc":
        return <KycForm />;
      case "Dispute":
        return <Home />;
      case "listOfInvestor":
        return <ListOfInvestor />;
    }
  };
  const { user } = useAuth();

  const userRole =
    user?.role === "admin"
      ? "admin"
      : user?.role === "fundraiser"
        ? "fundraiser"
        : "investor";

  const menuItems = [
    //for Fundraiser
    {
      title: "My Campaigns",
      icon: <LayoutDashboard className="h-5 w-5" />,
      section: "My Campaigns",
      role: "fundraiser",
    },
    {
      title: "Analysis",
      icon: <Wallet className="h-5 w-5" />,
      section: "Fundraiser",
      role: "fundraiser",
    },
    {
      title: "Dispute",
      icon: <Users className="h-5 w-5" />,
      section: "Dispute",
      role: "fundraiser",
    },
    //for insvestor
    {
      title: "My Investment",
      icon: <LayoutDashboard className="h-5 w-5" />,
      section: "My Campaigns",
      role: "investor",
    },
    {
      title: "Analysis",
      icon: <LayoutDashboard className="h-5 w-5" />,
      section: "Investor",
      role: "investor",
    },
    {
      title: "Dispute",
      icon: <Wallet className="h-5 w-5" />,
      section: "Dispute",
      role: "investor",
    },
    // {
    //   title: "Shortlisted Campaigns",
    //   icon: <Users className="h-5 w-5" />,
    //   section: "Investor",
    //   role: "investor",
    // },
    {
      title: "KYC",
      icon: <Users className="h-5 w-5" />,
      section: "Kyc",
      role: "investor",
    },

    //for admin
    {
      title: "Pending Startups",
      icon: <LayoutDashboard className="h-5 w-5" />,
      section: "My Campaigns",
      role: "admin",
    },
    {
      title: "Dispute",
      icon: <Wallet className="h-5 w-5" />,
      section: "Dispute",
      role: "admin",
    },
    {
      title: "Analysis",
      icon: <Users className="h-5 w-5" />,
      section: "AdminDashboard",
      role: "admin",
    },
    {
      title: "List Of Investar",
      icon: <Users className="h-5 w-5" />,
      section: "listOfInvestor",
      role: "admin",
    },
  ];
  useEffect(() => {
    setsidemenu(menuItems.filter((item) => item.role === userRole));
  }, [userRole]);


  const getButtonClass = (section: string) => {
    const baseClass =
      "flex items-center w-full px-4 py-3 transition-all duration-200 ease-in-out rounded-lg gap-3";
    const activeClass =
      "bg-gradient-to-r from-cyan-700 to-cyan-600 text-white shadow-lg";
    const inactiveClass = "hover:bg-gray-700/20 text-gray-300 hover:text-white";

    return `${baseClass} ${section === selectedSection ? activeClass : inactiveClass
      }`;
  };

  return (

    <div className="fixed inset-0 flex h-screen w-screen bg-gray-900">

      <div
        className={`relative transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-72" : "w-20"
          } bg-gray-800 border-r border-gray-700 flex flex-col h-full`}
      >
        {/* Toggle Button */}
        <button
          onClick={handleToggleSidebar}
          className="absolute -right-3 top-10 bg-cyan-600 text-white p-1.5 rounded-full shadow-lg border-2 border-gray-700 hover:bg-cyan-700 transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <Link
            href="/"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
            {isSidebarOpen && (
              <span className="font-semibold text-lg">Back</span>
            )}
          </Link>
        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarMenu.map((item) => (
            <Button
              key={item.section}
              variant="profilebtn"
              onClick={() => handleSelectSection(item.section)}
              className={getButtonClass(item.section)}
            >
              {item.icon}
              <span
                className={`${isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
                  } transition-all duration-200 whitespace-nowrap`}
              >
                {item.title}
              </span>
            </Button>
          ))}
        </nav>


        {/* Footer */}
        {/* <div className="p-4 border-t border-gray-700">
className="flex-1 p-8">{renderContent()}</div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 p-8 overflow-auto">
        <div className=" mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
