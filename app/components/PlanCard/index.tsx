import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useUserContext } from "@/app/context/userContext";
import axios from "axios";
import { redirect } from "next/navigation";
interface Plan {
  name: string;
  features: string[];
  planType: string;
  price: string;
}

const PlanDetails = () => {
  const { user } = useUserContext();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkoutLoading, setCheckoutLoading] = useState<{
    planType: string;
    isLoading: boolean;
  }>({
    planType: "",
    isLoading: false,
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/get-plan-details");
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plan details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  async function handleCheckout(planType: string) {
    setCheckoutLoading({ planType, isLoading: true });

    try {
      const { data } = await axios.post(`/api/checkout`, {
        plan: planType,
        userId: user?.email,
      });
      const { sessionUrl } = data;
      window.location.href = sessionUrl;
      setCheckoutLoading({ planType, isLoading: false });
    } catch (error) {
      console.error("Error in checkout:", error);
      setCheckoutLoading({ planType, isLoading: false });
    }
  }

  if (loading) {
    return <div>Fetching plan details...</div>;
  }

  return (
    <div className="flex space-x-4">
      {plans.map(({ name, features, planType, price }, index) => {
        const isCurrentPlan =
          user?.planType?.toLowerCase() === planType.toLowerCase();
        const isPlanFree = planType.toLowerCase() === "free";
        return (
          <div
            key={index}
            className="w-[350px] p-6 bg-white shadow-card rounded-[16px] relative"
          >
            <div className="h-24">
              <p className="text-base font-bold text-heading">{name}</p>
              {isCurrentPlan && (
                <div className="inline-block text-[10px] px-2 py-1 mt-2 rounded-[8px] bg-heading text-white font-bold">
                  Current Plan
                </div>
              )}
              {!isPlanFree && (
                <p className="text-sm mt-2 text-heading">Price: {price}</p>
              )}
            </div>
            <hr className="mb-4" />
            <div className="h-[300px]">
              {features.map((feature, index) => (
                <div className="flex items-center gap-2 py-2" key={index}>
                  <img src="./Checkmark.png" alt="" className="w-8 h-8" />
                  <p className="text-sm text-heading font-semibold">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
            <hr className="mb-4" />
            <div className="h-12 flex justify-center">
              {!isCurrentPlan && !isPlanFree ? (
                <Button
                  buttonText="Upgrade Now"
                  buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent hover:bg-hover text-white hover:text-accent text-base leading-base"
                  isDisabled={checkoutLoading.isLoading}
                  isLoading={
                    checkoutLoading.planType.toLowerCase() ===
                      planType.toLowerCase() && checkoutLoading.isLoading
                  }
                  onClick={() => handleCheckout(planType)}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlanDetails;
