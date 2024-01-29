import React, { useEffect, useRef, useState } from 'react';
import { BsBoxArrowUpRight, BsChevronDown, BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Primary from '../Buttons/Primary';
import { useAppSelector } from '../../app/hooks';

type Props = {
  logOut: () => void;
};

const ProfileDropdown = ({ logOut }: Props) => {
  const user = useAppSelector((state) => state.auth.currentUser);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef: React.RefObject<HTMLDivElement> = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={profileRef} className="relative h-8">
      <Primary onClick={() => setShowProfileMenu(!showProfileMenu)}>
        <div className="flex h-full items-center gap-1 p-1">
          {!user?.avatar ? (
            <div className="rounded-full bg-neutral-700 p-1">
              <BsPerson size={16} />
            </div>
          ) : (
            <img
              src={user.avatar}
              width={24}
              height={24}
              alt="avatar"
              className="h-6 w-6 rounded-full object-cover"
            />
          )}
          <BsChevronDown />
        </div>
      </Primary>
      {showProfileMenu ? (
        <div className="absolute right-0 top-10 flex w-44 flex-col rounded-md bg-neutral-800 p-1 text-sm">
          <Link
            to={'/account/overview'}
            target="_blank"
            className="flex items-center justify-between rounded-sm p-2.5 hover:bg-neutral-600"
          >
            <span>Account</span>
            <BsBoxArrowUpRight />
          </Link>
          <Link
            to={`/user/${user?.id}`}
            className="rounded-sm p-2.5 hover:bg-neutral-600"
          >
            <span>Profile</span>
          </Link>
          <Link to={'/'} className="rounded-sm p-2.5 hover:bg-neutral-600">
            <span>Notifications</span>
          </Link>
          <Link
            to={'/'}
            className="rounded-sm border-b border-neutral-700 p-2.5 hover:bg-neutral-600"
          >
            <span>Options</span>
          </Link>
          <button
            onClick={logOut}
            className="rounded-sm p-2.5 text-start hover:bg-neutral-600"
          >
            <span>Log out</span>
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProfileDropdown;
