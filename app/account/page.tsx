"use client";

import React, { useState } from 'react';
import Header from '../components/Header/index';
import Banner from '../components/Banner/index';
import Tabs from '../components/Tabs/index';
import Form from '../components/AccountInfo';

const Page = () => {
    const [currentTab, setCurrentTab] = useState<string>('myAccount');

    return (
        <main className="bg-gradient-to-br from-gradientColor1 to-gradientColor2">
            <div className="min-h-screen">
                <Header />
                <div className="mx-20 mb-14">
                    <Banner />
                </div>
                <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <div className="mx-20 my-8">
                    {currentTab === 'myAccount' && <Form />}
                    {currentTab === 'billingInfo' && (
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Billing Info</h2>
                            {/* Billing Info content goes here */}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Page;

