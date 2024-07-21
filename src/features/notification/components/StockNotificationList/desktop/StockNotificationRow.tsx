import { IconButton } from "@components/Buttons/IconButton";
import { Icon } from "@components/Icon";
import useAllStockPriceTargetsDeleteMutation from "@features/notification/api/queries/useAllStockPriceTargetsDeleteMutation";
import useStockNotificationSettingsMutation from "@features/notification/api/queries/useStockNotificationSettingsMutation";
import { StockNotification } from "@features/notification/api/types";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import {
  Button,
  Collapse,
  TableCell,
  TableRow,
  Typography,
  debounce,
} from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StockNotificationDeleteAllConfirm from "../StockNotificationDeleteAllConfirm";
import StockNotificationLotsTable from "./StockNotificationLotsTable/StockNotificationLotsTable";

type Props = {
  row: StockNotification;
  isAllRowsOpen: boolean;
};

export default function StockNotificationRow({ row, isAllRowsOpen }: Props) {
  const { companyName, tickerSymbol, targetPrices, lastPrice, isActive } = row;

  const { mutate: activationMutate } = useStockNotificationSettingsMutation();
  const { mutate: removeAllMutate } = useAllStockPriceTargetsDeleteMutation();

  const [isRowOpen, setIsRowOpen] = useState(false);
  const {
    state: isConfirmOpen,
    setTrue: onRemoveAllButtonClick,
    setFalse: onRemoveAllAlertClose,
  } = useBoolean();

  const onConfirmRemoveAll = () => {
    const targetPriceNotificationIds = targetPrices.map(
      (item) => item.notificationId
    );
    removeAllMutate({ tickerSymbol, targetPriceNotificationIds });
  };

  const onNotificationButtonClick = debounce(() => {
    activationMutate({ tickerSymbol, isActive: !isActive });
  }, 250);

  const onExpandRowClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    setIsRowOpen(!isRowOpen);
  };

  // TODO: Reduce rendering (currently renders twice)
  useEffect(() => {
    setIsRowOpen(isAllRowsOpen);
  }, [isAllRowsOpen]);

  return (
    <>
      <StyledStockNotificationRow>
        <StyledTableCell
          style={{
            width: "40px",
            padding: "0 8px 0 16px",
          }}>
          <IconButton
            icon={isAllRowsOpen ? "chevron-down" : "chevron-right"}
            iconColor="custom"
            size="h24"
            customColor={{ color: "gray400", hoverColor: "gray200" }}
            onClick={(event) => onExpandRowClick(event)}
          />
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          <Typography sx={{ fontSize: "1rem" }} component="h3">
            <StyledLink
              style={{ font: designSystem.font.body3.font }}
              to={Routes.STOCK(tickerSymbol)}>
              {companyName}
            </StyledLink>
          </Typography>
        </StyledTableCell>

        <StyledTableCell style={{ width: "120px" }} align="center">
          <p>{thousandsDelimiter(lastPrice)}</p>
        </StyledTableCell>

        <StyledTableCell style={{ width: "120px" }} align="center">
          <div>
            <IconButton
              icon="notification"
              size="h24"
              iconColor="custom"
              customColor={{
                color: isActive ? "blue500" : "gray400",
                hoverColor: "gray100",
              }}
              onClick={onNotificationButtonClick}
            />
          </div>
        </StyledTableCell>

        <StyledTableCell style={{ width: "120px" }} align="center">
          <Button onClick={onRemoveAllButtonClick}>
            <Icon icon="trash" size={16} color="gray600" />
            <DeleteText>전체 삭제</DeleteText>
          </Button>
        </StyledTableCell>
      </StyledStockNotificationRow>

      <StyledLotRow>
        <TableCell style={{ padding: "0", border: "none" }} colSpan={5}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <StockNotificationLotsTable
              data={targetPrices.map((item) => ({
                ...item,
                companyName,
                tickerSymbol,
              }))}
            />
          </Collapse>
        </TableCell>
      </StyledLotRow>

      {isConfirmOpen && (
        <StockNotificationDeleteAllConfirm
          companyName={companyName}
          isOpen={isConfirmOpen}
          onClose={onRemoveAllAlertClose}
          onConfirm={onConfirmRemoveAll}
        />
      )}
    </>
  );
}

const StyledStockNotificationRow = styled(TableRow)`
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
  padding: 0px 8px;

  &:first-of-type {
    padding-left: 16px;
  }

  &:last-of-type {
    padding-right: 16px;
  }

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

const DeleteText = styled.span`
  margin-left: 4px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const StyledLotRow = styled(TableRow)`
  width: 856px;
  padding-top: 8px;
`;
