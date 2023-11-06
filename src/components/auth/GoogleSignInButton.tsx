import useOAuthSignInMutation from "@api/auth/queries/useOAuthSignInMutation";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleSignInButton() {
  const { mutate: oAuthSignInMutate } = useOAuthSignInMutation();

  return (
    // TODO: custom login button (`useGoogleLogin` "auth-code" flow)
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const authCode = credentialResponse.credential;

        if (authCode) {
          oAuthSignInMutate({
            provider: "google",
            authCode,
          });
        }
      }}
      onError={() => {
        // TODO: Handle error from Google
        console.log("Login Failed");
      }}
    />
  );
}
