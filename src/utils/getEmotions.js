import axios from 'axios'

export default ({ text }) =>
  axios
    .post(` https://scrape-theysay.herokuapp.com/`, { text })
    .then(res => res.data)
