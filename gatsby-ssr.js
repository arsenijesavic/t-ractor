// import React from "react"
// import { ApolloProvider } from "react-apollo"
// import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
// import client from "./src/lib/apollo"
// import { ThemeProvider } from "styled-components"
// import theme from "./src/styles/theme"

// export const wrapRootElement = ({ element }) => (
//   <ThemeProvider theme={theme}>
//     <ApolloProvider client={client}>
//       <ApolloProviderHooks client={client}>{element}</ApolloProviderHooks>
//     </ApolloProvider>
//   </ThemeProvider>
// )

// export const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
//   return setPostBodyComponents([
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js" />,
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js" />,
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js" />,
//   ])
// }
