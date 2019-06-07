export default function sketch(p) {
  var col = 0
  var inc = 0.01
  var scl = 20
  var cols, rows

  p.setup = function() {
    p.createCanvas(200, 200)
    cols = p.floor(p.width / scl)
    rows = p.floor(p.height / scl)
    p.noLoop()
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.rotation) {
      //rotation = (props.rotation * Math.PI) / 180
    }
  }

  p.draw = function() {
    var yoff = 0
    for (var y = 0; y < rows; y++) {
      var xoff = 0
      for (var x = 0; x < cols; x++) {
        // var index = (x + y * p.width) * 4
        var r = p.noise(xoff, yoff) * 255
        xoff += inc
        p.fill(r)
        p.rect(x * scl, y * scl, scl, scl)
      }

      yoff += inc
    }

    p.updatePixels()
    //noLoop();

    if (col <= 255) {
      col++
    } else if (col > 255) {
      col = 0
    }
  }
}
