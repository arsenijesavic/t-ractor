import React from "react"
import styled from "styled-components"

const Wrap = styled.div`
  display: inline-flex;
  > span {
    width: 8px;
    height: 8px;
    margin-left: 4px;
    background: black;
    display: inline-block;
    border-radius: 50%;
    opacity: 0.4;
  }
`

export default ({ isTyping }) => (
  <Wrap>
    {isTyping && (
      <>
        <span />
        <span />
        <span />
      </>
    )}
  </Wrap>
)
