import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../../router/Routes";
import PortfoliosPage from "./PortfoliosPage";
import ProfileEditPage from "./ProfileEditPage";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const { section } = useParams();

  const onSectionChange = (_: MouseEvent<HTMLElement>, section: string) => {
    if (!section) return;

    navigate(`${Routes.PROFILE}/${section}`);
  };

  return (
    <>
      <Header />
      <ToggleButtonGroup
        color="primary"
        value={section}
        exclusive
        onChange={onSectionChange}
        aria-label="Platform">
        <ToggleButton value="edit">내 프로필</ToggleButton>
        <ToggleButton value="portfolios">내 포트폴리오</ToggleButton>
      </ToggleButtonGroup>

      {section === "edit" ? <ProfileEditPage /> : <PortfoliosPage />}
      <Footer />
    </>
  );
}
