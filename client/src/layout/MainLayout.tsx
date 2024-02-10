import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Link, Outlet } from 'react-router-dom';
import HistoryNavigation from '../components/Buttons/HistoryNavigation';
import ProfileDropdown from '../components/Profile/ProfileDropdown';
import { useAppSelector } from '../app/hooks';
import PlayerBar from '../components/Player/PlayerBar';
import Upload from '../components/Buttons/Upload';

const MainLayout = () => {
  const user = useAppSelector((state) => state.auth.currentUser);

  const [isBlurred, setIsBlurred] = useState(false);

  const handleBlur = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    setIsBlurred(target.scrollTop > 0);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-neutral-950">
      <div className="flex flex-grow self-stretch overflow-hidden">
        <Sidebar />
        <div
          className="w-full overflow-auto scroll-smooth text-linkwater"
          onScroll={handleBlur}
        >
          <div className="sticky top-0 z-10">
            <div
              className={`absolute inset-x-0 inline-flex justify-between px-9 py-6 transition-all duration-500 ${
                isBlurred && 'bg-neutral-950/95 backdrop-blur'
              }`}
            >
              <HistoryNavigation />
              {!user ? (
                <Link
                  to={'account/login'}
                  className="rounded-full bg-jarcata px-4 py-2 text-xs font-bold text-linkwater"
                >
                  Đăng nhập
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Upload />
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <PlayerBar />
    </div>
  );
};

export default MainLayout;
