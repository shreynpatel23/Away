import Cards from "@/app/components/Cards/page";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";

export default function LoginPage() {
    return<>
         <Cards message="Welcome Back!"
                description="Awayme helps users to set their free hours and make every look very busy"
                instructions="Please login to your account"
                credentials="Login using Google"
                options="Do not have an account?"
                checkin="Sign up"
                signInButton={<GoogleSignInButton />}
         />
    </>
}