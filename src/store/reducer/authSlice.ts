'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: { email: string, password: string } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ email: string, password: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        register: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        resetPassword: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.isAuthenticated = true;
            state.user = { email: action.payload.email, password: action.payload.password };
        }
    },
});

export const { login, logout, register, resetPassword } = authSlice.actions;
export default authSlice.reducer;
