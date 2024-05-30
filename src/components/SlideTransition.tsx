import { Slide, SlideProps } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

export default forwardRef(function SlideTransition(
  props: SlideProps & TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide ref={ref} {...props} />;
});
