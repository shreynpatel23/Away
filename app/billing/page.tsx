"use client";

import React from "react";
import Header from "../components/Header/index";
import PlanDetails from "../components/PlanCard";

const Billing = () => {
  return (
    <main className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-6 px-12">
      <Header />
      <div className="my-12">
        <h1 className="text-2xl leading-2xl text-heading">Billing Info</h1>
        <div className="my-8">
          <PlanDetails />
        </div>
      </div>
    </main>
  );
};

export default Billing;
