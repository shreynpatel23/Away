"use client";
import { useSession, signIn } from "next-auth/react";
import Button from "../Button";
import { useRouter } from "next/navigation";

export function GoogleSignInButton() {
  const router = useRouter();
  const session = useSession();

  const handleClick = () => {
    if (session.status !== "authenticated") {
      signIn("google"); // will re-direct to sign in page
    } else {
      // navigate to view calendar page
      router.push("/view-calendar");
    }
  };

  return (
    <Button
      buttonText="Continue with Google"
      buttonClassName="rounded-md shadow-button hover:shadow-buttonHover bg-accent text-white text-base leading-base"
      onClick={() => handleClick()}
      hasIcon
      icon={
        <img src="/google-logo.png" alt="Google icon" className="w-[20px]" />
      }
    />
  );
}
