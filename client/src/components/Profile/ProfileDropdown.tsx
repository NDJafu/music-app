import { BsBoxArrowUpRight, BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '../ui/Dropdown';
import { useLogoutMutation } from '../../features/auth/authApiSlice';

const ProfileDropdown = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <Dropdown>
      <DropdownTrigger className="flex items-center rounded-full bg-jarcata p-1">
        {currentUser?.avatar ? (
          <img
            src={currentUser?.avatar}
            alt="avatar"
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <div className="rounded-full bg-neutral-700 p-1">
            <BsPerson size={16} />
          </div>
        )}
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem
          onClick={() =>
            window.open(`${window.location.origin}/account/overview`)
          }
        >
          Account
          <BsBoxArrowUpRight />
        </DropdownItem>
        <DropdownItem onClick={() => navigate(`/user/${currentUser?.id}`)}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => {}}>Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          disabled={isLoading}
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Log out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default ProfileDropdown;
