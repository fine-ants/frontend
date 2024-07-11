import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  title: string;
};
export default function LabelBadge({ title }: Props) {
  return <StyledLabelBadge>{title}</StyledLabelBadge>;
}

const StyledLabelBadge = styled.div`
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
  background-color: ${({ theme: { color } }) => color.neutral.gray100};
  border-radius: 12px;
  padding: 3.5px 8px;
`;
