import axios from 'axios'

export default ({ text }) =>
  axios
    .post(
      'https://private-anon-3589b9e174-theysay.apiary-mock.com/v1/emotion/bands',
      {
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT',
          'Access-Control-Max-Age': 10,
          'x-apiary-transaction-id': '5c81024ac7dc210a0052e6f7',
        },
      }
    )
    .then(res => res.data)
    .catch(console.log)
