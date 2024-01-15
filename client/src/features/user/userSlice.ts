import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../app/types"
import { toast } from "react-toastify"
import { api } from "../../utils/api"

interface UserState {
  userData: User | null
  allUsers: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  userData: null,
  allUsers: [],
  loading: false,
  error: null,
}

export const fetchUserById = createAsyncThunk(
  "user/fetchUser",
  async (id: string) => {
    try {
      const response = await api.get(`/user/${id}`)
      const user = response.data.user
      const transformedData: User = {
        id: id,
        email: user.email,
        username: user.username,
        birthday: user.birthday,
        gender: user.gender,
        follower: user.follower,
        avatar: user.image,
        password: "",
        role: "",
      }
      return transformedData
    } catch (error: any) {
      throw Error(`Error: ${error.response.data.message}`)
    }
  },
)

export const updateUserById = createAsyncThunk(
  "user/updateUser",
  async (userData: Partial<User>) => {
    try {
      const response = await api.patch(`/user/${userData.id}`, userData)
      const user = response.data.user
      const transformedData: User = {
        id: user._id,
        email: user.email,
        username: user.username,
        birthday: user.birthday,
        gender: user.gender,
        follower: user.follower,
        avatar: user.image,
        password: "",
        role: "",
      }
      return transformedData
    } catch (error: any) {
      throw Error(`Error: ${error.response.data.message}`)
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserSuccess: (state, action) => {
      state.error = null
      state.userData = action.payload
      toast("User profile updated!")
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload
    })
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(updateUserById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(updateUserById.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload
    })
    builder.addCase(updateUserById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { updateUserSuccess, updateUserFailure } = userSlice.actions
export default userSlice.reducer
