// import React from "react"
// import { ApolloProvider } from "react-apollo"
// import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
// import client from "./src/lib/apollo"
// import { ThemeProvider } from "styled-components"
// import theme from "./src/styles/theme"
// import ReactGA from "react-ga"
// import { StripeProvider } from "react-stripe-elements"
// const sk = "pk_test_AGxepjFIfqnRCdnLEjNZbb7f008V3T904d"

// ReactGA.initialize("UA-142414970-1")

// export const wrapRootElement = ({ element }) => (
//   <ThemeProvider theme={theme}>
//     <ApolloProvider client={client}>
//       <ApolloProviderHooks client={client}>
//         <StripeProvider apiKey={sk}>{element}</StripeProvider>
//       </ApolloProviderHooks>
//     </ApolloProvider>
//   </ThemeProvider>
// )

// export const onRouteUpdate = (state, page, pages) => {
//   ReactGA.pageview(state.location.pathname)
// }
