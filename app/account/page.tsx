"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header/index";
import Banner from "../components/Banner/index";
import Tabs from "../components/Tabs/index";
import Form from "../components/AccountForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      return router.push("/login");
    }
  }, [session]);

  const [currentTab, setCurrentTab] = useState<string>("myAccount");

  return (
    <main className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="mx-20 mb-14">
        <Banner />
      </div>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="mx-20 my-8">
        {currentTab === "myAccount" && <Form />}
        {currentTab === "billingInfo" && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Billing Info</h2>
            {/* Billing Info content goes here */}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
