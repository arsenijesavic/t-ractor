import React, { Component } from "react"
import Layout from "../../components/layout"
import { Flex, Box } from "@rebass/grid"
import { Button, Modal } from "../../components"
import {
  // Life,
  Messages,
  TextInput,
  TypingIndicator,
} from "../../components/pages/chat"
import Sound from "react-sound"

import * as ml5 from "../../module/ml5"
//import database from '../../module/firebase'
import P5Wrapper from "react-p5-wrapper"
import sketch from "../../utils/sketch"
import getWidth from "../../utils/getWidth"
import getEmotions from "../../utils/getEmotions"

class IndexPage extends Component {
  state = {
    poemName: new Date().getTime(),
    count: 0,
    length: 100,
    temperature: 0.5,
    state: "LOADING",
    isBotWriting: false,
    ...this.props.location.state,
  }

  async componentDidMount() {
    this.lstm = ml5.charRNN("/models/data/", () => this.gameStart())
    //this.db = database.ref(`chats/${new Date().getTime()}`)
  }

  gameStart = () => {
    this.setState({
      messages: [],
      mood: null,
      txt: "",
      state: "READY",
    })
  }

  gameOver = async () => {
    const { messages } = this.state
    const text = messages.reduce((acc, msg) => msg.text + acc, "")
    const mood = await getEmotions({ text }).then(
      res => res.data.document_tone.tones,
    )
    this.setState({
      state: "GAME_OVER",
      text,
      mood,
    })
  }

  addMessage = async data => {
    const { count } = this.state
    if (count + 1 === 30) {
      this.gameOver()
      return
    }
    const mood = await getEmotions({ text: data.text }).then(
      res => res.data.document_tone.tones,
    )
    const message = {
      id: Math.floor(Math.random() * 1000),
      mood,
      ...data,
    }

    await this.setState(prevState => ({
      state: message.actor === "bot" ? "HUMAN" : "BOT",
      count: ++prevState.count,
      mood,
      messages: [
        ...(prevState.messages ? prevState.messages : []),
        { ...message },
      ],
    }))

    try {
      //await this.db.push().set(message)
    } catch (error) {
      console.error(error)
    }
  }

  createMessage = value => {
    const text = `${value.toLowerCase()}`
    // const isSwear = false //  swearjar.profane(text)
    // if (isSwear) {
    //   this.gameOver()
    //   return
    // }

    const { user } = this.state

    this.addMessage({
      actor: "human",
      user,
      username: `${user} t.ractor`,
      text: value,
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
      const index = result.sample.lastIndexOf(".")
      const text = `${result.sample.slice(0, index)}.`

      this.addMessage({ user: "T.Ractor", actor: "bot", text, state: "HUMAN" })
    })
  }

  handleSend = data => {
    const text = this.createMessage(data)
    this.createAnswer(text)
  }

  render() {
    const { messages, state, mood, count, poemName, user } = this.state

    return (
      <Layout title="Home">
        <Flex flexWrap="wrap">
          <Box width={getWidth(8)}>
            <Flex style={{ height: "100vh" }} flexDirection="column">
              <Box>
                {/* <Life
                  duration={config.timer * 1000}
                  active={state === "HUMAN"}
                  onDone={this.gameOver}
                /> */}
              </Box>
              <Box flex="1" style={{ height: "100%" }}>
                <Messages data={messages} />
              </Box>
              <Box flex="1" style={{ height: "100%" }}></Box>
              <Box>
                <TypingIndicator isTyping={state === "BOT"} />
              </Box>
              <Box>
                <TextInput onSend={this.handleSend} />
              </Box>
            </Flex>
          </Box>

          <Box width={getWidth(4)}>
            {[
              "01-anger-weak.mp3",
              "02-anger-strong.mp3",
              "03-fear-weak.mp3",
              "04-fear-strong.mp3",
              "06-sadness-strong.mp3",
              "07-joy-weak.mp3",
              "08-joy-strong.mp3",
              "10-analytical-strong.mp3",
              "11-confident-weak.mp3",
              "12-confident-strong.mp3",
              "13-tentative-weak.mp3",
              "14-tentative-strong.mp3",
            ].map(sound => (
              <Sound
                url={`/sounds/${sound}`}
                playStatus={
                  mood &&
                  mood.find(x => x.tone_id.includes(sound.split("-")[1]))
                    ? "PLAYING"
                    : "STOPED"
                }
                loop={
                  mood &&
                  mood.find(x => x.tone_id.includes(sound.split("-")[1]))
                    ? true
                    : false
                }
                autoLoad={true}
                // onLoading={this.handleSongLoading}
                // onPlaying={this.handleSongPlaying}
                // onFinishedPlaying={this.handleSongFinishedPlaying}
              />
            ))}
            <Box>
              <P5Wrapper mood={mood && mood} sketch={sketch}></P5Wrapper>
            </Box>

            <h3>Count {count}</h3>
            <h3>Mood</h3>
            <Flex flexDirection="column">
              <Box flex="1" style={{ height: "400px" }}>
                <ul style={{ margin: "0", padding: "0" }}>
                  {mood &&
                    mood.map((x, i) => (
                      <li
                        key={i}
                        style={{
                          margin: "1em 0",
                          padding: "0",
                          listStyle: "none",
                        }}
                      >
                        {x.tone_name} : {x.score}
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

        <Modal isOpen={state === "GAME_OVER"}>
          <div style={{ background: "white", padding: "2em" }}>
            <h4>{poemName}</h4>
            <h1> {user && user.toUpperCase()} T-Ractor</h1>
            <Box>
              <P5Wrapper
                mood={mood && mood}
                isOver={true}
                sketch={sketch}
              ></P5Wrapper>
            </Box>
            {/* <div style={{ padding: "2em" }}>
              {messages && messages.map((v, i) => <p key={i}>{v.text}</p>)}
            </div> */}
            <button onClick={this.gameStart}>Create new poem</button>
          </div>
        </Modal>
      </Layout>
    )
  }
}

export default IndexPage
