import { ReactNode, useEffect, useRef, useState } from "react";
import { CustomTooltip } from "./CustomTooltip";

type Props = {
  children: ReactNode;
  defaultMaxWidth?: string;
};

export const EllipsisTextTooltip = ({
  children,
  defaultMaxWidth = "100%",
}: Props) => {
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compareSize = () => {
      if (textRef.current) {
        const isOverflow =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTextOverflow(isOverflow);
      }
    };

    window.addEventListener("resize", compareSize);
    compareSize();

    return () => {
      window.removeEventListener("resize", compareSize);
    };
  }, [children]);

  return (
    <CustomTooltip smallPadding title={isTextOverflow ? children : ""}>
      <div
        ref={textRef}
        style={{
          // width: "100%",
          maxWidth: defaultMaxWidth,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
        {children}
      </div>
    </CustomTooltip>
  );
};
