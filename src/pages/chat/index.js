import React, { useEffect, useRef, useState } from "react"

import { useMachine } from "@xstate/react"
import { Machine, assign } from "xstate"

import later from "@utils/later"
import getEmotions from "@utils/getEmotions"
import * as ml5 from "@module/ml5"
import { savePoem } from "@module/firebase"

import NewWindow from "react-new-window"
import P5Wrapper from "react-p5-wrapper"
import sketch from "@module/sketch"

import Typist from "react-typist"

import styled, { keyframes } from "styled-components"
import Layout from "@components/layout"
import { Audio, Input, Modal } from "@components"
import {
  Header,
  Messages,
  TextInput,
  TypingIndicator,
} from "@components/pages/chat"

//CONSTANTS
const DEBUG = false
const NOT_SSR = typeof window !== "undefined"
const GAME_DURATION = 30 * 1000 // 30 seconds
const TOTAL_NUMBER_OF_MESSAGES = 15

const sounds = [
  { name: "_", src: "tractor_organ_drone.mp3", volume: 1, loop: true },
  { name: "anger", src: "tractor_01_anger_weak.mp3", volume: 1 },
  { name: "fear", src: "tractor_03_fear_weak.mp3", volume: 1 },
  { name: "sadness", src: "tractor_05_sadness_weak.mp3", volume: 1 },
  { name: "joy", src: "tractor_07_joy_weak.mp3", volume: 1 },
  { name: "confident", src: "tractor_09_analytical_weak.mp3", volume: 1 },
  { name: "tentative", src: "tractor_13_tentative_weak.mp3", volume: 1 },
]

