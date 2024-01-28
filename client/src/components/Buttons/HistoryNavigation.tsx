import React, { useEffect, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
  onClick: () => void
  isDisabled?: boolean
}
const ButtonLayout = ({ children, onClick, isDisabled }: Props) => {
  return (
    <button
      className="bg-jarcata p-2 rounded-full"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

const HistoryNavigation = () => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-2">
      <ButtonLayout onClick={() => navigate(-1)}>
        <BsChevronLeft />
      </ButtonLayout>
      <ButtonLayout onClick={() => navigate(1)}>
        <BsChevronRight />
      </ButtonLayout>
    </div>
  )
}

export default HistoryNavigation
