import addIcon from "@assets/icons/add-icon.svg";
import emptyPortfolioImg from "@assets/images/empty_portfolio.svg";
import Button from "@components/common/Buttons/Button";
import { useState } from "react";
import styled from "styled-components";
import PortfolioAddDialog from "../PortfolioAddDialog";

export default function EmptyPortfolioListTable() {
  const [isAddPortfolioDialogOpen, setIsAddPortfolioDialogOpen] =
    useState(false);

  const onAddPortfolioButtonClick = () => {
    setIsAddPortfolioDialogOpen(true);
  };

  const onAddPortfolioDialogClose = () => {
    setIsAddPortfolioDialogOpen(false);
  };

  return (
    <StyledEmptyPortfolioListTable>
      <EmptyPortfolioListImage src={emptyPortfolioImg} alt="" />
      <EmptyPortfolioListTitle>
        첫번째 포트폴리오를 추가하세요
      </EmptyPortfolioListTitle>
      <EmptyPortfolioListDescription>
        포트폴리오를 추가하여 보유한 자산을 효율적으로 관리하세요
      </EmptyPortfolioListDescription>
      <Button variant="primary" size="h32" onClick={onAddPortfolioButtonClick}>
        <img src={addIcon} alt="포트폴리오 추가" />
        <span>포트폴리오 추가</span>
      </Button>

      {isAddPortfolioDialogOpen && (
        <PortfolioAddDialog
          isOpen={isAddPortfolioDialogOpen}
          onClose={onAddPortfolioDialogClose}
        />
      )}
    </StyledEmptyPortfolioListTable>
  );
}

const StyledEmptyPortfolioListTable = styled.div`
  margin-top: 62px;
  margin-bottom: 138px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyPortfolioListImage = styled.img`
  width: 600px;
  margin-bottom: 48px;
`;

const EmptyPortfolioListTitle = styled.h3`
  margin-bottom: 16px;
  font: ${({ theme: { font } }) => font.heading3};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;

const EmptyPortfolioListDescription = styled.p`
  margin-bottom: 48px;
  font: ${({ theme: { font } }) => font.body2};
  color: ${({ theme: { color } }) => color.neutral.gray500};
`;
