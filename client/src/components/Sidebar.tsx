import { BsFiles, BsFillHouseDoorFill, BsPlus, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PlaylistList from './Playlist/PlaylistList';
import PlaylistDropdown from './Playlist/PlaylistDropdown';

const Sidebar = () => {
  return (
    <aside className="flex w-80 flex-col gap-6 bg-black px-4 py-6 text-lg font-bold text-linkwater">
      <div className="flex items-center gap-4">
        <BsFillHouseDoorFill size={24} />
        <Link to="/">Home</Link>
      </div>
      <div className="flex items-center gap-4">
        <BsSearch size={24} />
        <Link to="/">Search</Link>
      </div>
      <div className="h-[1px] w-full rounded-lg bg-white/10"></div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <BsFiles size={24} />
          Your Library
        </div>
        <PlaylistDropdown />
      </div>
      <PlaylistList />
    </aside>
  );
};

export default Sidebar;
