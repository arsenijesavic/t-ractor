import React, { Component } from 'react'

import Layout from '../../components/layout'
import { Flex, Box } from '@rebass/grid'
import { Button, Modal } from '../../components'
import {
  Life,
  Messages,
  TextInput,
  TypingIndicator,
} from '../../components/pages/chat'

import * as ml5 from '../../module/ml5'
import database from '../../module/firebase'

import getWidth from '../../utils/getWidth'
import getEmotions from '../../utils/getEmotions'
import swearjar from 'swearjar'

class IndexPage extends Component {
  state = {
    length: 100,
    temperature: 0.5,
    state: 'LOADING',
    isBotWriting: false,
    config: {
      ...this.props.location.state,
    },
  }

  componentDidMount() {
    this.lstm = ml5.charRNN('/models/data/', () => this.gameStart())
    this.db = database.ref(`chats/${new Date().getTime()}`)
  }

  gameStart = () => {
    this.setState({
      messages: [],
      mood: null,
      txt: '',
      state: 'READY',
    })
  }

  gameOver = () => {
    const { messages } = this.state
    const text = messages.reduce((acc, msg) => msg.text + acc, '')
    //const mood = await getEmotions({ text })

    this.setState({
      state: 'GAME_OVER',
      text,
      //mood,
    })
  }

  addMessage = async data => {
    const mood = await getEmotions({ text: data.text })

    const message = {
      id: Math.floor(Math.random() * 1000),
      mood,
      ...data,
    }

    await this.setState(prevState => ({
      state: message.user === 'bot' ? 'HUMAN' : 'BOT',
      mood,
      messages: [
        ...(prevState.messages ? prevState.messages : []),
        { ...message },
      ],
    }))

    try {
      await this.db.push().set(message)
    } catch (error) {
      console.error(error)
    }
  }

  createMessage = value => {
    const text = `${value.toLowerCase()}`
    const isSwear = swearjar.profane(text)
    if (isSwear) {
      this.gameOver()
      return
    }

    const { user } = this.props.location.state

    this.addMessage({
      user: 'human',
      username: `${user} t.ractor`,
      text,
    })

    return text
  }

  createAnswer = txt => {
    const data = {
      seed: `${txt}.`,
      temperature: this.state.temperature,
      length: this.state.length,
    }

    this.lstm.generate(data, async (err, result) => {
      const index = result.sample.lastIndexOf('.')
      const text = `${result.sample.slice(0, index)}.`

      this.addMessage({ user: 'bot', text })
    })
  }

  handleSend = data => {
    const text = this.createMessage(data)
    this.createAnswer(text)
  }

  render() {
    const { messages, state, mood, config } = this.state

    return (
      <Layout title="Home">
        <Flex flexWrap="wrap">
          <Box width={getWidth(8)}>
            <Flex style={{ height: '100vh' }} flexDirection="column">
              <Box>
                <Life
                  duration={config.timer * 1000}
                  active={state === 'HUMAN'}
                  onDone={this.gameOver}
                />
              </Box>
              <Box flex="1" style={{ height: '100%' }}>
                <Messages data={messages} />
              </Box>
              <Box>
                <TypingIndicator isTyping={state === 'BOT'} />
              </Box>
              <Box>
                <TextInput onSend={this.handleSend} />
              </Box>
            </Flex>
          </Box>

          <Box width={getWidth(4)}>
            <h3>Mood</h3>
            <Flex flexDirection="column">
              <Box flex="1">
                <ul style={{ margin: '0', padding: '0' }}>
                  {mood &&
                    mood.emotions.map((e, i) => (
                      <li
                        key={i}
                        style={{
                          margin: '1em 0',
                          padding: '0',
                          listStyle: 'none',
                        }}
                      >
                        {e.dimension.replace('1D', '').toUpperCase()}:{e.score}
                      </li>
                    ))}
                </ul>
              </Box>
              <Box>
                <Button onClick={this.gameOver}>End poem</Button>
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Modal isOpen={state === 'GAME_OVER'}>
          <div style={{ background: 'white', padding: '2em' }}>
            <h1>Poem Over</h1>
            <div style={{ padding: '2em' }}>
              {messages && messages.map((v, i) => <p key={i}>{v.text}</p>)}
            </div>
            <button onClick={this.gameStart}>Create new poem</button>
          </div>
        </Modal>
      </Layout>
    )
  }
}

export default IndexPage
