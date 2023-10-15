import React, { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import Primary from "../components/Buttons/Primary"
import ProfileDropdown from "../components/Profile/ProfileDropdown"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { logoutAsync } from "../features/auth/authSlice"
import PlayerBar from "../components/Player/PlayerBar"
import Upload from "../components/Buttons/Upload"
import { ToastContainer } from "react-toastify"

const MainLayout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const user = useAppSelector((state) => state.auth.currentUser)

  console.log(user)

  const handleLogOut = () => {
    dispatch(logoutAsync())
    navigate("/")
  }
  const [isBlurred, setIsBlurred] = useState(false)
  const handleBlur = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement
    setIsBlurred(target.scrollTop > 0)
  }

  return (
    <div className="h-screen flex flex-col">
      <div
        className="w-full flex flex-row-reverse bg-neutral-950 flex-grow overflow-auto"
        onScroll={handleBlur}
      >
        <div className="flex-grow text-linkwater h-[5000px] scroll-smooth bg-gradient-to-t from-neutral-950 from-95% to-martinique to-100%">
          <div className="sticky top-0 z-10">
            <div
              className={`absolute h-[88px] inset-x-0 transition-all duration-500 ${
                isBlurred && "bg-neutral-950/90 backdrop-blur"
              }`}
            ></div>
            <div className="absolute py-7 inset-x-0 px-10 flex justify-between">
              <HistoryNavigation />
              {!user ? (
                <Primary onClick={() => navigate("/account/login")}>
                  <span className="px-4">Đăng nhập</span>
                </Primary>
              ) : (
                <div className="flex gap-2">
                  <Upload />
                  <ProfileDropdown logOut={handleLogOut} />
                </div>
              )}
            </div>
          </div>
          <Outlet />
        </div>
        <Sidebar />
      </div>
      <PlayerBar />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  )
}

export default MainLayout
