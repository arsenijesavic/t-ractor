import React from "react"

import { useMachine } from "@xstate/react"
import { Machine, assign } from "xstate"

import later from "@utils/later"
import getEmotions from "@utils/getEmotions"
import * as ml5 from "@module/ml5"
import { savePoem } from "@module/firebase"

// import NewWindow from "react-new-window"
// import P5Wrapper from "react-p5-wrapper"
// import sketch from "@module/sketch"

import styled from "styled-components"
import Layout from "@components/layout"
import { Audio, Modal, Button } from "@components"
import {
  Header,
  Messages,
  TextInput,
  TypingIndicator,
} from "@components/pages/chat"

const _sounds = [
  { name: "_", src: "tractor_organ_drone.mp3", volume: 1, loop: true },
  { name: "anger", src: "tractor_01_anger_weak.mp3", volume: 1 },
  { name: "fear", src: "tractor_03_fear_weak.mp3", volume: 1 },
  { name: "sadness", src: "tractor_05_sadness_weak.mp3", volume: 1 },
  { name: "joy", src: "tractor_07_joy_weak.mp3", volume: 1 },
  { name: "confident", src: "tractor_09_analytical_weak.mp3", volume: 1 },
  { name: "tentative", src: "tractor_13_tentative_weak.mp3", volume: 1 },
]

//CONSTANTS
const DEBUG = false
// const NOT_SSR = typeof window !== "undefined"
const GAME_DURATION = 30 * 1000 // 30 seconds

