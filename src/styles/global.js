import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-smoothing: antialiased;
    outline: none !important;
  }

  html {
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1em;
    line-height: 1.45;
    color: #0a1f44;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'IBM Plex Mono', monospace;
    line-height: 1.2;
    margin: 0;
  }

  h1 {
    font-size: 5.063em;
  }

  h2 {
    font-size: 3.375em;
  }

  h3 {
    font-size: 2.25em;
  }

  h4 {
    font-size: 1.5em;
  }

  p {
    font-size: 1em;
  }

  small {
    font-size: 0.667em;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
  }

  a.active {
    color: ${theme.colors.text.dark};
  }

  a:hover {
    cursor: pointer;
    color: ${theme.colors.text.lighter};
  }

  label {
    font-size: 1em;
    font-weight: 500;
    text-transform: uppercase;
  }

  ::-webkit-input-placeholder {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
    color: ${theme.colors.text.light};
  }

  input, textarea {
    outline: none;
    box-shadow: none;
  }

  input, textarea, select, button {
    display: block;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  input[type="date"]{
    height: 44px;
  }

  input{}

  input:focus, textarea:focus {
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    min-height: 200px;
    resize: none;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  pre {
    font: 5px/5px monospace;
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 0em 0px;
  }
`
