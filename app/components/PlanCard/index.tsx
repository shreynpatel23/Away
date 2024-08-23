import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useUserContext } from "@/app/context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Plan {
  name: string;
  features: string[];
  planType: string;
  price: string;
}

const PlanDetails = () => {
  const router = useRouter();
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
        const response = await axios.get("/api/get-plan-details");
        const { data } = await response.data;
        setPlans(data);
      } catch (err: any) {
        console.error("Error fetching plan details:", err);
        if (err?.response?.status === 401) {
          return router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  async function handleCheckout(planType: string) {
    setCheckoutLoading({ planType, isLoading: true });

    try {
      const response = await axios.post(`/api/checkout`, {
        plan: planType,
        userId: user?.email,
      });
      if (response.status === 401) {
        return router.replace("/login");
      }
      const { sessionUrl } = response?.data;
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
    <div className="flex items-start flex-wrap gap-4">
      {plans.map(({ name, features, planType, price }, index) => {
        const isCurrentPlan =
          user?.planType?.toLowerCase() === planType.toLowerCase();
        const isPlanFree = planType.toLowerCase() === "free";
        return (
          <div
            key={index}
            className={`w-[300px] p-6 bg-white shadow-card rounded-[16px] relative ${
              isCurrentPlan ? "border border-heading" : ""
            }`}
          >
            <div className="h-24">
              <p className="text-base font-bold text-heading">{name}</p>
              {!isPlanFree && (
                <p className="text-sm mt-2 text-heading">Price: {price}</p>
              )}
              {isCurrentPlan && (
                <div className="absolute top-[-10px] right-[15px] inline-block text-xs px-2 py-1 rounded-[8px] bg-heading text-white font-bold">
                  Current Plan
                </div>
              )}
            </div>
            <hr className="my-4" />
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
