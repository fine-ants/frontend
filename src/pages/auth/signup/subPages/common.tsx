import Button from "@components/Buttons/Button";
import styled from "styled-components";

export const AuthPageHeaderWrapperM = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PrevButtonWrapperM = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  padding-inline: 8px;
  display: flex;
  align-items: center;
`;

export const AuthPageHeaderInnerWrapperM = styled.div`
  width: 100%;
  max-width: 480px;
  padding-inline: 16px;
  align-self: center;
`;

export const AuthPageHeaderInnerWrapperD = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: center;
`;

export const AuthNextButton = styled(Button)<{ $isMobile: boolean }>`
  margin-top: ${({ $isMobile }) => ($isMobile ? "auto" : "0")};
`;
