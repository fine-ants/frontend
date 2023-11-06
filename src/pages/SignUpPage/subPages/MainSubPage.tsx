import GoogleSignInButton from "@components/auth/GoogleSignInButton";
import KakaoSignInButton from "@components/auth/KakaoSignInButton";
import NaverSignInButton from "@components/auth/NaverSignInButton";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";

type Props = {
  onNext: () => void;
};

export default function MainSubPage({ onNext }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <GoogleSignInButton />
      <KakaoSignInButton />
      <NaverSignInButton />

      <button type="button" onClick={onNext}>
        이메일/비밀번호
      </button>

      <hr />

      <p>
        이미 회원이신가요?
        <button type="button" onClick={() => navigate(Routes.SIGNIN)}>
          로그인
        </button>
      </p>
    </div>
  );
}