const ChatPage = props => {
  const { state } = props.location && props.location
  const [current, transition] = useMachine(gameMachine, gameStateActions(state))
  const GAME_STATE = current.value
  const data = current.context
  const { messages, user } = data
  const mood = data.mood
    ? data.mood
    : messages && messages.length > 0 && messages[messages.length - 1].mood

  const soundsVolumeSelector = (data, mood) =>
    data.map(x => {
      const moodForEmotion = mood && mood.find(v => v.tone_id === x.name)

      return {
        ...x,
        //volume: moodForEmotion ? moodForEmotion.score : x.name === "_" ? 1 : 0,
        status: moodForEmotion
          ? "PLAYING"
          : x.name === "_"
          ? "PLAYING"
          : "STOPED",
        // volume:1,
      }
    })

  const soundsWithVolume = soundsVolumeSelector(_sounds, mood)

  // if (!state && NOT_SSR) {
  //   props.navigate("/")
  //   return null
  // }

  if (DEBUG) {
    console.log("GAME STATE:::", GAME_STATE)
    console.log("MOOD:::", mood)
    console.log("DATA:::", data)
  }

  return (
    <Layout title="home" navigation={false}>
      {/* <Sketch /> */}
      <State current={GAME_STATE} active="READY">
        <Modal isOpen={true}>
          <div style={{ background: "white", padding: "2em" }}>
            <div onKeyDown={data => transition("NEXT")}>
              <p>The Game is played in a series of rounds.</p>
              <p> During each round, players can do x, y or z.</p>
            </div>
            <Button onClick={data => transition("NEXT")}>START GAME</Button>
          </div>
        </Modal>
      </State>
          
      <>
        <Wrap>
          <Header
            count={messages.length}
            duration={GAME_DURATION}
            active={GAME_STATE === "HUMAN"}
            reset={GAME_STATE === "HUMAN"}
            // onTimeExpire={() => transition("GAME_OVER")}
          />
          <Messages data={messages} />
          <TypingIndicator isTyping={GAME_STATE === "BOT"} />
          <TextInput
            focused={GAME_STATE === "HUMAN"}
            disabled={GAME_STATE === "BOT"}
            onSubmit={data => transition("NEXT", { data })}
          />
        </Wrap>

        {/*
        <NewWindow title="viz">
          <P5Wrapper
            isOver={GAME_STATE === "GAME_OVER"}
            reset={GAME_STATE === "GAME_INIT"}
            mood={mood && mood}
            sketch={sketch}
          />
        </NewWindow> */}

        {soundsWithVolume.map((sound, i) => (
          <Audio
            key={i}
            src={`/sounds/${sound.src}`}
            loop={sound.loop}
            status={sound.status}
            volume={sound.volume}
          />
        ))}
      </>
      <State current={GAME_STATE} active="GAME_OVER">
        <Modal isOpen={true}>
          <div
            style={{
              height: "100vh",
              padding: "2em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1>{user && user.toUpperCase()} T-Ractor</h1>
            <div style={{ flex: "1 0 auto" }}>
              {messages &&
                messages.length > 0 &&
                messages.map((v, i) => <p key={i}>{v.text}</p>)}
            </div>
            <Button onClick={data => transition("START_GAME")}>
              Create new poem
            </Button>
          </div>
        </Modal>
      </State>
    </Layout>
  )
}

const gameMachine = Machine({
  id: "game",
  initial: "LOADING",
  context: {
    id: String(Math.random())
      .split(".")
      .pop(),
    messages: [],
  },
  states: {
    LOADING: {
      invoke: {
        src: "loadAssets",
        onDone: {
          target: "READY",
          actions: assign((state, action) => ({
            ...state,
            ...action.data,
          })),
        },

        onError: {
          target: "LOADING",
          // actions: assign({
          //   error: (_, event) => event.data,
          // }),
        },
      },
    },

    READY: {
      on: { NEXT: "GAME_INIT" },
    },

    GAME_INIT: {
      invoke: {
        src: "initGame",
        onDone: {
          target: "HUMAN",
          actions: assign((state, action) => ({
            ...state,
            ...action.data,
          })),
        },
        // onError: {
        //   target: "BOT",
        //   actions: assign({
        //     error: (_, event) => event.data,
        //   }),
        // },
      },
    },

    HUMAN: {
      exit: "createMessage",
      on: {
        NEXT: "ANALYSE_MOOD",
        GAME_OVER: "GAME_OVER",
      },
    },

    GAME_OVER: {
      on: {
        START_GAME: "GAME_INIT",
      },

      invoke: {
        src: "gameOver",
        onDone: {
          // target: "BOT",
          actions: assign((state, action) => ({
            ...state,
            ...action.data,
          })),
        },
        // onError: {
        //   target: "BOT",
        //   actions: assign({
        //     error: (_, event) => event.data,
        //   }),
        // },
      },
    },

    ANALYSE_MOOD: {
      invoke: {
        src: "analyseMood",
        onDone: {
          target: "BOT",
          actions: assign((state, action) => ({
            ...state,
            ...action.data,
          })),
        },
        // onError: {
        //   target: "BOT",
        //   actions: assign({
        //     error: (_, event) => event.data,
        //   }),
        // },
      },
    },

    BOT: {
      invoke: {
        src: "createAnswer",
        onDone: {
          target: "HUMAN",
          actions: assign((state, action) => ({
            ...state,
            ...action.data,
          })),
        },
        // onError: {
        //   target: "LOADING",
        //   actions: assign({
        //     error: (_, event) => event.data,
        //   }),
        // },
      },
    },
  },
})

const gameStateActions = props => ({
  actions: {
    createMessage: assign((state, action) => {
      const text = `${action.data}`
      const user = `${state.user} t.ractor`

      const message = {
        actor: "human",
        text,
        user,
      }
      return {
        ...state,
        messages: [...state.messages, message],
      }
    }),

    createAnswer: () => {},
  },

  services: {
    loadAssets: async (state, action) => {
      const lstm = await ml5.charRNN("/models/data/")
      return Promise.resolve({ ...state, lstm })
    },

    initGame: async (state, action) => {
      return Promise.resolve({ ...state, ...props, messages: [], mood: null })
    },

    gameOver: async ({ id, messages }, action) => {
      await savePoem({ id, messages })
      const text = messages.reduce((acc, msg) => msg.text + acc, "")
      const mood = await getEmotions({ text })
      return Promise.resolve({
        mood,
      })
    },

    analyseMood: async (state, action) => {
      const text = `${action.data}`
      const mood = await getEmotions({ text })
      return Promise.resolve({
        ...state,
        messages: state.messages.map(x =>
          x.text === text ? { ...x, mood } : x,
        ),
      })
    },

    createAnswer: async (state, action) => {
      const { lstm, messages } = state
      const seed = `${messages[messages.length - 1].text}.`
      const result = await lstm.generate({
        seed,
        length: 100,
        temperature: 0.3,
      })

      const index = result.sample.lastIndexOf(".")
      const text = `${result.sample.slice(0, index)}.`

      const mood = await getEmotions({ text })
      const message = { actor: "bot", user: "T.Ractor", text, mood }

      await later(5000)
      return Promise.resolve({
        ...state,
        messages: [...state.messages, message],
      })
    },
  },
})

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  min-height: 100vh;
  max-height: 100vh;
`

export default ChatPage

const State = ({ current, active, children }) =>
  current === active ? children : null

// import React, { useRef, useEffect, useState } from "react"
// const Sketch = () => {
//   const canvasRef = useRef()
//   const [points, setPoint] = useState([])
//   useEffect(draw, [points])

//   function onMouseClick(e) {
//     const canvas = canvasRef.current
//     const rect = canvas.getBoundingClientRect()
//     const pos = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     }

//     setPoint([...points, pos])
//   }

//   function draw() {
//     console.log(points)
//     const canvas = canvasRef.current
//     const ctx = canvasRef.current.getContext("2d")
//     // ctx.clearRect(0, 0, canvas.width, canvas.height)
//     // ctx.globalCompositeOperation = "source-over"

//     // ctx.arc(50, 50, 50, 0, Math.PI * 2)
//     // ctx.arc(140, 50, 50, 0, Math.PI * 2)
//     //points.map(p => ctx.lineTo(p.x, p.y))
//     points.forEach(p => {
//       ctx.beginPath()
//       // ctx.moveTo(0, 0)
//       // ctx.lineTo(p.x, p.y)
//       ctx.arc(p.x, p.y, 100, 0, Math.PI * 2)
//       ctx.closePath()
//     })
//     // ctx.clip()
//     ctx.stroke()

//     // ctx.fillStyle = "red"
//     // ctx.fillRect(0, 0, canvas.width, canvas.height)

//     // ctx.beginPath()
//     // ctx.rect(0, 0, canvas.width, canvas.height)

//     // ctx.restore()

//     // points.forEach(p => {
//     //   ctx.save()
//     //   ctx.beginPath()
//     //   ctx.arc(p.x, p.y, 100, 0, Math.PI * 2)
//     //   ctx.clip()
//     //   // ctx.strokeStyle = "black"
//     //   // ctx.stroke()
//     //   ctx.restore()
//     // })

//     //SKETCH GOES HERE
//   }

//   return (
//     <canvas ref={canvasRef} width={500} height={500} onClick={onMouseClick} />
//   )
// }
