import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"

const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errorMsg, setErrorMsg] = useState("")

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(e.target.value)
  }
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPassword(e.target.value)
  }
  const handleUpdatePassword = () => {
    if (currentPassword.length <= 0) {
      setErrorMsg("*Please enter old password")
      return
    }
    if (newPassword.length <= 0) {
      setErrorMsg("*Please enter new password")
      return
    }
    if (newPassword === confirmPassword) {
      navigate("../overview")
    } else setErrorMsg("*Please verify your password")
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-medium mb-8">Change your password</h1>
      <label htmlFor="currPassword">Current password</label>
      <input
        type="password"
        name="currPassword"
        id="currPassword"
        className="bg-transparent border border-black rounded-md px-4 py-3 mb-4"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        required
      />
      <label htmlFor="newPassword">New password</label>
      <input
        type="password"
        name="newPassword"
        id="newPassword"
        className="bg-transparent border border-black rounded-md px-4 py-3 mb-4"
        value={newPassword}
        onChange={handleNewPasswordChange}
        required
      />
      <label htmlFor="confirm">Repeat new password</label>
      <input
        type="password"
        name="confirm"
        id="confirm"
        className="bg-transparent border border-black rounded-md px-4 py-3 mb-4"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      <div className="flex w-full justify-end items-center my-4 gap-4">
        <Link
          to="../overview"
          className="font-semibold text-neutral-600 hover:text-black"
        >
          Cancel
        </Link>
        <button
          className="p-2 bg-jarcata-500 rounded-full w-24 font-semibold text-linkwater"
          onClick={handleUpdatePassword}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
