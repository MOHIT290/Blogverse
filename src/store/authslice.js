import { createSlice } from "@reduxjs/toolkit";

// intitalState-> is used to track whether user is authenticated or not

// const storedUser = JSON.parse(localStorage.getItem("userData"));


const authslice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        userData: null
    },

    reducers: {

        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userdata
            // localStorage.setItem("userData", JSON.stringify(action.payload.userdata));

        },

        logout: (state) => {
            state.status = false
            state.userData = null
            // localStorage.removeItem("userData");

        }

    }

})

export const { login, logout } = authslice.actions

export default authslice.reducer


