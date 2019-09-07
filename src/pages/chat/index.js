import React from "react"
import { useMachine } from "@xstate/react"
import { Machine, assign } from "xstate"
import * as ml5 from "../../module/ml5"
import getEmotions from "@utils/getEmotions"
import { savePoem } from "../../module/firebase"
// import { Spring } from "react-spring/renderprops"
import NewWindow from "react-new-window"
import sketch from "../../module/sketch"
import P5Wrapper from "react-p5-wrapper"

import styled from "styled-components"
import Layout from "../../components/layout"
import { Modal, Button } from "@components"
import {
  Header,
  Messages,
  TextInput,
  TypingIndicator,
} from "@components/pages/chat"

const GAME_DURATION = 10 * 1000

const ChatPage = props => {
  const { state } = props.location && props.location
  const [current, transition] = useMachine(gameMachine, gameStateActions(state))
  const GAME_STATE = current.value
  const data = current.context
  const { messages, user } = data
  const mood = data.mood
    ? data.mood
    : messages.length > 0 && messages[messages.length - 1].mood
  console.log("GAME STATE:::", GAME_STATE)

  return (
    <Layout title="home" navigation={false}>
         
      <Wrap>
        <Header
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
      <Modal isOpen={GAME_STATE === "READY"}>
        <div style={{ background: "white", padding: "2em" }}>
          <div>
            <p>The Game is played in a series of rounds.</p>
            <p> During each round, players can do x, y or z.</p>
          </div>
          <Button onClick={data => transition("NEXT")}>START GAME</Button>
        </div>
      </Modal>
      <Modal isOpen={GAME_STATE === "GAME_OVER"}>
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
            {messages.length > 0 &&
              messages.map((v, i) => <p key={i}>{v.text}</p>)}
          </div>
          <Button onClick={data => transition("START_GAME")}>
            Create new poem
          </Button>
        </div>
      </Modal>
      {typeof window !== "undefined" && (
        <NewWindow title="viz">
          <P5Wrapper
            isOver={GAME_STATE === "GAME_OVER"}
            reset={GAME_STATE === "GAME_INIT"}
            mood={mood && mood}
            sketch={sketch}
          />
        </NewWindow>
      )}
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
    // LOADING: {
    //   entry: "notifySuccess",

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
      const seed = `${messages[messages.length - 1].text}`
      const result = await lstm.generate({
        seed,
        length: 50,
        temperature: 0.9,
      })

      const index = result.sample.lastIndexOf(".")
      const text = `${result.sample.slice(0, index)}.`

      const mood = await getEmotions({ text })
      const message = { actor: "bot", user: "T.Ractor", text, mood }
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
