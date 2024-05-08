import Routes from "@router/Routes";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthOnPrevButton } from "../../AuthOnPrevButton";

export default function AuthHeaderM() {
  const navigate = useNavigate();

  return (
    <HeaderM>
      <AuthOnPrevButton onPrev={() => navigate(Routes.LANDING)} />
    </HeaderM>
  );
}

const HeaderM = styled.header`
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  padding-inline: 8px;
  display: flex;
  align-items: center;
`;
