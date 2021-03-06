import React, { useRef } from "react"
import { useAsync } from "react-use"
import styled from "styled-components"
import { Flex, Box } from "@rebass/grid"
import Layout from "@components/layout"
import { Button } from "@components"
import { getViz } from "../../module/firebase"
// import drawMultilineText from "canvas-multiline-text"

const Wrap = styled(Flex)`
  flex-flow: column nowrap;
  align-items: stretch;
  max-width: 980px;
  min-height: 100vh;
  margin: 0 auto;
`

//   random = () => {
//     return this.text.current.value
//       .split(" ")
//       .map(w => {
//         if (w === "\n") return w
//         else if (Math.random() < 0.1)
//           return w
//             .split("")
//             .map(x => {
//               const char = x.charAt(0)
//               const r = alphaEncode[char] ? alphaEncode[char] : x
//               return x === "\n" ? "\n" : r
//             })
//             .join("")
//         else return "◽"
//       })
//       .join(" ")
//   }

const ToolsPage = () => {
  const { value: data, loading } = useAsync(async () => {
    return await getViz()
  }, [])

  console.log(data, loading)
  const timeRef = useRef(null)
  const amountRef = useRef(null)
  const textRef = useRef(null)

  const generate = () => {
    // this.interval = setInterval(this.change, this.time.current.value)
  }

  const stop = () => {
    // clearInterval(this.interval)
    // this.db = database.ref(`viz/${new Date().getTime()}`)
    // this.db.push().set({
    //   poem: this.text.current.value,
    //   html: this.state.html,
    // })
  }

  return (
    <Layout title="Tools">
      <Wrap>
        <Box p={2} style={{ textAlign: "center" }}>
          <h1>T.Tools</h1>
        </Box>

        <Box p={2}>
          <input ref={timeRef} type="range" min="0" max="300" step="10" />
          <input ref={amountRef} type="range" min="0" max="1" step="0.1" />
          <textarea ref={textRef} />
          <Flex>
            <Box width={1 / 2} p={2}>
              <Button onClick={stop}>STOP</Button>
            </Box>

            <Box width={1 / 2} p={2}>
              <Button onClick={generate}>Generate</Button>
            </Box>
          </Flex>
        </Box>

        <Box p={2} flex="1 0 auto">
          {/* <CreatePoemForm
          onSubmit={data => props.navigate("/chat", { state: data })}
        /> */}
        </Box>
      </Wrap>
    </Layout>
  )
}
export default ToolsPage

//   change = () => {
//     if (!this.canvas) return

//     this.canvas.current.width = width
//     this.canvas.current.height = height
//     this.canvas.current.style.width = width * 2
//     this.canvas.current.style.height = height * 2

//     const offscreenctx = this.canvas.current.getContext("2d")
//     offscreenctx.fillStyle = "#fff"
//     offscreenctx.fillRect(0, 0, width * 2, height * 2)
//     offscreenctx.font = "16px IBM Plex Mono"
//     offscreenctx.fillStyle = "#000"

//     const str = this.random()

//     this.setState({ text: str })
//     drawMultilineText(offscreenctx, str, {
//       rect: {
//         x: 10,
//         y: 10,
//         width: width - 20,
//         height: height - 20,
//       },
//       font: "IBM Plex Mono",
//       verbose: true,
//       lineHeight: 1.4,
//       minFontSize: 12,
//     })

//     const html = calcImg(offscreenctx)
//     this.setState({ html })
//     //  ctx.transferFromImageBitmap(offscreen.transferToImageBitmap())
//   }

//   render() {

//   }
// }

// <Layout on>
// <Flex flexWrap="wrap" flexDirection="column">
//   <Box width={1} p={2} style={{ textAlign: "center" }}>
//     <h1>Tools</h1>
//   </Box>

