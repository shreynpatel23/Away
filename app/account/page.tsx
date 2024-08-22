"use client";

import React from "react";
import Header from "../components/Header/index";
import Banner from "../components/Banner/index";
import Tabs from "../components/Tabs/index";
import Form from "../components/AccountForm";
import { useUserContext } from "@/app/context/userContext";
import NAV_TABS from "@/constants/navtabs";

const Account = () => {
  const { user } = useUserContext();
  return (
    <main className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="w-[90%] mx-auto">
        <div className="mb-14">{!user?.isPaidUser && <Banner />}</div>
        <h1 className="text-2xl leading-2xl text-heading">My Account</h1>
        <div className="my-8">
          <Form />
        </div>
      </div>
    </main>
  );
};

export default Account;
