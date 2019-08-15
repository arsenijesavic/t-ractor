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
  border-radius: 20px;
  box-shadow: 0 0.063em 0.313em 0 rgba(0, 0, 0, 0.07),
    0 0.438em 1.063em 0 rgba(0, 0, 0, 0.1);
  ${switchProp('user', {
    bot: css`
      color: white;
      float: left;
      background-color: black;
      border-bottom: 2px solid white;
    `,
    human: css`
    color: bloack;
      float: right;
      background-color: white;
      bloack;
    `,
  })}
`
