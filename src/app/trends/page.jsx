"use client"
import React, { useState } from 'react'
import Trends from '../components/Trends/Trends'
import BottomBar from "../trends/page";
import MobileHeader from "../trends/page";

const page = () => {
  const [activeTab, setActiveTab] = useState("Spotlight");
  return (
    <>
    <div>
      <MobileHeader />
      <Trends/>
      <BottomBar setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
    </>
  )
}

export default page
