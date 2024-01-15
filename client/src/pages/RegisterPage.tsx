import { useEffect, useState } from "react"
import BrandLogo from "../assets/brand-light.svg"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/auth/authApiSlice"
import { toast } from "react-toastify"
import { useAppSelector } from "../app/hooks"

const RegisterPage = () => {
  const [register] = useRegisterMutation()
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  useEffect(() => {
    if (currentUser) navigate(-1)
  }, [])

  const navigate = useNavigate()

  const initialState = {
    email: "",
    password: "",
    username: "",
    month: "",
    date: "",
    year: "",
    gender: "",
  }

  const [registerForm, setRegisterForm] = useState(initialState)

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { year, month, date } = registerForm

    const birthday = new Date(`${year}-${month}-${date}`)

    const birthdayIsBiggerThanToday = birthday > new Date()

    if (birthdayIsBiggerThanToday) {
      toast.error("Invalid birthday!")
      return
    }

    await register({
      ...registerForm,
      birthday: birthday,
    })
      .unwrap()
      .then(() => navigate("/account/login"))
      .catch((err) => toast.error(err.data.error))
      .finally(() => setRegisterForm(initialState))
  }

  return (
    <div className="bg-neutral-100 w-full h-screen">
      <img src={BrandLogo} alt="brand" className="mx-auto py-12" />
      <form
        className="flex flex-col w-80 mx-auto gap-4"
        onSubmit={handleSubmitRegister}
      >
        {/* Email */}
        <label className="font-semibold">
          What's your email?
          <input
            type="email"
            className="bg-white p-3 rounded-md border border-gray-200 outline-none w-full"
            placeholder="What's your email"
            value={registerForm.email}
            onChange={(e) =>
              setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        {/* Password */}
        <label className="font-semibold">
          Type your password
          <input
            type="text"
            className="bg-white p-3 rounded-md border border-gray-200 outline-none w-full"
            placeholder="Type your password"
            value={registerForm.password}
            onChange={(e) =>
              setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>

        {/* Username */}
        <label className="font-semibold">
          What should we call you?
          <input
            type="text"
            className="bg-white p-3 rounded-md border border-gray-200 outline-none w-full"
            placeholder="What should we call you?"
            value={registerForm.username}
            onChange={(e) =>
              setRegisterForm((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </label>

        {/* Birthdate */}
        <label className="font-semibold">
          Date of birth?
          <div className="flex gap-2 font-normal">
            <label className="flex-1">
              Month
              <select
                className="bg-white px-3 h-[50px] rounded-md border border-gray-200"
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    month: e.target.value,
                  }))
                }
              >
                <option selected disabled>
                  Month
                </option>
                <option value={1}>January</option>
                <option value={2}>Febuary</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </label>
            <label className="flex-1">
              Date
              <input
                maxLength={2}
                type="text"
                className="bg-white p-3 rounded-md border border-gray-200 w-full"
                placeholder="DD"
                value={registerForm.date}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
              />
            </label>
            <label className="flex-1">
              Year
              <input
                maxLength={4}
                type="text"
                className="bg-white p-3 rounded-md border border-gray-200 w-full"
                placeholder="YYYY"
                value={registerForm.year}
                onChange={(e) =>
                  setRegisterForm((prev) => ({ ...prev, year: e.target.value }))
                }
              />
            </label>
          </div>
        </label>
        {/* Seggs? */}
        <label className="font-semibold">
          Gender?
          <div className="flex gap-4 font-normal">
            <label className="inline-flex gap-2">
              <input
                type="radio"
                value="male"
                checked={registerForm.gender === "male"}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
              />
              Male
            </label>
            <label className="inline-flex gap-2">
              <input
                type="radio"
                value="female"
                checked={registerForm.gender === "female"}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
              />
              Female
            </label>
            <label className="inline-flex gap-2">
              <input
                type="radio"
                value="others"
                checked={registerForm.gender === "others"}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
              />
              Others
            </label>
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="p-4 bg-jarcata-500 rounded-full w-1/2 mx-auto font-semibold text-linkwater"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
