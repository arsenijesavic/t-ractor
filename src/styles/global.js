import { css, createGlobalStyle } from "styled-components"

const styles = css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 18px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Space Mono", monospace;
    font-size: 1em;
    line-height: 1.45;
    color: black;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Space Mono", monospace;
    line-height: 1.2;
    margin: 0;
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2.25em;
  }

  h4 {
    font-size: 1.875rem;
  }

  h5 {
    font-size: 1.5rem;
  }

  h6 {
    font-size: 1.125rem;
  }

  p {
    font-size: 1em;
  }

  small {
    font-size: 0.875rem;
    /* font-size: .75rem; */
  }

  input,
  textarea,
  select,
  button {
    width: 100%;
    display: block;
    color: black;
    font-family: inherit;
    font-size: inherit;
    border: none;
    box-shadow: none;
    outline: none;
  }

  ::-webkit-input-placeholder {
    font-family: inherit;
    font-size: inherit;
    color: rgba(0, 0, 0, 0.5);
  }

  label {
    display: block;
    color: rgba(0, 0, 0, 0.5);
    margin: 1em 0;
  }

  pre {
    font: 16px/16px monospace;
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 0em 0px;
  }

  pre {
    border: 1px solid #999;
    page-break-inside: avoid;
    display: block;
    word-break: break-all;
    word-wrap: break-word;
    /*white-space: pre;
    white-space: pre-wrap;
  */
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  pre code {
    padding: 0;
    color: inherit;
    white-space: pre;
    white-space: pre-wrap;
    background-color: red;
    border: 0;
  }

  @media print {
    pre {
      overflow-x: auto;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap !important;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
      background: #fff;
    }
  }

  canvas {
    visibility: visible !important;
  }
`

export default createGlobalStyle`${styles}`
