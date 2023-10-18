import React from "react"
import BrandLogo from "../assets/brand.svg"
import { BsFiles, BsFillHouseDoorFill, BsPlus, BsSearch } from "react-icons/bs"
import { Link } from "react-router-dom"
import PlaylistList from "./Playlist/PlaylistList"
import PlaylistDropdown from "./Playlist/PlaylistDropdown"

const Sidebar = () => {
  return (
    <aside className="col-span-1 min-w-fit bg-black p-2 text-linkwater">
      <Link to="/">
        <img src={BrandLogo} alt="brand" />
      </Link>
      <div className="flex flex-col gap-6 text-lg my-6 px-2 font-bold">
        <div className="flex items-center gap-4">
          <BsFillHouseDoorFill size={24} />
          <Link to="/">Home</Link>
        </div>
        <div className="flex items-center gap-4">
          <BsSearch size={24} />
          <Link to="/">Search</Link>
        </div>
        <div className="w-full h-0.5 bg-white/10 rounded-lg"></div>
        <div className="w-full flex items-center justify-auto gap-4 relative">
          <BsFiles size={24} />
          Your Library
          <PlaylistDropdown />
        </div>
        <PlaylistList />
      </div>
    </aside>
  )
}

export default Sidebar
