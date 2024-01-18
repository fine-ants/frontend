import login_Image from "@assets/images/login_Image.png";
import AuthBasePage from "@pages/AuthBasePage";
import styled from "styled-components";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <AuthBasePage>
      <Wrapper>
        <Container>
          <SignInForm />
        </Container>
        <Container>
          <StyledImage src={login_Image} alt="fineAnts 로그인 배너" />
        </Container>
      </Wrapper>
    </AuthBasePage>
  );
}
const Wrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
`;

const StyledImage = styled.img`
  width: 90%;
`;
