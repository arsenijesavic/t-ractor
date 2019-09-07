const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3")
const toneAnalyzer = new ToneAnalyzerV3({
  iam_apikey: "_ucFAj6PfDaHo9WccNESt_qtvJCYolce9TsthnvBO8yu",
  url: "https://gateway-lon.watsonplatform.net/tone-analyzer/api",
  version: "2017-09-21",
})

export function handler(event, context, callback) {
  const { text } = JSON.parse(event.body)
  toneAnalyzer.tone({ tone_input: { text } }, (err, data) => {
    if (err) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ err }),
      })
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ data }),
    })
  })
}
