"use client";

import React, { useState, useEffect } from "react";
import { LuChevronRight } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import HistoryMobile from "../HistoryMobile";
import RecommendedQueriesMobile from "../RecommendedQueriesMobile";
import ConnectionsMobile from "../ConnectionsMobile";
import ChatComponentMobile from "../ChatComponentMobile";
import { getUserInfo } from "../../utils/localStorageUtils";
import { encryptURL } from "../../utils/shareUtils";

const getInitials = (name = "") => {
  if (!name) return "";
  return name.split(" ").map(word => word[0]).join("").toUpperCase();
};

function MoreMobile({userInfo }) {
  const userName = userInfo?.first_name || "";
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("More");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    } else {
      setActiveTab("More");
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab !== "More") {
      navigate.push(`/?tab=${activeTab}`);
    }
  }, [activeTab, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate.push("/login");
  };

  const handleCompanyProfile = () => {
    const user = getUserInfo();
    if (user) {
      let userOrganization = user.organization.toString();
      const encryptedUserOrganization = encryptURL(userOrganization);
      navigate.push(`/companyprofile/${encryptedUserOrganization}`);
    }
  };

  const MenuOption = ({ label, tab }) => (
    <div
      onClick={() => setActiveTab(tab)}
      className="flex items-center justify-between gap-2 text-lg font-medium bg-gray-100 w-full p-4 cursor-pointer"
    >
      <div>{label}</div>
      <LuChevronRight size={22} />
    </div>
  );

  const renderMainMore = () => (
    <div>
      <div className="flex flex-col gap-10 items-start mt-4 bg-gray-50 p-6 border border-gray-200 m-2 rounded-xl">
        <div className="flex items-center">
          <div className="bg-blue-400 text-white rounded-full h-10 w-10 flex items-center justify-center">
            {getInitials(userName)}
          </div>
          <div className="ml-2">{userName}</div>
        </div>
        <div className="flex gap-32">
          <button className="bg-blue-400 text-white py-2 px-4 rounded" onClick={handleLogout}>
            Logout
          </button>
          <button className="border border-gray-200 p-2 px-4 rounded-md" onClick={handleCompanyProfile}>
            View company profile
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start border border-gray-100 m-2 rounded-xl text-sm">
        <MenuOption label="History" tab="History"  />
        <hr />
        <MenuOption label="Recommended Queries" tab="Recommendation" />
        <hr />
        <MenuOption label="Connections" tab="Connections" />
        <hr />
        <MenuOption label="Chat" tab="Chat" />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "More": return renderMainMore();
      case "Recommendation": return <RecommendedQueriesMobile />;
      case "Connections": return <ConnectionsMobile />;
      case "Chat": return <ChatComponentMobile />;
      default: return renderMainMore();
    }
  };

  return <div>{renderContent()}</div>;
}

export default MoreMobile;
