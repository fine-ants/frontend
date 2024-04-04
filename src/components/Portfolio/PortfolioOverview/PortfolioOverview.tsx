import usePortfolioDeleteMutation from "@api/portfolio/queries/usePortfolioDeleteMutation";
import { PortfolioDetails } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import LabelBadge from "@components/common/Badges/LabelBadge";
import Breadcrumb from "@components/common/Breadcrumb";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import securitiesFirmLogos from "@styles/securitiesFirmLogos";
import { thousandsDelimiter } from "@utils/delimiters";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioOverviewBody from "./PortfolioOverviewBody";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverview({ data }: Props) {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onPortfolioEdit = () => {
    setIsDialogOpen(true);
  };

  const onPortfolioRemove = () => {
    setIsConfirmOpen(true);
  };

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onConfirmAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    portfolioDeleteMutate(Number(portfolioId));
    navigate(Routes.PORTFOLIOS);
  };

  return (
    <StyledPortfolioOverview>
      <PortfolioOverviewHead>
        <Breadcrumb
          depthData={[
            { name: "내 포트폴리오", url: "/portfolios" },
            { name: data.name, url: `/portfolio/${portfolioId}` },
          ]}
        />
        <TitleContent>
          <TitleWrapper>
            <FirmImage src={securitiesFirmLogos[data.securitiesFirm]} />
            <Title>{data.name}</Title>
            <LabelBadge title={data.securitiesFirm} />
          </TitleWrapper>
          <ButtonsWrapper>
            <Button
              variant="tertiary"
              size="h32"
              onClick={onPortfolioRemove}
              disabled={false}>
              <Icon icon="trash" size={16} color="gray600" />
              삭제
            </Button>
            <Button
              variant="secondary"
              size="h32"
              onClick={onPortfolioEdit}
              disabled={false}>
              <Icon icon="edit" size={16} color="blue500" />
              편집
            </Button>
          </ButtonsWrapper>
        </TitleContent>
      </PortfolioOverviewHead>

      <ValuationContainer>
        <div>평가금액</div>
        <CurrentValuation>
          ₩<span>{thousandsDelimiter(data.currentValuation)}</span>
        </CurrentValuation>
      </ValuationContainer>

      <PortfolioOverviewBody data={data} />

      {isDialogOpen && (
        <PortfolioAddDialog
          isOpen={isDialogOpen}
          onClose={onDialogClose}
          portfolioDetails={data}
        />
      )}
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="포트폴리오를 삭제 하시겠습니까?"
          onClose={onConfirmAlertClose}
          onConfirm={onConfirmAction}
        />
      )}
    </StyledPortfolioOverview>
  );
}

const StyledPortfolioOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const PortfolioOverviewHead = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const FirmImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Title = styled.span`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ValuationContainer = styled.div`
  height: 64px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${designSystem.color.neutral.gray800};
  border-radius: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;

const CurrentValuation = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font: ${designSystem.font.title2.font};
  letter-spacing: ${designSystem.font.title2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};

  > span {
    font: ${designSystem.font.title1.font};
    letter-spacing: ${designSystem.font.title1.letterSpacing};
    color: ${designSystem.color.neutral.white};
  }
`;
