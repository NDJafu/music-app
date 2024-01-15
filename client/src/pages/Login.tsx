import React, { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { useLoginMutation } from "../features/auth/authApiSlice"
import { toast } from "react-toastify"

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const userRef = useRef<HTMLInputElement>(null)
  const initialState = {
    email: "",
    password: "",
  }

  const [loginForm, setLoginForm] = useState(initialState)

  useEffect(() => {
    userRef.current?.focus()
    if (currentUser) navigate(-1)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ ...loginForm })
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch((e) => toast.error(e.data.error))
      .finally(() => setLoginForm(initialState))
  }

  return (
    <div className="mx-auto w-1/3 bg-black h-screen mt-10 rounded-xl text-linkwater pt-12 box-border">
      <h1 className="text-center font-bold text-4xl">Login to Unicord</h1>
      <form
        className="mx-auto px-5 pt-5 w-1/2 flex flex-col gap-5 font-semibold"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">
          Email
          <input
            id="email"
            name="email"
            type="email"
            ref={userRef}
            className="bg-dark-500 border border-linkwater/20 rounded-md w-full p-2.5 outline-none"
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            className="bg-dark-500 border border-linkwater/20 rounded-md w-full p-2.5 outline-none"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>
        <button className="w-full bg-jarcata py-3 rounded-full" type="submit">
          Login
        </button>
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
