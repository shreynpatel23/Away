import { auth, EnrichedSession } from "../auth";
import { GoogleSignInButton } from "./components/GoogleSignInButtom";

export default async function Home() {
  const session = (await auth()) as EnrichedSession;

  return (
    <main>
      {session?.user?.name ? (
        <p>Welcome {session?.user?.name}</p>
      ) : (
        <p>Login to continue</p>
      )}
      <GoogleSignInButton />
    </main>
  );
}
