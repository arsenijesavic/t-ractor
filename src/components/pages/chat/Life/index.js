import React from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

export default ({
  config = { tension: 125, friction: 20, precision: 0.1 },
  duration = 3000,
  item = 1,
  active,
  onDone,
}) => {
  const props = useSpring({
    key: Math.random(),
    reset: active,
    config: { duration },
    from: { right: "0%" },
    to: { right: "100%" },
    //onRest: () => onDone && onDone(),
  })

  return (
    <span>
      <Progress key={item.id} opacity={active ? "1" : "0"} style={props} />
    </span>
  )
}

const Progress = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  height: 5px;
  opacity: ${props => props.opacity};
  background-image: linear-gradient(130deg, #00b4e6, #00f0e0);
`
