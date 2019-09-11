import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "./src/styles/theme"
import "./src/styles/hamburgers.css"
// import ReactGA from "react-ga"

//ReactGA.initialize("UA-142414970-1")

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)

// export const onRouteUpdate = (state, page, pages) => {
//   ReactGA.pageview(state.location.pathname)
// }
