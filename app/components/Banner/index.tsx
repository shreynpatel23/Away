"use client";
import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function Banner() {
  const router = useRouter();
  return (
    <div className="my-4 w-full flex items-center justify-center gap-8 p-6 bg-accent border border-accent rounded-[16px]">
      <p className="text-base text-white">
        <span className="font-semibold">
          More Calendars. More Fill Options. Longer Timelines.
        </span>{" "}
        Upgrade to the full version of AwayMe.
      </p>
      <Button
        buttonText="Upgrade Now"
        buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-hover text-accent text-base leading-base"
        onClick={() => {
          router.push("/billing");
        }}
      />
    </div>
  );
}
