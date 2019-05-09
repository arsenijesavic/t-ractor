import React, { Component } from 'react'

import { Flex, Box } from '@rebass/grid'
import Layout from '../../components/layout'

import drawMultilineText from 'canvas-multiline-text'

const width = 595
const height = 842

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

  generate = () => {
    this.interval = setInterval(this.change, this.time.current.value)
  }

  stop = () => {
    clearInterval(this.interval)

    var image = this.canvas.current
      .toDataURL('image/png', 1.0)
      .replace('image/png', 'image/octet-stream')
    var link = document.createElement('a')
    link.download = 'my-image.png'
    link.href = image
    link.click()
  }

  random = () => {
    return this.text.current.value
      .split(' ')
      .map(w => {
        if (Math.random() < this.amount.current.value)
          return w
            .split('')
            .map(x => (x === '\n' ? '\n' : '▇'))
            .join('')
        else return w
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
      font: 'Merriweather',
      verbose: true,
      lineHeight: 1.4,
      minFontSize: 12,
    })
  }

  render() {
    const { text } = this.state

    return (
      <Layout on>
        <Flex flexWrap="wrap" flexDirection="column">
          <Box width={1} p={2} style={{ textAlign: 'center' }}>
            <h1>Tools</h1>
          </Box>

          <Box>
            <input ref={this.time} type="range" min="0" max="300" step="10" />
            <input ref={this.amount} type="range" min="0" max="1" step="0.1" />
            <input ref={this.text} type="textarea" />
            <button onClick={this.generate}>Generate</button>
            <button onClick={this.stop}>STOP</button>
          </Box>

          <Box width={1 / 2} px={4}>
            <canvas ref={this.canvas} />
          </Box>
          <Box width={1 / 2} px={4}>
            <p style={{ width, height }}>{text}</p>
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default ToolsPage
