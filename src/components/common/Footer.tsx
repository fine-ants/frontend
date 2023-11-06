import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <div>FineAnts @ 2023. All rights reserved.</div>
      <div>대충 유튜브 엑스 인스타 </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2542ba;
  color: #ffffff;
  padding: 0 80px;
`;
