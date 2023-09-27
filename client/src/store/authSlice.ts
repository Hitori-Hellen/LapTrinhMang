import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { UserType } from "../utils/type"

const initialState: InitialStateType = {
    user: undefined,
}

const URL = "http://localhost:5000/api"

export const asyncLogin = createAsyncThunk(
    "auth/asyncLogin",
    async ({ email, password }: { email: string; password: string }) => {
        console.log("login123", email, password)
        const res = await fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        if (res.ok) {
            console.log("data", data)
            return data
        }
    }
)

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state: InitialStateType,
            action: PayloadAction<UserType>
        ) => {},
        reset: (state: InitialStateType) => {
            state.user = undefined
        },
    },
    extraReducers: {
        [asyncLogin.fulfilled.type]: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { setUser, reset } = AuthSlice.actions

export default AuthSlice.reducer

interface InitialStateType {
    user: UserType | undefined
}