const ChatPage = props => {
  const { state } = props.location && props.location
  const [current, transition] = useMachine(gameMachine, gameStateActions(state))
  const GAME_STATE = current.value
  const data = current.context
  const { messages, user } = data

  const windowRef = useRef()

  const handleKeyDown = e => {
    if (["INSTRUCTIONS", "GAME_OVER"].some(gs => gs === GAME_STATE)) {
      transition("NEXT")
    }
  }

  const mood = data.mood
    ? data.mood
    : messages && messages.length > 0 && messages[messages.length - 1].mood

  if (messages.length === TOTAL_NUMBER_OF_MESSAGES) {
    transition("GAME_OVER")
  }

  const soundsVolumeSelector = (data, mood) =>
    data.map(x => {
      const moodForEmotion = mood && mood.find(v => v.tone_id === x.name)

      return {
        ...x,
        //volume: moodForEmotion ? moodForEmotion.score : x.name === "_" ? 1 : 0,
        loop: GAME_STATE === "GAME_OVER" ? true : false,
        status: moodForEmotion
          ? "PLAYING"
          : x.name === "_"
          ? "PLAYING"
          : "STOPED",
      }
    })

  const soundsWithVolume = soundsVolumeSelector(sounds, mood)

  if (DEBUG) {
    console.log("GAME STATE ::::", GAME_STATE)
    console.log("MOOD ::::", mood)
    console.log("DATA ::::", data)
  }

  return (
    <Layout title="home" navigation={false} onKeyDown={handleKeyDown}>
      <State current={GAME_STATE} active="INSTRUCTIONS">
        <Instructions />
      </State>

      <State current={GAME_STATE} active="GAME_INIT">
        <div
          style={{
            minHeight: "100vh",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CreatePoemForm onSubmit={data => transition("NEXT", { data })} />
        </div>
      </State>

      <>
        {/* MAIN WINDOW */}
        <Wrap>
          <Header
            total={TOTAL_NUMBER_OF_MESSAGES}
            count={messages.length}
            duration={GAME_DURATION}
            active={GAME_STATE === "HUMAN"}
            reset={GAME_STATE === "HUMAN"}
            onTimeExpire={() => transition("GAME_OVER")}
          />
          <Messages data={messages} />
          <TypingIndicator isTyping={GAME_STATE === "BOT"} />
          <TextInput
            focused={GAME_STATE === "HUMAN"}
            disabled={GAME_STATE === "BOT"}
            onSubmit={data => transition("NEXT", { data })}
          />
        </Wrap>

        {NOT_SSR && (
          <NewWindow ref={windowRef} title="VISUAL">
            <P5Wrapper
              windowRef={windowRef && windowRef.current && windowRef.current}
              isOver={GAME_STATE === "GAME_OVER"}
              reset={GAME_STATE === "GAME_INIT"}
              mood={mood && mood}
              sketch={sketch}
            />
          </NewWindow>
        )}

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
              minHeight: "100vh",
              padding: "1em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>{user && user.toUpperCase()} T-Ractor</h2>
            <h5 style={{ fontStyle: "italic", fontWeight: "100" }}>
              by {user}
            </h5>
            <div style={{ flex: "1 0 auto" }}>
              {messages &&
                messages.length > 0 &&
                messages.map((v, i) => <p key={i}>{v.text}</p>)}
            </div>

            <BlinkText>Press enter to start</BlinkText>
          </div>
        </Modal>
      </State>
    </Layout>
  )
}

const mergeState = assign((state, action) => ({
  ...state,
  ...action.data,
}))

const gameMachine = Machine({
  id: "game",
  initial: "LOADING",

  context: {
    mood: null,
    messages: [],
  },

  states: {
    LOADING: {
      invoke: {
        src: "loadAssets",
        onDone: {
          target: "INSTRUCTIONS",
          actions: mergeState,
        },
        onError: {},
      },
    },

    INSTRUCTIONS: {
      on: { NEXT: "GAME_INIT" },
    },

    GAME_INIT: {
      exit: "initGame",
      on: {
        NEXT: "HUMAN",
      },
      // invoke: {
      //   src: "initGame",
      //   onDone: {
      //     //target: "HUMAN",
      //     actions: mergeState,
      //   },
      //   onError: {},
      // },
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
        NEXT: "INSTRUCTIONS",
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
    initGame: assign((state, action) => {
      const { user } = action.data
      return { ...state, ...props, user, messages: [], mood: null }
    }),

    createMessage: assign((state, action) => {
      const text = `${action.data}`
      const user = `${state.user} t.ractor`

      if (text === "undefined")
        return {
          ...state,
        }

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
  },

  services: {
    loadAssets: async (state, action) => {
      const lstm = await ml5.charRNN("/models/data/")
      return Promise.resolve({ ...state, lstm })
    },

    // initGame: async (state, action) => {
    //   return Promise.resolve({ ...state, ...props, messages: [], mood: null })
    // },

    gameOver: async ({ messages }, action) => {
      const id = String(Math.random())
        .split(".")
        .pop()
      console.log(id)
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
        temperature: 0.5,
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

export default ChatPage

const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  min-height: 100vh;
  max-height: 100vh;
`

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
const BlinkText = styled.h5`
  font-weight: 100;
  text-transform: uppercase;
  animation: ${blink} 0.6s ease-in infinite;
`

const State = ({ current, active, children }) =>
  current === active ? children : null

const Instructions = () => {
  const [isDone, setDone] = useState(false)
  return (
    <Modal isOpen={true}>
      <div
        style={{
          minHeight: "100vh",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typist
          cursor={{
            show: false,
            blink: true,
            element: "|",
            hideWhenDone: true,
            hideWhenDoneDelay: 1000,
          }}
          onTypingDone={() => setDone(true)}
        >
          <p style={{ textAlign: "center" }}>👋</p>
          <p style={{ textAlign: "center" }}>Hi, I’m T.Ractor. 🤖</p>
          <p style={{ textAlign: "center" }}>Nice to meet you.</p>
          <p style={{ textAlign: "center" }}>
            Make together with me, line by line EveryDayLifePoetry.
          </p>
          <p style={{ textAlign: "center" }}>
            We have 60 seconds per line and 15 lines in total for our poem. ⏳📝
          </p>
        </Typist>

        {isDone && <BlinkText>Press enter to start</BlinkText>}
        {/*
    <p>By using our site you agree to the following terms of service.</p> */}
      </div>
    </Modal>
  )
}

const CreatePoemForm = ({ onSubmit }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef])

  const handleSubmit = e => {
    e.preventDefault()
    if (inputRef.current.value !== "") {
      onSubmit({
        user: inputRef.current.value,
      })
    }
  }

  return (
    <form
      style={{
        minHeight: "100vh",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleSubmit}
    >
      <label style={{ textAlign: "center" }} htmlFor="user">
        Type your name and press enter to start
      </label>
      <Input ref={inputRef} name="user" style={{ textAlign: "center" }} />
    </form>
  )
}
