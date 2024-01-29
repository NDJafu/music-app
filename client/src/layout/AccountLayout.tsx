import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/AccountSidebar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchUserById } from '../features/user/userSlice'

const AccountLayout = () => {
  const dispatch = useAppDispatch()
  const id = useAppSelector((state) => state.auth.currentUser?.id)
  useEffect(() => {
    if (id) dispatch(fetchUserById(id as string))
  }, [id])

  return (
    <div className="mx-auto box-border flex h-screen w-1/2 bg-linkwater text-dark">
      <AccountSidebar />
      <div className="flex-grow px-8 py-9">
        <Outlet />
      </div>
    </div>
  )
}

export default AccountLayout
