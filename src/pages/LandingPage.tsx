import { Typography } from "@mui/material";
import Routes from "@router/Routes";
import { useNavigate } from "react-router-dom";
import BasePage from "./BasePage";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <BasePage>
      <nav>
        <ul>
          <li onClick={() => navigate(Routes.SIGNIN)}>로그인</li>
          <li onClick={() => navigate(Routes.SIGNUP)}>회원가입</li>
        </ul>
      </nav>
      <Typography variant="h1">Landing Page!</Typography>
    </BasePage>
  );
}
