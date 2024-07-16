"use client";
import Cards from "@/app/components/Cards/page";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
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
        message="Join Us Today!"
        description="Awayme helps users to set their free hours and make every look very busy"
        instructions="Create your account to get started"
        credentials="Sign up using Google"
        options="Already have an account?"
        checkin="Login"
        signInButton={<GoogleSignInButton />}
      />
    </>
  );
}
