import React from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

const Header = ({ count = 1, duration, active, onTimeExpire }) => {
  return (
    <Wrap>
      <h4 style={{ opacity: active ? "1" : "0" }}>{count}/30</h4>
      {active && (
        <Life duration={duration} reset={active} onDone={onTimeExpire} />
      )}
    </Wrap>
  )
}

export default Header

const Wrap = styled.div`
  text-align: center;
  padding: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const ProgressLeft = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  width: auto;
  height: 8px;
  opacity: ${props => props.opacity};
  background-image: linear-gradient(130deg, #00b4e6, #00f0e0);
`

const ProgressRight = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  width: auto;
  height: 8px;
  opacity: ${props => props.opacity};
  background-image: linear-gradient(130deg, #00f0e0, #00b4e6);
`

const Life = ({ duration = 3000, item = 1, reset, onDone }) => {
  const leftProps = useSpring({
    key: Math.random(),
    reset,
    config: { duration },
    from: { left: "0%" },
    to: { left: "50%" },
    onRest: () => onDone && onDone(),
  })

  const rightProps = useSpring({
    key: Math.random(),
    reset,
    config: { duration },
    from: { right: "0%" },
    to: { right: "50%" },
    // onRest: () => onDone && onDone(),
  })

  return (
    <div>
      <ProgressLeft
        key={item.id}
        opacity={reset ? "1" : "0"}
        style={leftProps}
      />
      <ProgressRight
        key={item.id}
        opacity={reset ? "1" : "0"}
        style={rightProps}
      />
    </div>
  )
}
