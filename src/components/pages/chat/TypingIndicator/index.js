import React from "react"

import styled from "styled-components"

const Wrap = styled.div`
  width: 100px;
  height: 12px;
  > span {
    padding: 0;
    margin: 0;
    margin-left: 5%;
    background: black;
    display: inline-block;
    width: 6px;
    height: 6px;
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
