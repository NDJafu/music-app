import ColorThief from "colorthief"

export const getColor = (url: string) => {
  return new Promise<number[]>((resolve, reject) => {
    if (!url) {
      reject()
    }
    const image = new Image()
    image.src = url
    image.crossOrigin = "Anonymous"

    image.onload = function () {
      const colorThief = new ColorThief()
      const result = colorThief.getColor(image, 200)
      resolve(result)
    }
  })
}

function componentToHex(c: number) {
  var hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

export function rgbToHex(rgb: number[]) {
  return (
    "#" +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2])
  )
}
