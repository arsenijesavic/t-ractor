import React from "react"
import styled, { keyframes } from "styled-components"
import { useSpring, animated } from "react-spring"

const pulse = keyframes`
  from { transform: scale3d(1, 1, 1); }
  50%{ transform: scale3d(1.5, 1.5, 1.5); }
  to { transform: scale3d(1, 1, 1); }
`
const CountText = styled.h5`
  font-weight: 100;
  animation: ${pulse} 0.4s ease-in-out;
`

const Header = ({ count = 1, duration, active, reset, onTimeExpire }) => {
  return (
    <Wrap>
      <CountText key={count}>{count}/30</CountText>
      {active && (
        <Life duration={duration} reset={reset} onDone={onTimeExpire} />
      )}
    </Wrap>
  )
}

export default Header

const Wrap = styled.div`
  position: relative;
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
  background-image: linear-gradient(130deg, #00b4e6, #00f0e0);
`

const ProgressRight = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  width: auto;
  height: 8px;
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
      <ProgressLeft style={leftProps} />
      <ProgressRight style={rightProps} />
    </div>
  )
}
