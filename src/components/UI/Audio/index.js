import { useEffect, useState } from "react"
import Pizzicato from "pizzicato"
import { useDeepCompareEffect } from "react-use"

const Audio = ({ src, volume, loop, status }) => {
  const [sound, setSound] = useState(null)

  useDeepCompareEffect(() => {
    if (sound) {
      console.log("CHANING STATUS", status)

      if (status === "PLAYING") {
        // sound.loop = true
        sound.play()
      } else if (status === "STOPPED") {
        // sound.loop = false
        sound.stop()
      }
    }
  }, [sound, status])

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
      _sound.volume = 1
      setSound(_sound)
    })
  }, [src, loop])

  return null
}

export default Audio

// useDeepCompareEffect(() => {
//   if (sound) {
//     switch (status) {
//       case "PLAYING":
//         return
//       case "PAUSE":
//         // sound.pause()
//         return

//       default:
//         break
//     }
//   }
// }, [sound])

// useDeepCompareEffect(() => {
//   if (sound) {
//     console.log("CHANGING VOLUME TO", volume)
//     sound.volume = volume
//     // if (volume) {
//     // } else {
//     //   sound.volume = 0
//     // }
//   }
// }, [sound, volume])
