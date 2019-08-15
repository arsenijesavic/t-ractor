import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none !important;
    -webkit-print-color-adjust: exact !important;
  }

  pre
{
border: 1px solid #999;
page-break-inside: avoid;
display: block;
word-break: break-all;
word-wrap: break-word;
/*white-space: pre;
white-space: pre-wrap;*/
background-color: red;
border: 1px solid #ccc;
border: 1px solid rgba(0, 0, 0, 0.15);
}

pre code
{
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

  html {
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1em;
    line-height: 1.45;
    color: black;
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
    color: black;
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
    color: black;
  }

  input[type="date"]{
    height: 44px;
  }

  input{
    border: 2px solid black;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  }

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
    padding: 1.5em;
    background: blue;
    color: #fff;
    font-weight: 900;
    cursor: pointer;
    border: none;
    outline: none;
  }

  pre {
    font: 16px/16px monospace;
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 0em 0px;
  }
`
