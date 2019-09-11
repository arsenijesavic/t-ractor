import { useEffect, useState } from "react"
import Pizzicato from "pizzicato"

const Audio = ({ src, volume, loop, status }) => {
  const [sound, setSound] = useState(null)

  //INIT SOUND
  useEffect(() => {
    const _config = {
      source: "file",
      options: {
        path: src,
        //loop,
        attack: 10,
        release: 10,
      },
    }

    const _sound = new Pizzicato.Sound(_config, () => {
      // var highPassFilter = new Pizzicato.Effects.HighPassFilter({
      //   frequency: 10000,
      //   peak: 10,
      // })

      var reverb = new Pizzicato.Effects.Reverb({
        time: 5,
        decay: 0.01,
        reverse: true,
        mix: 0.5,
      })
      // _sound.addEffect(highPassFilter)
      _sound.addEffect(reverb)

      setSound(_sound)
    })
  }, [src, volume, loop, status])

  //CHANGE STATUS BASED ON PROPS
  useEffect(() => {
    if (sound) {
      switch (status) {
        case "PLAYING":
          // sound.loop = true
          sound.play()
          return

        case "STOPPED":
          // sound.loop = false
          sound.stop()
          return

        default:
          break
      }
    }
  }, [sound, status])

  return null
}

export default Audio
