const proxy = require("http-proxy-middleware")

module.exports = {
  siteMetadata: {
    title: `t-ractor`,
    description: `t-ractor for project everyday life poetry.`,
    author: `Arsenije Savic`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.png`
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-sharp",
  ],

  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      }),
    )
  },
}
