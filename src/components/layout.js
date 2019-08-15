import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import GlobalStyle from '../styles/global'

const SITE_TITLE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
const Layout = ({ children }) => (
  <StaticQuery
    query={SITE_TITLE_QUERY}
    render={data => (
      <>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,500,700"
            rel="stylesheet"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.js" />
        </Helmet>

        <GlobalStyle />
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <div style={{ background: 'white' }}>{children}</div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
