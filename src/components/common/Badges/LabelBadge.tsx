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
  color: ${({ theme: { color } }) => color.neutral.gray600};
  background-color: ${({ theme: { color } }) => color.neutral.gray100};
  border-radius: 12px;
  padding: 3.5px 8px;
`;
