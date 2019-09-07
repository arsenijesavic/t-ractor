import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { Box } from "@rebass/grid"
import styled, { css } from "styled-components"
import { switchProp } from "styled-tools"

export default ({ data = [] }) => {
  const containerRef = useRef(null)

  const resetScrollTop = () => {
    if (!containerRef.current) return
    const selfDOMNode = ReactDOM.findDOMNode(containerRef.current)
    selfDOMNode.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(resetScrollTop, [data.length, containerRef])

  return (
    <Box
      ref={containerRef}
      p={2}
      flex="1 0 auto"
      style={{ position: "relative", overflow: "auto" }}
    >
      <Wrap style={{ padding: "0", margin: "0" }}>
        {data &&
          data.map((message, i) => (
            <div key={i}>
              <Message actor={message.actor}>
                <p style={{ margin: "0", padding: "0" }}>
                  <span style={{ textTransform: "uppercase" }}>
                    {message.user}:{" "}
                  </span>
                  {message.text}
                </p>
              </Message>
            </div>
          ))}
      </Wrap>
    </Box>
  )
}

const Wrap = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Message = styled.li`
  display: inline-block;
  clear: both;
  padding: 1em;
  margin: 1em;
  list-style: none;
  border-radius: 20px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  ${switchProp("actor", {
    bot: css`
      color: white;
      float: left;
      background-color: black;
    `,
    human: css`
      color: black;
      float: right;
      background-color: white;
    `,
  })}
`
