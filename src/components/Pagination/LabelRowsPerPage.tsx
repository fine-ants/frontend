import { Icon } from "@components/Icon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  count: number;
  startRow: number | undefined;
  endRow: number | undefined;
};

export function LabelRowsPerPage({ count, endRow, startRow }: Props) {
  return (
    <LabelRowsPerPageWrapper>
      <StyledLabelRowsPerPage>
        전체 <span>{count}</span> 중{" "}
        <span>
          {startRow && endRow
            ? endRow === 1
              ? 1
              : `${startRow}-${endRow}`
            : count}
        </span>
      </StyledLabelRowsPerPage>
      <Icon icon="divider" size={12} color="gray100" />
    </LabelRowsPerPageWrapper>
  );
}

const LabelRowsPerPageWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const StyledLabelRowsPerPage = styled.span`
  margin-right: 8px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};

  > span {
    color: ${designSystem.color.neutral.gray900};
  }
`;
