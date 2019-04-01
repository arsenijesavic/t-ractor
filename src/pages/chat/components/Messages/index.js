import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { switchProp } from 'styled-tools'

export default ({ data = [] }) => {
  const selfRef = useRef(null)

  const resetScrollTop = () => {
    if (!selfRef.current) return
    const selfDOMNode = ReactDOM.findDOMNode(selfRef.current)
    selfDOMNode.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(resetScrollTop, [selfRef.current])
  useEffect(resetScrollTop, [data.length])

  return (
    <div ref={selfRef} style={{ height: '86vh', overflow: 'scroll' }}>
      {data &&
        data.map((message, i) => (
          <div key={i}>
            <Message user={message.user}>
              {message.user}:{message.text}
            </Message>
          </div>
        ))}
    </div>
  )
}

const Message = styled.li`
  display: inline-block;
  clear: both;
  padding: 1em;
  margin: 1em;
  list-style: none;
  border-bottom: 2px solid #dac0b5;
  color: #fffdf5;

  ${switchProp('user', {
    bot: css`
      float: left;
      background-color: #ff5442;
    `,
    human: css`
      float: right;
      background-color: #1fc2bc;
    `,
  })}
`
