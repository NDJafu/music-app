import { useEffect, useState } from "react"
import { extractColors } from "extract-colors"
import { FinalColor } from "extract-colors/lib/types/Color"

interface DynamicBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string
  topOpacity: number
  bottomOpacity: number
}

export function DynamicBackground({
  image,
  topOpacity,
  bottomOpacity,
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
            rgba(10, 10, 10, ${topOpacity}), 
            rgba(10, 10, 10, ${bottomOpacity})
        ),${colors?.[0].hex}`,
          // boxShadow: `0 25px 240px 60px rgba(${colors?.[0].red}, ${colors?.[0].green}, ${colors?.[0].blue}, 0.5)`,
        }}
      >
        {children}
      </div>
    )
}
