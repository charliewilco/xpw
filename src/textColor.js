import chroma from 'chroma-js'
import checkHex from './checkHex'

const textColor = (color) => {
  let vsWhite = checkHex(color) ? chroma.contrast(color, 'white') : '#666'
  if (vsWhite > 4) {
    return '#FFF'
  } else {
    return chroma(color).darken(3).hex()
  }
}

export default textColor
