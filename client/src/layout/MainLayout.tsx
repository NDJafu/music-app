import React, { useState } from "react"
import Sidebar from "../components/Sidebar"
import { Link, Outlet } from "react-router-dom"
import HistoryNavigation from "../components/Buttons/HistoryNavigation"
import ProfileDropdown from "../components/Profile/ProfileDropdown"
import { useAppSelector } from "../app/hooks"
import PlayerBar from "../components/Player/PlayerBar"
import Upload from "../components/Buttons/Upload"
import { ToastContainer } from "react-toastify"
import { useLogoutMutation } from "../features/auth/authSliceV2"

const MainLayout = () => {
  const [logout, { isLoading }] = useLogoutMutation()
  const user = useAppSelector((state) => state.auth.currentUser)

  const handleLogOut = async () => {
    await logout()
  }
  const [isBlurred, setIsBlurred] = useState(false)

  const handleBlur = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement
    setIsBlurred(target.scrollTop > 0)
  }

  return (
    <>
      <div className="w-full h-screen grid grid-cols-6 bg-neutral-950">
        <Sidebar />
        <div
          className="col-span-5 text-linkwater scroll-smooth bg-gradient-to-t from-neutral-950 from-[92%] to-martinique to-100% overflow-auto"
          onScroll={handleBlur}
        >
          <div className="sticky top-0 z-10">
            <div
              className={`absolute inset-x-0 px-9 py-6 inline-flex justify-between transition-all duration-500 ${
                isBlurred && "bg-neutral-950/90 backdrop-blur"
              }`}
            >
              <HistoryNavigation />
              {!user ? (
                <Link
                  to={"account/login"}
                  className="bg-jarcata rounded-full text-xs font-bold text-linkwater px-4 py-2"
                >
                  Đăng nhập
                </Link>
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
    </>
  )
}

export default MainLayout
