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
        </Helmet>

        <GlobalStyle />
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <div style={{ background: '#FAF2DF' }}>{children}</div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
