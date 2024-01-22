import { createContext, useEffect, useState } from "react"
import { extractColors } from "extract-colors"
import { FinalColor } from "extract-colors/lib/types/Color"

interface DynamicBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string
}

export function DynamicBackground({
  image,
  children,
  ...props
}: DynamicBackgroundProps) {
  const [colors, setColors] = useState<FinalColor[]>([])

  useEffect(() => {
    const getImageColor = async () => {
      const colors = await extractColors(image, {
        crossOrigin: "anonymous",
        pixels: 800,
      })
      setColors(
        colors
          .filter(({ lightness }) => lightness < 0.9 && lightness > 0.05)
          .sort((a, b) => b.area - a.area),
      )
    }

    getImageColor()
  }, [image])

  if (colors.length > 0)
    return (
      <div
        {...props}
        style={{
          background: `linear-gradient(
          rgba(0, 0, 0, 0), 
          rgba(0, 0, 0, 0.6)
        ),${colors?.[0].hex}`,
          // boxShadow: `0 25px 240px 60px rgba(${colors?.[0].red}, ${colors?.[0].green}, ${colors?.[0].blue}, 0.5)`,
        }}
      >
        {children}
      </div>
    )
}
