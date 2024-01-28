import React from "react"

type Props = {
  children?: React.ReactNode
  onClick?: () => void
}

const Primary = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-jarcata rounded-full text-xs font-bold text-linkwater"
    >
      {children}
    </button>
  )
}

export default Primary
