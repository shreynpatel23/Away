import { useSession } from "next-auth/react";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-4 mb-4 mx-6 py-4">
      <img src="/logo.png" alt="Away me logo" className="h-[40px]" />
      <div className="ml-auto">
        <div className="">
          <img
            src={session?.user?.image || ""}
            alt=" User avatar image"
            className="w-12 h-12 rounded-full overflow-hidden bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
