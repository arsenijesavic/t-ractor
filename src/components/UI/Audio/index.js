import { useEffect, useState } from "react"
import Pizzicato from "pizzicato"
// import { useTween } from "react-use"
import { useDeepCompareEffect } from "react-use"

const Audio = ({
  src = "",
  volume = 0,
  loop = true,
  status = "PLAYING",
  currentTime = 0,
}) => {
  const [sound, setSound] = useState({})
  useDeepCompareEffect(() => {
    if (sound) {
      console.log("CHANING VOLUME", volume)
      sound.volume = volume
    }
  }, [sound, volume])

  useEffect(() => {
    const _config = {
      source: "file",
      options: {
        path: src,
        loop,
      },
    }

    var reverb = new Pizzicato.Effects.Reverb({
      time: 10.01,
      decay: 0.01,
      reverse: false,
      mix: 0.5,
    })

    const _sound = new Pizzicato.Sound(_config, () => {
      _sound.play()
      _sound.volume = 0
      _sound.addEffect(reverb)
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
