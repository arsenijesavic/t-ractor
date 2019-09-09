import { useEffect, useState } from "react"
import { useDeepCompareEffect } from "react-use"
import Pizzicato from "pizzicato"

const Audio = ({ src, volume, loop, status }) => {
  const [sound, setSound] = useState(null)

  //INIT SOUND
  useEffect(() => {
    const _config = {
      source: "file",
      options: {
        path: src,
        loop,
        attack: 10,
        release: 10,
      },
    }

    const _sound = new Pizzicato.Sound(_config, () => {
      setSound(_sound)
    })
  }, [src, volume, loop, status])

  //CHANGE STATUS BASED ON PROPS
  useDeepCompareEffect(() => {
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
