// export default () => true

let splatters = []
export default function sketch(p) {
  if (typeof window === undefined) return null
  let baseColor
  let clearBackground = false
  // let DEBUG = true
  // let DEBUG_INIT = true
  // let DEBUG_LOGIC = true

  function nextGaussian() {
    return p.random(1) * 2 - 1 + (p.random(1) * 2 - 1) + (p.random(1) * 2 - 1)
  }

  let POS_DEV = 45
  let R_DEV = 15
  let VELOCITY_DEV = 2.5
  let VELOCITY_MEAN = 1
  let TURNING_SPEED_DEV = 0.25
  let TURNING_SPEED_MEAN = 0.25
  let COLOR_DEV = 40
  let fadeSpeed = 0.3
  let shrinkSpeed = 0.1

  // let direction = null
  // let velocity = null
  // let turningSpeed = null
  // let x = null
  // let y = null
  // let r = null
  // let c = null
  // let finished = null
  // let a = 255

  // Daniel Shiffman
  // http://codingtra.in
  // http://patreon.com/codingtrain
  // Code for: https://youtu.be/hacZU523FyM

  function Splatter(base, x, y, r) {
    this.x = nextGaussian() * POS_DEV + x
    this.y = nextGaussian() * POS_DEV + y
    this.r = nextGaussian() * R_DEV + r
    this.c = p.color(
      nextGaussian() * COLOR_DEV + p.red(base),
      nextGaussian() * COLOR_DEV + p.green(base),
      nextGaussian() * COLOR_DEV + p.blue(base),
      nextGaussian() * COLOR_DEV + p.alpha(base),
    )
    this.finished = false
    this.direction = p.random(p.TWO_PI)
    this.velocity = nextGaussian() * VELOCITY_DEV + VELOCITY_MEAN
    this.turningSpeed = nextGaussian() * TURNING_SPEED_DEV + TURNING_SPEED_MEAN

    this.loop = false

    this.update = function() {
      if (this.r < 0) this.finished = true
      var a = p.alpha(this.c)

      if (!this.loop) {
        this.r -= shrinkSpeed
        a -= fadeSpeed
      }
      this.c = p.color(p.red(this.c), p.green(this.c), p.blue(this.c), a)
      if (this.a < 0) this.finished = true
      this.walk()
    }

    this.walk = function() {
      this.direction += p.random(-this.turningSpeed, this.turningSpeed)
      this.x += p.cos(this.direction) * this.velocity
      this.y += p.sin(this.direction) * this.velocity

      if (
        this.x < -this.r ||
        this.x > p.width + this.r ||
        this.y < -this.r ||
        this.y > p.height + this.r
      )
        this.finished = true
    }

    this.draw = function() {
      p.noStroke()
      p.fill(this.c)
      p.ellipse(this.x, this.y, this.r, this.r)
    }
  }

  p.setup = function() {
    //p.createCanvas(window.innerWidth, window.innerHeight)
    p.createCanvas(500, 500)
    p.smooth()
    p.background(0)
    // baseColor = p.color(p.random(255), p.random(255), p.random(255), 125)
    baseColor = p.color(255, 0, 0, 125)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.mood !== null && props.mood && props.mood.length > 0) {
      clearBackground = false
      props.mood.forEach(emotion => {
        const emotionsMap = {
          anger: [233, 39, 39],
          joy: [246, 196, 34],
          sadness: [42, 122, 172],
          analytical: [0, 87, 214],
          confident: [112, 48, 160],
          tentative: [12, 210, 172],
          fear: [51, 102, 0],
        }

        for (let index = 0; index < 10; index++) {
          const s = new Splatter(
            p.color(...emotionsMap[emotion.tone_id], 125),
            p.random(p.width),
            p.random(p.height),
            p.map(emotion.score, 0, 1, 1, 20),
          )
          if (props.isOver) s.loop = true
          splatters.push(s)
        }
      })
    } else {
      clearBackground = true
    }
  }

  p.draw = function() {
    if (clearBackground) p.background(0, 2)
    // console.log(splatters.length)
    for (var i = splatters.length - 1; i >= 0; i--) {
      var splatter = splatters[i]
      splatter.draw()
      splatter.update()

      if (splatter.finished) {
        // splatters.splice(i, 1)
      }
    }

    p.smooth()
    p.noCursor()
  }

  //   void mousePressed()
  // {
  //   baseColor = color(random(255), random(255), random(255), 125);
  // }

  // void keyPressed()
  // {
  //    if (key == ' ')
  //       clearBackground = !clearBackground;
  // }
}
