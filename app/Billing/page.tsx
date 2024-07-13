"use client";
import React from "react";
import Header from "../components/Header/index";
import PlanCard from "../components/plancard";
import UpgradeBanner from "../components/upgradeBanner";


const Billing: React.FC = () => {
  const freeFeatures = [
    "One Calendar per account",
    "Fill up to 20% capacity",
    "Static Event Names and Details",
    "Fill up to two weeks at a time",
  ];

  const proFeatures = [
    "Up to 3 Calendars per Account",
    "Fill up to 100% capacity",
    "Random Event Names and Details",
    "Fill up to 2 months at a time",
  ];

  return (
    <div className="font-sans">
      <Header />
      <UpgradeBanner />
      
      <div className="flex justify-center gap-5 p-5">
      
        <PlanCard title="Free Version" features={freeFeatures} isPro={false} />
        <PlanCard title="Pro Version" features={proFeatures} isPro={true} />
      </div>
    </div>
  );
};

export default Billing;
