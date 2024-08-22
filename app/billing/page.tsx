"use client";

import React from "react";
import Header from "../components/Header/index";
import Banner from "../components/Banner/index";
import Tabs from "../components/Tabs/index";
import PlanDetails from "../components/PlanCard";
import { useUserContext } from "@/app/context/userContext";
import NAV_TABS from "@/constants/navtabs";

const Billing = () => {
  const { user } = useUserContext();

  return (
    <main className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="my-12">
        <h1 className="text-2xl leading-2xl text-heading font-bold mb-4">
          Billing Info
        </h1>
        <PlanDetails />
      </div>
    </main>
  );
};

export default Billing;
