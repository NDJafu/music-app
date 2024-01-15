import { useState } from "react"

type Props = {
  currentTime: number
  duration: number
  onTimeUpdate: (time: number) => void
  onMouseUpSeek: (time: number) => void
}

const ProgressBar = (props: Props) => {
  const { currentTime, onTimeUpdate, onMouseUpSeek } = props
  const [hover, setHover] = useState(false)

  const currentPercentage = currentTime * 100

  const handleTimeDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const timeline = document.querySelector(".bar__progress") as HTMLElement
    setHover(true) //Shows the coloured timeline
    let isScrubbing = false //Check if user is pulling the timeline around

    function toggleScrubbing(e: MouseEvent) {
      isScrubbing = (e.buttons & 1) === 1
      const rect = timeline.getBoundingClientRect()
      //If mouse horizontal position - timeline bounding x cordinate is negative, it returns zero
      const mousePosition = Math.max(0, e.x - rect.x)
      const ifCursorStillOnTimeLine =
        e.x - rect.x >= 0 &&
        e.x - rect.x <= rect.width &&
        e.y - rect.y >= 0 &&
        e.y - rect.y <= rect.height
      const percent = Math.min(mousePosition, rect.width) / rect.width

      if (isScrubbing) {
        handleTimeLineUpdate(e)
      } else {
        onMouseUpSeek(percent - 0.00001)
        if (!ifCursorStillOnTimeLine) setHover(false)
      }
    }

    function handleTimeLineUpdate(e: MouseEvent) {
      const rect = timeline.getBoundingClientRect()
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
      if (isScrubbing) {
        e.preventDefault()
        setHover(true)
      }
      onTimeUpdate(percent)
    }

    timeline.addEventListener("mouseleave", () => setHover(false))
    timeline.addEventListener("mousedown", toggleScrubbing)
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) toggleScrubbing(e)
    })
    document.addEventListener("mousemove", (e) => {
      if (!isScrubbing) return
      handleTimeLineUpdate(e)
    })
  }

  return (
    <div className="w-full flex items-center">
      <div
        className="bar__progress h-[5px] rounded-lg w-full"
        style={{
          background: `linear-gradient(to right,${
            hover ? "#5B4884" : "white"
          } ${currentPercentage}%, rgb(115 115 115) 0)`,
        }}
        onMouseOver={handleTimeDrag}
      >
        <span
          className="bar__progress__knob relative bg-linkwater h-3 w-3 -top-[2.5px] -ml-1.5 rounded-full block"
          style={{
            left: `${Math.max(0, currentPercentage)}%`,
            opacity: hover ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
