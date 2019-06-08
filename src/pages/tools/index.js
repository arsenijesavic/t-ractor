import React, { Component } from 'react'

import { Flex, Box } from '@rebass/grid'
import Layout from '../../components/layout'

import drawMultilineText from 'canvas-multiline-text'
import database, { getViz } from '../../module/firebase'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import domtoimage from 'dom-to-image'

const width = 595
const height = 842

const w = Math.floor(595 / 8) - 4
const h = Math.floor(842 / 8) - 2

const alphaEncode = {
  a: '▲',
  b: '⧗',
  c: '◖',
  d: '◗',
  e: '≡',
  f: '▚',
  g: '◔',
  h: '✚',
  i: '┇',
  j: '▟',
  k: '❮',
  l: '▙',
  m: '▉',
  n: '▋',
  o: '●',
  p: '▐',
  q: '▍',
  r: '⬣',
  s: '▓',
  t: '┿',
  u: '⋓',
  v: '▾',
  w: '▾▾',
  x: '✖',
  y: '⧫',
  z: '⬘',
}

function calcImg(pic) {
  const options = [
    ' ',
    ' ',
    '.',
    '@-',
    '#:',
    '+_~',
    '"',
    '*|',
    '!l',
    '+=',
    '.',
    '<L',
    '\\i',
    '/^',
    '1?',
    'Jv',
    'r',
    '()cx',
    '7}',
    'sz',
    '3u',
    '2Ckty{',
    'jn',
    '4FVY',
    '5P[]af',
    'qw',
    'Sde',
    'Eo',
    'NOZ',
    '9HXgh',
    'GTU',
    '$AIm',
    'QW',
    'KM',
    '%8',
    '#06@',
    'bp',
    'D',
    '&',
    'R',
    '_',
  ]

  var res = '<pre>'

  for (var i = 0; i < w; i++) {
    var line = ''
    for (var j = 0; j < h; j++) {
      var x = pic.getImageData(2 + Math.round(j * 5.714), 5 + i * 12, 1, 1).data

      //var x = pic.getImageData(j, i, 1, 1).data
      var v = Math.round((1 - x[0] / 255.0) * 5)
      //var index = Math.floor(Math.random() * options[v].length)

      var chr = options[v][0]
      if (chr === ' ') chr = '&nbsp;'
      if (chr === '<') chr = '&lt;'
      if (chr === '>') chr = '&gt;'
      //if (chr === '"') chr = '&quot;'
      line += chr
    }
    res += line + '<br>'
  }
  res += '</pre>'
  return res
}

class ToolsPage extends Component {
  state = {
    count: 0,
  }

  constructor() {
    super()
    this.time = React.createRef()
    this.text = React.createRef()
    this.amount = React.createRef()
    this.canvas = React.createRef()
  }

  async componentDidMount() {
    const data = await getViz()
    console.log(data)
    this.setState({ data })
  }

  generate = () => {
    this.interval = setInterval(this.change, this.time.current.value)
  }

  stop = () => {
    clearInterval(this.interval)
    this.db = database.ref(`viz/${new Date().getTime()}`)
    this.db.push().set({
      poem: this.text.current.value,
      html: this.state.html,
    })

    const node = document.getElementById('poem')

    function filter(node) {
      return node.tagName !== 'i'
    }

    domtoimage.toSvg(node, { filter: filter }).then(function(dataUrl) {
      const link = document.createElement('a')
      link.download = 'my-image-name.svg'
      link.href = dataUrl
      link.click()
    })

    var image = this.canvas.current
      .toDataURL('image/png', 1.0)
      .replace('image/png', 'image/octet-stream')
    var link = document.createElement('a')
    link.download = 'my-image.png'
    link.href = image
    //link.click()
  }

  random = () => {
    return this.text.current.value
      .split(' ')
      .map(w => {
        if (w === '\n') return w
        else if (Math.random() < 0.1)
          return w
            .split('')
            .map(x => {
              const char = x.charAt(0)
              const r = alphaEncode[char] ? alphaEncode[char] : x
              return x === '\n' ? '\n' : r
            })
            .join('')
        else return '◽'
      })
      .join(' ')
  }

  change = () => {
    if (!this.canvas) return

    this.canvas.current.width = width
    this.canvas.current.height = height
    this.canvas.current.style.width = width * 2
    this.canvas.current.style.height = height * 2

    const offscreenctx = this.canvas.current.getContext('2d')
    offscreenctx.fillStyle = '#fff'
    offscreenctx.fillRect(0, 0, width * 2, height * 2)
    offscreenctx.font = '16px IBM Plex Mono'
    offscreenctx.fillStyle = '#000'

    const str = this.random()

    this.setState({ text: str })
    drawMultilineText(offscreenctx, str, {
      rect: {
        x: 10,
        y: 10,
        width: width - 20,
        height: height - 20,
      },
      font: 'IBM Plex Mono',
      verbose: true,
      lineHeight: 1.4,
      minFontSize: 12,
    })

    const html = calcImg(offscreenctx)
    this.setState({ html })
    //  ctx.transferFromImageBitmap(offscreen.transferToImageBitmap())
  }

  render() {
    const { data, text, html } = this.state

    return (
      <Layout on>
        <Flex flexWrap="wrap" flexDirection="column">
          <Box width={1} p={2} style={{ textAlign: 'center' }}>
            <h1>Tools</h1>
          </Box>

          <Box p={2}>
            <input ref={this.time} type="range" min="0" max="300" step="10" />
            <input ref={this.amount} type="range" min="0" max="1" step="0.1" />
            <textarea ref={this.text} />
            <Flex>
              <Box width={1 / 2} p={2}>
                <button onClick={this.generate}>Generate</button>
              </Box>
              <Box width={1 / 2} p={2}>
                <button onClick={this.stop}>STOP</button>
              </Box>
            </Flex>
          </Box>

          <Box width={1} p={2}>
            <div
              id="poem"
              style={{
                width,
                height,
                border: '1px solid #000',
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Box>

          <Box>
            {data &&
              Object.keys(data).map((x, i) => {
                const obj = data[x][0]
                return (
                  <Flex>
                    <Box width={1 / 2} key={i} p={2}>
                      <p>{obj.poem}</p>
                    </Box>
                    <Box width={1 / 2} key={i} p={2}>
                      <div dangerouslySetInnerHTML={{ __html: obj.html }} />
                    </Box>
                  </Flex>
                )
              })}
          </Box>

          <Box width={1 / 2} px={4}>
            <canvas style={{ visibility: 'hidden' }} ref={this.canvas} />
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default ToolsPage
