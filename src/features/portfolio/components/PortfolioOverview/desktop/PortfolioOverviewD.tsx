import LabelBadge from "@components/Badges/LabelBadge";
import Breadcrumb from "@components/Breadcrumb";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { securitiesFirmLogos } from "@constants/securitiesFirm";
import usePortfolioDeleteMutation from "@features/portfolio/api/queries/usePortfolioDeleteMutation";
import { PortfolioDetails } from "@features/portfolio/api/types";
import PortfolioEditDialog from "@features/portfolio/components/PortfolioAddOrEditDialog/PortfolioAddOrEditDialog";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioDeleteConfirm from "../../PortfolioDeleteConfirm";
import PortfolioOverviewBodyD from "./PortfolioOverviewBodyD";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverviewD({ data }: Props) {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation();

  const {
    state: isDialogOpen,
    setTrue: onPortfolioEdit,
    setFalse: onDialogClose,
  } = useBoolean();
  const {
    state: isConfirmOpen,
    setTrue: onPortfolioRemove,
    setFalse: onConfirmAlertClose,
  } = useBoolean();

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
            { name: data.name, url: Routes.PORTFOLIO(portfolioId) },
          ]}
        />
        <TitleContent>
          <TitleWrapper>
            <FirmImage
              src={securitiesFirmLogos[data.securitiesFirm]}
              alt={`${data.securitiesFirm} 로고`}
            />
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

      <PortfolioOverviewBodyD data={data} />

      {isDialogOpen && (
        <PortfolioEditDialog
          isOpen={isDialogOpen}
          onClose={onDialogClose}
          portfolioDetails={data}
        />
      )}
      {isConfirmOpen && (
        <PortfolioDeleteConfirm
          isOpen={isConfirmOpen}
          portfolioName={data.name}
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
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};

  > span {
    font: ${designSystem.font.title2.font};
    letter-spacing: ${designSystem.font.title2.letterSpacing};
    color: ${designSystem.color.neutral.white};
  }
`;
