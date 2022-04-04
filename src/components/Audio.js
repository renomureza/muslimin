import { forwardRef } from "react";

const Audio = forwardRef(function Player(props, ref) {
  return <audio ref={ref} {...props} />;
});

export default Audio;
