import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useRefreshMutation } from './features/auth/authApiSlice';

//layout imports
import MainLayout from './layout/MainLayout';
import UserLayout from './layout/UserLayout';
import AccountLayout from './layout/AccountLayout';

//page imports
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AccountOverview from './pages/AccountOverview';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import TrackPage from './pages/TrackPage';
import PlaylistPage from './pages/PlaylistPage';
import QueuePage from './pages/QueuePage';

const App = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      }
    };

    if (!token) verifyRefreshToken();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="user/:id" element={<ProfilePage />} />
        <Route path="track/:id" element={<TrackPage />} />
        <Route path="playlist/:id" element={<PlaylistPage />} />
        <Route path="queue" element={<QueuePage />} />
      </Route>,
      <Route path="/account" element={<UserLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<AccountLayout />}>
          <Route index path="overview" element={<AccountOverview />} />
          <Route path="profile" element={<EditProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>,
      <Route path="/signup" element={<RegisterPage />} />,
      <Route path="*" element={<div>everything else</div>} />,
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
