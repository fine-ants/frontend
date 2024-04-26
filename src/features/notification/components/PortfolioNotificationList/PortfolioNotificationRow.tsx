import { IconButton } from "@components/Buttons/IconButton";
import { securitiesFirmLogos } from "@constants/securitiesFirm";
import usePortfolioNotificationSettingsMutation from "@features/notification/api/queries/usePortfolioNotificationSettingsMutation";
import { PortfolioNotification } from "@features/notification/api/types";
import { TableCell, TableRow, Typography, debounce } from "@mui/material";
import designSystem from "@styles/designSystem";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  row: PortfolioNotification;
};

export default function PortfolioNotificationRow({ row }: Props) {
  const { portfolioId, securitiesFirm, name, targetGainNotify, maxLossNotify } =
    row;

  const { mutate } = usePortfolioNotificationSettingsMutation(portfolioId);

  const onTargetGainNotifyButtonClick = debounce(() => {
    mutate({
      notificationType: "targetGain",
      body: { isActive: !targetGainNotify },
    });
  }, 250);

  const onMaxLossNotifyButtonClick = debounce(() => {
    mutate({
      notificationType: "maxLoss",
      body: { isActive: !maxLossNotify },
    });
  }, 250);

  return (
    <StyledPortfolioNotificationRow>
      <StyledTableCell style={{ width: "132px" }} component="th" scope="row">
        <Typography sx={{ fontSize: "1rem" }} component="h3">
          <StyledLink
            style={{ font: designSystem.font.body3.font }}
            to={`/portfolio/${portfolioId}`}>
            <img
              src={securitiesFirmLogos[securitiesFirm]}
              alt={securitiesFirm}
              width="32px"
              height="32px"
            />
            <span className="portfolioName">{name}</span>
          </StyledLink>
        </Typography>
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        <IconButton
          icon="notification"
          size="h24"
          iconColor="custom"
          customColor={{
            color: targetGainNotify ? "blue500" : "gray400",
            hoverColor: "gray200",
          }}
          onClick={onTargetGainNotifyButtonClick}
        />
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        <IconButton
          icon="notification"
          size="h24"
          iconColor="custom"
          customColor={{
            color: maxLossNotify ? "blue500" : "gray400",
            hoverColor: "gray200",
          }}
          onClick={onMaxLossNotifyButtonClick}
        />
      </StyledTableCell>
    </StyledPortfolioNotificationRow>
  );
}

const StyledPortfolioNotificationRow = styled(TableRow)`
  &:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray100};
  }

  & > td,
  & > th {
    border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 48px;
  padding: 0px 16px;

  > button {
    padding: 0;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray800};

  &:hover {
    color: ${designSystem.color.primary.blue500};
  }
`;
