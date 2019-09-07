import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "./src/styles/theme"
// import ReactGA from "react-ga"

import "./src/styles/hamburgers.css"

//ReactGA.initialize("UA-142414970-1")

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)

// export const onRouteUpdate = (state, page, pages) => {
//   ReactGA.pageview(state.location.pathname)
// }
