var firebase = require('firebase')

const config = {
  apiKey: 'AIzaSyB5TGeYQ7turZYzBBNZRBEDg3wwkODtcVM',
  authDomain: 't-ractor.firebaseapp.com',
  databaseURL: 'https://t-ractor.firebaseio.com',
  projectId: 't-ractor',
  storageBucket: 't-ractor.appspot.com',
  messagingSenderId: '431936540509',
}

if (typeof window !== 'undefined') firebase.initializeApp(config)

const database = typeof window !== 'undefined' ? firebase.database() : null

const parseChat = data =>
  Object.keys(data).reduce((result, v) => {
    result[v] = Object.keys(data[v]).map(j => data[v][j])
    return result
  }, {})

const getPoems = () =>
  new Promise((resolve, reject) => {
    database.ref('chats').once('value', r => {
      const data = r.val()
      if (data) {
        const chats = parseChat(data)
        resolve(chats)
      }
    })
  })

const getViz = () =>
  new Promise((resolve, reject) => {
    database.ref('viz').once('value', r => {
      const data = r.val()
      if (data) {
        const chats = parseChat(data)
        resolve(chats)
      }
    })
  })

const saveMessage = message => {
  const chat = database.ref(`chats/${new Date().getTime()}`)
  chat.push().set(message)
}

export default database
export { getPoems, getViz, saveMessage }
