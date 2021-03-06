const path = require("path")
const proxy = require("http-proxy-middleware")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `t-ractor`,
    description: `t-ractor for project everyday life poetry.`,
    author: `Arsenije Savic`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@module": path.resolve(__dirname, "src/module"),
          "@utils": path.resolve(__dirname, "src/utils"),
        },
        extensions: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `t-ractor`,
        short_name: `t-ractor`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/robot.png`,
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
