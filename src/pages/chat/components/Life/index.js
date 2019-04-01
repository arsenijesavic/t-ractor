import React from 'react'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

export default ({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  item,
  onDone,
}) => {
  if (!item) return null

  const transitions = useTransition(item, item => item.id, {
    from: { life: '100%' },
    //enter: item => async next => await next({ opacity: 1 }),
    leave: item => async (next, cancel) => await next({ life: '0%' }),
    //onRest: item => setItems(state => state.filter(i => i.key !== item.key)),
    onDestroyed: item => onDone && onDone(),
    config: (item, state) =>
      state === 'leave' ? [{ duration: timeout }, config, config] : config,
  })

  return transitions.map(({ key, item, props: { life, ...style } }) => {
    return <Progress key={item.id} style={{ right: life }} />
  })
}

const Progress = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  background-image: linear-gradient(130deg, #00b4e6, #00f0e0);
  height: 5px;
`
