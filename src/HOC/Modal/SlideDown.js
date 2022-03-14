import React from "react";
import { useSpring, animated } from "react-spring";
export default function SlideDown(Component) {
  const propsSpring = useSpring({
    to: { margin: "0%" },
    from: { margin: "300px" },
    config: {
      duration: 500,
    },
  });
  return (
    <div>
      <animated.div style={propsSpring}>
        <Component></Component>
      </animated.div>
    </div>
  );
}
