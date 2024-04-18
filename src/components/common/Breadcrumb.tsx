import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "./Icon";

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
              <Icon icon="chevron-right" color="gray400" size={12} />
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
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2.5px;
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray400};
  }
`;

const DepthTitle = styled.span<{ $isLast: boolean }>`
  text-decoration: ${({ $isLast }) => ($isLast ? "none" : "underline")};
  text-decoration-color: ${designSystem.color.neutral.gray600};
  color: ${({ $isLast }) =>
    $isLast
      ? designSystem.color.neutral.gray800
      : designSystem.color.neutral.gray600};

  &:hover {
    color: ${designSystem.color.neutral.gray800};
    cursor: pointer;
  }
`;
