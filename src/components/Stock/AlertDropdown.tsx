import Button from "@components/common/Buttons/Button";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { Icon } from "@components/common/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import styled from "styled-components";
import AlertDropdownInput from "./AlertDropdownInput";

const alertData = [
  {
    id: 1,
    targetPrice: 80000,
  },
  {
    id: 2,
    targetPrice: 90000,
  },
  {
    id: 3,
    targetPrice: 100000,
  },
  {
    id: 4,
    targetPrice: 110000,
  },
];

export default function AlertDropdown() {
  const { onOpen, DropdownMenu } = useDropdown();

  const onDropdownButtonClick = (e: MouseEvent<HTMLElement>) => {
    onOpen(e);
  };

  return (
    <>
      <div onClick={onDropdownButtonClick}>
        <Button variant="secondary" size="h32">
          <Icon icon="notification" size={24} color="blue500" />
          알림 설정
        </Button>
      </div>
      <DropdownMenu sx={dropdownMenuSx}>
        <TitleAndInput>
          <label>
            지정가
            <CustomTooltip
              arrow
              title="종목 지정가 알림은 최대 5개까지 추가할 수 있습니다">
              <Icon icon="help" size={16} color="gray400" />
            </CustomTooltip>
          </label>
          <AlertDropdownInput />
        </TitleAndInput>

        <AddButtonWrapper>
          <Button style={{ marginLeft: "auto" }} variant="primary" size="h24">
            추가
          </Button>
        </AddButtonWrapper>

        <Divider />

        <AddedAlertTitle>추가된 알림</AddedAlertTitle>

        <AlertContainer>
          {alertData.map((alert) => (
            <TargetPriceAlertItem key={alert.id}>
              <span>₩{alert.targetPrice}</span>
              <Icon icon="remove" size={16} color="gray600" />
            </TargetPriceAlertItem>
          ))}
        </AlertContainer>
      </DropdownMenu>
    </>
  );
}

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "352px",
    "height": "auto",

    "alignItems": "center",
    "justifyContent": "center",
    "padding": "16px",
    "backgroundColor": designSystem.color.neutral.white,
    "border": `1px solid ${designSystem.color.neutral.gray200}`,
    "borderRadius": "3px",
    "boxShadow": "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",

    ".MuiList-root": {
      "width": "100%",
      "padding": "0",
      "display": "flex",
      "flexDirection": "column",
      "gap": "16px",
      ".MuiMenuItem-root": {
        width: "336px",
        height: "32px",
        padding: "8px",
        borderRadius: "4px",
        boxSizing: "border-box",
        display: "flex",
        gap: "8px",
      },

      ".MuiMenuItem-root:hover": {
        backgroundColor: designSystem.color.neutral.gray50,
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const TitleAndInput = styled.div`
  width: 320px;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;

  > label {
    width: 80px;
    display: flex;
    flex-shrink: 0;
    gap: 4px;
    align-items: center;
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;

const AddButtonWrapper = styled.div``;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray200};
`;

const AddedAlertTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TargetPriceAlertItem = styled.div`
  width: 320px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
