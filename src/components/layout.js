import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import GlobalStyle from "../styles/global"
import Header from "./header"

const SITE_TITLE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children, style, navigation }) => (
  <StaticQuery
    query={SITE_TITLE_QUERY}
    render={data => (
      <>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Space+Mono:400,700&display=swap"
            rel="stylesheet"
          />
          {typeof window !== "undefined" && (
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js" />
          )}
        </Helmet>

        <GlobalStyle />
        {navigation && <Header siteTitle={data.site.siteMetadata.title} />}
        <main>{children}</main>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.default = {
  navigation: true,
}
export default Layout
