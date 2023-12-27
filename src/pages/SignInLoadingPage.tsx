import { CLIENT_URL } from "@constants/config";
import { useEffect } from "react";

export default function SignInLoadingPage() {
  // Handle Google, Kakao, Naver Redirect (receive OAuth provider, auth code and state) received in popup.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider");
    const authCode = urlParams.get("code");
    const state = urlParams.get("state");

    if (!provider || !authCode || !state) return; // TODO: handle error

    window.opener?.postMessage({ provider, authCode, state }, CLIENT_URL);
  });

  return (
    <div>
      {/* TODO: spinner, progressbar, etc */}
      <h1>We are signing you in</h1>
    </div>
  );
}
