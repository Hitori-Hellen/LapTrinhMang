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
        /* console.log("login123", email, password)
        const res = await fetch("https://api.github.com/users/xiaotian/repos", {
            method: "GET",
            // body: JSON.stringify({ email, password }),
        })
        console.log("login failed", res)
        const data = await res.json()
        if (res.ok) {
            console.log("data", data)
            return data
        } */
        fetch(`${URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }).then((res) => {
            console.log("login failed", res)
            const data = res.json()
            if (res.ok) {
                console.log("data", data)
                return data
            }
        })
    }
)

export const asyncLogout = createAsyncThunk("auth/asyncLogout", async () => {
    const res = await fetch(`${URL}/auth/logout`, { credentials: "include" })
    const data = await res.json()
    return undefined
})

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state: InitialStateType,
            action: PayloadAction<UserType>
        ) => {},
    },
    extraReducers: {
        [asyncLogin.fulfilled.type]: (state, action) => {
            state.user = action.payload
        },
        [asyncLogout.fulfilled.type]: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { setUser } = AuthSlice.actions

export default AuthSlice.reducer

interface InitialStateType {
    user: UserType | undefined
}
