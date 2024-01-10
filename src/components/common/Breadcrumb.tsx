import iconChevronRight from "@assets/icons/ic_chevron-right.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  depthData: {
    name: string;
    url: string;
  }[];
};

export default function Breadcrumb({ depthData }: Props) {
  const navigate = useNavigate();

  const lastIndex = depthData.length - 1;

  return (
    <StyledBreadcrumb>
      {depthData.map((data, index) => {
        const { name, url } = data;
        return (
          <div key={index}>
            <DepthTitle
              $isLast={lastIndex === index}
              onClick={() => navigate(url)}>
              {name}
            </DepthTitle>
            {index !== depthData.length - 1 && (
              <DepthIcon src={iconChevronRight} />
            )}
          </div>
        );
      })}
    </StyledBreadcrumb>
  );
}

const StyledBreadcrumb = styled.div`
  display: flex;

  gap: 2.5px;
  font: ${({ theme: { font } }) => font.title5.font};
  letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2.5px;
    color: ${({ theme: { color } }) => color.neutral.gray400};
    font: ${({ theme: { font } }) => font.title5.font};
    letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
  }
`;

const DepthTitle = styled.span<{ $isLast: boolean }>`
  text-decoration: ${({ $isLast }) => ($isLast ? "none" : "underline")};
  text-decoration-color: ${({ theme: { color } }) => color.neutral.gray600};
  color: ${({ theme: { color }, $isLast }) =>
    $isLast ? color.neutral.gray800 : color.neutral.gray600};

  &:hover {
    color: ${({ theme: { color } }) => color.neutral.gray800};
    cursor: pointer;
  }
`;

const DepthIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
`;
