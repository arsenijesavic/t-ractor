import firebase from "firebase/app"
import "firebase/database"

const config = {
  apiKey: "AIzaSyB5TGeYQ7turZYzBBNZRBEDg3wwkODtcVM",
  authDomain: "t-ractor.firebaseapp.com",
  databaseURL: "https://t-ractor.firebaseio.com",
  projectId: "t-ractor",
  storageBucket: "t-ractor.appspot.com",
  messagingSenderId: "431936540509",
}

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = typeof window !== "undefined" ? firebase.database() : null

const parseChat = data =>
  Object.keys(data).reduce((result, v) => {
    result[v] = Object.keys(data[v]).map(j => data[v][j])
    return result
  }, {})

const getViz = () =>
  new Promise((resolve, reject) => {
    db.ref("viz").once("value", r => {
      const data = r.val()
      if (data) {
        const chats = parseChat(data)
        resolve(chats)
      }
    })
  })

const getPoems = () =>
  new Promise((resolve, reject) => {
    db.ref("chats").once("value", r => {
      const data = r.val()
      if (data) {
        const chats = parseChat(data)
        resolve(chats)
      } else {
        resolve([])
      }
    })
  })

const savePoem = ({ id, messages }) => {
  return db.ref(`chats/${id}`).set(messages)
}

const saveMessage = ({ id, message }) => {
  const chat = db.ref(`chats/${id}`)
  chat.push().set(message)
}

export default db
export { getViz, getPoems, savePoem, saveMessage }
