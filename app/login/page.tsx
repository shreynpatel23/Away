"use client";
import Cards from "@/app/components/Cards/page";
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
    <>
      <Cards
        message="Welcome Back!"
        description="Awayme helps users to set their free hours and make every look very busy"
        instructions="Please login to your account"
        credentials="Login using Google"
        options="Do not have an account?"
        checkin="Sign up"
        signInButton={<GoogleSignInButton />}
      />
    </>
  );
}
