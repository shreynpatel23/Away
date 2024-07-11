"use client";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function UserDetails() {
  const { data: session } = useSession();
  return (
    <div className="my-12 flex items-start gap-8 w-full">
      <img
        src={session?.user?.image || ""}
        alt="User avatar image"
        className="w-[150px] rounded-[12px]"
      />
      <div className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-semibold text-2xl leading-2xl text-heading">
            Welcome {session?.user?.name}
          </h1>
          <p className="text-base leading-base text-secondaryHeading">
            You are currently on the free version of Away me
          </p>
        </div>
        <div className="inline">
          <Button
            buttonText="Fill Calendar"
            buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent hover:bg-hover text-white hover:text-accent text-base leading-base"
            onClick={() => console.log("Fill Calendar Clicked!")}
          />
        </div>
      </div>
    </div>
  );
}
