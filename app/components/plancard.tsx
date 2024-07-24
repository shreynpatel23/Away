import React from "react";

interface PlanCardProps {
  title: string;
  features: string[];
  isPro: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, features, isPro }) => {
  return (
    <div
      className={`border-2 border-solid border-black rounded-lg p-5 w-72 bg-white
      `}
    >
      <span className="mb-5 text-xl font-bold">{title}</span>
      {!isPro ? (
        <button className="w-28 h-9 mt-4 ml-3 py-2 bg-heading text-white rounded-lg font-bold">
          Current Plan
        </button>
      ) : (
        ""
      )}

      <ul className="list-none p-0 font-bold mt-5">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center text-base">
            <img src="./Checkmark.png" alt="" className="w-8 h-8 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      {isPro ? (
        <button className="w-full mt-5 py-2 bg-accent text-white rounded-lg font-bold">
          Upgrade Now
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default PlanCard;
//
