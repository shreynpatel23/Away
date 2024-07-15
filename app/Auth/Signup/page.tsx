import Cards from "@/app/components/Cards/page";
import { GoogleSignInButton } from "@/app/components/GoogleSignInButtom";

export default function SignupPage() {
    return<>
         <Cards message="Join Us Today!"
                description="Awayme helps users to set their free hours and make every look very busy"
                instructions="Create your account to get started"
                credentials="Sign up using Google"
                options="Already have an account?"
                checkin="Login"
                signInButton={<GoogleSignInButton />}
         />
    </>
}