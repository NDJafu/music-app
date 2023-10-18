import React, { useEffect, useRef, useState } from "react"
import { BsBoxArrowUpRight, BsChevronDown, BsPerson } from "react-icons/bs"
import { Link } from "react-router-dom"
import Primary from "../Buttons/Primary"
import { useAppSelector } from "../../app/hooks"

type Props = {
  logOut: () => void
}

const ProfileDropdown = ({ logOut }: Props) => {
  const user = useAppSelector((state) => state.auth.currentUser)

  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef: React.RefObject<HTMLDivElement> = useRef(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfileMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [])

  return (
    <div ref={profileRef} className="h-8 relative">
      <Primary onClick={() => setShowProfileMenu(!showProfileMenu)}>
        <div className="flex items-center p-1 gap-1 h-full">
          {!user?.avatar ? (
            <div className="bg-neutral-700 rounded-full p-1">
              <BsPerson size={16} />
            </div>
          ) : (
            <img
              src={user.avatar}
              width={24}
              height={24}
              alt="avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <BsChevronDown />
        </div>
      </Primary>
      {showProfileMenu ? (
        <div className="bg-neutral-800 absolute top-10 right-0 w-44 rounded-md p-1 flex flex-col text-sm">
          <Link
            to={"/account/overview"}
            target="_blank"
            className="flex items-center justify-between hover:bg-neutral-600 p-2.5 rounded-sm"
          >
            <span>Account</span>
            <BsBoxArrowUpRight />
          </Link>
          <Link
            to={`/user/${user?.id}`}
            className="hover:bg-neutral-600 p-2.5 rounded-sm"
          >
            <span>Profile</span>
          </Link>
          <Link to={"/"} className="hover:bg-neutral-600 p-2.5 rounded-sm">
            <span>Notifications</span>
          </Link>
          <Link
            to={"/"}
            className="hover:bg-neutral-600 p-2.5 rounded-sm border-b border-neutral-700"
          >
            <span>Options</span>
          </Link>
          <button
            onClick={logOut}
            className="hover:bg-neutral-600 p-2.5 rounded-sm text-start"
          >
            <span>Log out</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ProfileDropdown
