"use client";
import Cards from "@/app/components/Cards";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      return router.push("/view-calendar");
    }
  }, [session]);
  return (
    <div className="w-full overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4">
      <Cards
        message="Welcome Back!"
        description="Awayme helps users to set their free hours and make every look very busy"
        instructions="Please login to your account"
        credentials="Login using Google"
        options="Do not have an account?"
        checkin="Sign up"
        signInButton={<GoogleSignInButton />}
      />
    </div>
  );
}
