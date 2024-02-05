import { Icon } from "@components/common/Icon";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PortfolioNotification } from "./PortfolioNotificationListTable";

type Props = {
  row: PortfolioNotification;
};

export default function PortfolioNotificationRow({ row }: Props) {
  const { portfolioId, name, targetGainNotify, maxLossNotify } = row;

  return (
    <StyledPortfolioNotificationRow>
      <StyledTableCell style={{ width: "132px" }} component="th" scope="row">
        <Typography sx={{ fontSize: "1rem" }} component="h3">
          <StyledLink
            style={{ font: designSystem.font.body3.font }}
            to={`/portfolio/${portfolioId}`}>
            {name}
          </StyledLink>
        </Typography>
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        {/* TODO: onClick */}
        <IconButton>
          <Icon
            icon="notification"
            size={24}
            color={targetGainNotify ? "blue500" : "gray400"}
          />
        </IconButton>
      </StyledTableCell>

      <StyledTableCell style={{ width: "140px" }} align="center">
        {/* TODO: onClick */}
        <IconButton>
          <Icon
            icon="notification"
            size={24}
            color={maxLossNotify ? "blue500" : "gray400"}
          />
        </IconButton>
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
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray800};

  &:hover {
    color: ${designSystem.color.primary.blue500};
  }
`;
