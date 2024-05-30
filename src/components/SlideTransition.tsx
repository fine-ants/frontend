import { Slide, SlideProps } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

export default function SlideTransition(
  direction: SlideProps["direction"] = "up"
) {
  return forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
  ) {
    return <Slide ref={ref} direction={direction} {...props} />;
  });
}
