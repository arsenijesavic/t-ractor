import { useEffect, useState } from "react"
import Pizzicato from "pizzicato"
// import { useTween } from "react-use"
import { useDeepCompareEffect } from "react-use"

const Audio = ({ src = "", volume, loop, status, currentTime = 0 }) => {
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

      // sound.volume = volume
    }
  }, [sound, status])

  // useDeepCompareEffect(() => {
  //   if (sound) {
  //     console.log("CHANING VOLUME", volume)
  //     sound.volume = volume
  //   }
  // }, [sound, volume])

  useEffect(() => {
    const _config = {
      source: "file",
      options: {
        path: src,
        loop,
        attack: 5,
        release: 50,
      },
    }

    // var reverb = new Pizzicato.Effects.Reverb({
    //   time: 10.01,
    //   decay: 5.01,
    //   reverse: false,
    //   mix: 0.5,
    // })

    const _sound = new Pizzicato.Sound(_config, () => {
      // _sound.play()
      _sound.volume = 1
      // _sound.addEffect(reverb)
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
