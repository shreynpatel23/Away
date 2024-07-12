import React from 'react';

interface TabsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="flex justify-left my-4 ml-20">
      <div
        className={`p-2 cursor-pointer border-b-2 ${currentTab === 'myAccount' ? 'border-accent font-bold text-accent' : 'border-transparent text-black'}`}
        onClick={() => setCurrentTab('myAccount')}
      >
        <span className="fontFamily-roboto">My Account</span>
      </div>
      <div className="p-2 fontFamily-roboto text-accent">
        |
      </div>
      <div
        className={`p-2 cursor-pointer border-b-2 ${currentTab === 'billingInfo' ? 'border-accent font-bold text-accent' : 'border-transparent text-black'}`}
        onClick={() => setCurrentTab('billingInfo')}
      >
        <span className="fontFamily-roboto">Billing Info</span>
      </div>
    </div>
  );
};

export default Tabs;