//   <Box p={2}>
//     <input ref={this.time} type="range" min="0" max="300" step="10" />
//     <input ref={this.amount} type="range" min="0" max="1" step="0.1" />
//     <textarea ref={this.text} />
//     <Flex>
//       <Box width={1 / 2} p={2}>
//         <button onClick={this.generate}>Generate</button>
//       </Box>
//       <Box width={1 / 2} p={2}>
//         <button onClick={this.stop}>STOP</button>
//       </Box>
//     </Flex>
//   </Box>

//   <Box width={1} p={2}>
//     <div
//       id="poem"
//       style={{
//         width,
//         height,
//         border: "1px solid #000",
//       }}
//       dangerouslySetInnerHTML={{ __html: html }}
//     />
//   </Box>

//   <Box>
//     {data &&
//       Object.keys(data).map((x, i) => {
//         const obj = data[x][0]
//         return (
//           <PoemWrap flexWrap="wrap">
//             <Box width={1} key={i} p={2}>
//               <p>{obj.poem}</p>
//             </Box>
//             <Box
//               style={{ border: "1px soid #000" }}
//               width={1}
//               key={i}
//               p={2}
//             >
//               <div dangerouslySetInnerHTML={{ __html: obj.html }} />
//             </Box>
//           </PoemWrap>
//         )
//       })}
//   </Box>

//   <Box width={1 / 2} px={4}>
//     <canvas style={{ visibility: "hidden" }} ref={this.canvas} />
//   </Box>
// </Flex>
// </Layout>
// const PoemWrap = styled(Flex)`
//   height: 842px;
//   @media print {
//     height: 842px;
//     page-break-before: always;
//   }
// `
// const width = 595
// const height = 842

// const w = Math.floor(595 / 8) - 4
// const h = Math.floor(842 / 8) - 2

// const alphaEncode = {
//   a: "▲",
//   b: "⧗",
//   c: "◖",
//   d: "◗",
//   e: "≡",
//   f: "▚",
//   g: "◔",
//   h: "✚",
//   i: "┇",
//   j: "▟",
//   k: "❮",
//   l: "▙",
//   m: "▉",
//   n: "▋",
//   o: "●",
//   p: "▐",
//   q: "▍",
//   r: "⬣",
//   s: "▓",
//   t: "┿",
//   u: "⋓",
//   v: "▾",
//   w: "▾▾",
//   x: "✖",
//   y: "⧫",
//   z: "⬘",
// }

// function calcImg(pic) {
//   const options = [
//     " ",
//     " ",
//     ".",
//     "@-",
//     "#:",
//     "+_~",
//     '"',
//     "*|",
//     "!l",
//     "+=",
//     ".",
//     "<L",
//     "\\i",
//     "/^",
//     "1?",
//     "Jv",
//     "r",
//     "()cx",
//     "7}",
//     "sz",
//     "3u",
//     "2Ckty{",
//     "jn",
//     "4FVY",
//     "5P[]af",
//     "qw",
//     "Sde",
//     "Eo",
//     "NOZ",
//     "9HXgh",
//     "GTU",
//     "$AIm",
//     "QW",
//     "KM",
//     "%8",
//     "#06@",
//     "bp",
//     "D",
//     "&",
//     "R",
//     "_",
//   ]

//   var res = "<pre>"

//   for (var i = 0; i < w; i++) {
//     var line = ""
//     for (var j = 0; j < h; j++) {
//       var x = pic.getImageData(2 + Math.round(j * 5.714), 5 + i * 12, 1, 1).data

//       //var x = pic.getImageData(j, i, 1, 1).data
//       var v = Math.round((1 - x[0] / 255.0) * 5)
//       //var index = Math.floor(Math.random() * options[v].length)

//       var chr = options[v][0]
//       if (chr === " ") chr = "&nbsp;"
//       if (chr === "<") chr = "&lt;"
//       if (chr === ">") chr = "&gt;"
//       //if (chr === '"') chr = '&quot;'
//       line += chr
//     }
//     res += line + "<br>"
//   }
//   res += "</pre>"
//   return res
// }
