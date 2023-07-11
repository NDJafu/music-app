import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { CurrentUser } from "../../app/types"
import axios from "axios"

const api = axios.create({
  baseURL: "/api/v1",
})

interface AuthState {
  currentUser: CurrentUser | null
  isLoggedIn: "loading" | "true" | "false"
  error: string | null
}

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: "loading",
  error: null,
}

// Deprecated

// export const getCurrentUserAsync = (): AppThunk => async (dispatch) => {
//   try {
//     api.get("/user/currentUser").then((firstResponse) => {
//       const id = firstResponse.data.user.userId
//       api.get(`/user/${id}`).then((secondResponse) => {
//         const user = secondResponse.data.user
//         dispatch(
//           setCurrentUserSuccess({
//             id: id,
//             email: user.email,
//             image: user.image,
//             role: "",
//           }),
//         )
//       })
//     })
//   } catch (error: any) {
//     dispatch(setCurrentUserFailure(error.response.data.message))
//   }
// }

export const getCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    try {
      const response = await api.get("/user/currentUser")
      const user = response.data.user
      const transformedData: CurrentUser = {
        id: user._id,
        email: user.email,
        image: user.image,
        role: "",
      }
      return transformedData
    } catch (error: any) {
      throw Error(`Error: ${error.response.data.message}`)
    }
  },
)

export const registerAsync =
  (
    email: string,
    username: string,
    birthday: string,
    password: string,
    gender: string,
  ): AppThunk =>
  async (dispatch) => {
    try {
      const firstResponse = await api.post("/auth/register", {
        email,
        username,
        birthday,
        password,
        gender,
      })
      const id = firstResponse.data.user.userId
      const secondResponse = await api.get(`/user/${id}`)
      const user = secondResponse.data.user
      dispatch(
        setCurrentUserSuccess({
          id: id,
          email: user.email,
          image: user.image,
          role: "",
        }),
      )
    } catch (error: any) {
      dispatch(setCurrentUserFailure(error))
    }
  }

export const loginAsync =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      const firstResponse = await api.post("/auth/login", {
        email,
        password,
      })
      const id = firstResponse.data.user.userId
      const secondResponse = await api.get(`/user/${id}`)
      const user = secondResponse.data.user
      dispatch(
        setCurrentUserSuccess({
          id: id,
          email: user.email,
          image: user.image,
          role: "",
        }),
      )
    } catch (err: any) {
      dispatch(
        setCurrentUserFailure(err.response.data.error || "An error occurred"),
      )
    }
  }

export const logoutAsync = (): AppThunk => async (dispatch) => {
  try {
    await api.get("/auth/logout")
    dispatch(logoutSuccess())
  } catch (error) {
    console.error("Logout error:", error)
  }
}

export const updateUserPasswordAsync =
  (oldPassword: string, newPassword: string): AppThunk =>
  async (dispatch) => {
    try {
      await api.patch("/user/password", { oldPassword, newPassword })
      dispatch(updateUserPasswordSuccess())
    } catch (error: any) {
      dispatch(updateUserPasswordFailure(error.message))
    }
  }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUserSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload
      state.isLoggedIn = "true"
      state.error = null
    },
    setCurrentUserFailure: (state, action: PayloadAction<string>) => {
      state.currentUser = null
      state.isLoggedIn = "false"
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.currentUser = null
      state.isLoggedIn = "false"
      state.error = null
    },
    updateUserPasswordSuccess: (state) => {
      state.error = null
    },
    updateUserPasswordFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.image = action.payload
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoggedIn = "loading"
      state.error = null
    })
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoggedIn = "true"
      state.error = null
      state.currentUser = action.payload
    })
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoggedIn = "false"
      state.error = action.payload as string
      state.currentUser = null
    })
  },
})

export const {
  setCurrentUserSuccess,
  setCurrentUserFailure,
  logoutSuccess,
  updateUserPasswordSuccess,
  updateUserPasswordFailure,
  setAvatar,
} = authSlice.actions

export default authSlice.reducer
