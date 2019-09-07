const theme = {
  // typography: {
  //   baseFontSize: '14px',
  //   baseLineHeight: 1.5,
  //   googleFonts: [
  //     {
  //       name: 'Roboto Slab',
  //       styles: ['600'],
  //     },
  //     {
  //       name: 'Open Sans',
  //       styles: ['400', '400i', '700'],
  //     },
  //   ],
  //   scaleRatio: 1.5,
  //   headerFontFamily: ['Roboto Slab', 'serif'],
  //   bodyFontFamily: ['Open Sans', 'sans-serif'],
  //   headerColor: 'hsla(0,0%,0%,1)',
  //   bodyColor: 'hsla(0,0%,0%,0.8)',
  //   headerWeight: 600,
  //   bodyWeight: 400,
  //   boldWeight: 700,
  // },
  colors: {
    primary: "#0C66FF",
    secondary: "",
    hover: {
      primary: "#0B5DE8",
    },
    text: {
      success: "",
      error: "",
      alert: "",
      info: "",
      lighter: "#A6AEBC", // disabled, placeholder
      light: "#8A94A6", // secondary text, input label
      medium: "#53627C", // body text, description text
      dark: "#0A1F44", // heading, body
    },
    system: {
      success: "#22C993",
      error: "#F03D3D",
      alert: "#FFAD0D",
      info: "#0C66FF",
    },
    bg: {
      lighter: "#FCFCFD", // solid bg
      light: "#F8F9FB", //solid bg, list hover
      medium: "#F1F2F4", // stroke/hr, separators, disabled
      dark: "#E1E4E8", //text outline, disbaled bg
    },
  },
  //space: [0, 6, 12, 18, 24],
  breakpoints: ["32em", "48em", "64em"],
}

export default theme
