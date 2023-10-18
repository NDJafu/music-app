import React, { useState, useRef, useEffect } from "react"
import { loginAsync } from "../features/auth/authSlice"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setCredentials, useLoginMutation } from "../features/auth/authSliceV2"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const user = useAppSelector((state) => state.auth.currentUser)

  const userRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    userRef.current?.focus()
  }, [])

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [errMessage, setErrMessage] = useState<string | null>()

  useEffect(() => {
    setErrMessage(null)
  }, [loginForm])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target
    switch (input.name) {
      case "email":
        setLoginForm((prev) => ({ ...prev, email: input.value }))
        return
      case "password":
        setLoginForm((prev) => ({ ...prev, password: input.value }))
        return
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ ...loginForm })
      setLoginForm({ email: "", password: "" })
      navigate("/")
    } catch (err: FetchBaseQueryError | any) {
      if (!err.orginalStatus) {
        setErrMessage("No server response.")
      } else if (err.orginalStatus === 400) {
        setErrMessage("Missing field.")
      } else if (err.orginalStatus === 401) {
        setErrMessage("Unauthorized.")
      } else {
        setErrMessage("Login failed, try again later.")
      }
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="mx-auto w-1/3 bg-dark h-screen mt-10 rounded-xl text-linkwater pt-12 box-border">
      <h1 className="text-center font-bold text-4xl">Login to Unicord</h1>
      <form className="mx-auto px-5 pt-5 w-1/2" onSubmit={handleSubmit}>
        <label htmlFor="name">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          ref={userRef}
          className="bg-dark-500 border border-linkwater rounded-md w-full p-2.5 mb-5"
          value={loginForm.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="bg-dark-500 border border-linkwater rounded-md w-full p-2.5"
          value={loginForm.password}
          onChange={handleChange}
        />
        {errMessage && (
          <div className="bg-red-500 text-linkwater p-3 mt-5 rounded-lg">
            {errMessage}
          </div>
        )}
        <input
          type="submit"
          value="Log In"
          className="w-full bg-jarcata mt-5 py-3 rounded-full"
        />
      </form>
      <div className="w-fit font-semibold text-center my-5 flex flex-col gap-5 mx-auto">
        <Link to={""} className="underline">
          Forgot your password?
        </Link>
        <div className="h-0.5 bg-neutral-800"></div>
        <span>
          Don't have an account?{" "}
          <Link to={"/signup"} className="hover:underline">
            Sign up for Unicord
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Login
