import axios from "axios"

export default ({ text }) =>
  axios
    .post("/.netlify/functions/tones", { text })
    .then(res => res.data)
    .then(res => res.data.document_tone.tones)
