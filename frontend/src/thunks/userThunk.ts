import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    User,
    RegisterUser,
    LoginRequest,
    UpdateUser
} from "../types/User";

import {
    userRegistration,
    userLogin,
    getUsers,
    getUser,
    getActiveUsers,
    getInactiveUsers,
    updateUser,
    deleteUser,
    deactivateUser,
    activateUser
} from "../api/userApi";


// Register User
export const registerUser = createAsyncThunk<
    string,
    RegisterUser
>(
    "user/registerUser",
    async (userData) => {
        return await userRegistration(userData);
    }
);


// Login User
export const loginUser = createAsyncThunk<
    string,
    LoginRequest
>(
    "user/loginUser",
    async (userData) => {
        return await userLogin(userData);
    }
);


// Get All Users
export const fetchUsers = createAsyncThunk<
    User[],
    void
>(
    "user/fetchUsers",
    async () => {
        return await getUsers();
    }
);


// Get One User
export const fetchUserById = createAsyncThunk<
    User,
    number
>(
    "user/fetchUserById",
    async (userId) => {
        return await getUser(userId);
    }
);


// Get Active Users
export const fetchActiveUsers = createAsyncThunk<
    User[],
    void
>(
    "user/fetchActiveUsers",
    async () => {
        return await getActiveUsers();
    }
);


// Get Inactive Users
export const fetchInactiveUsers = createAsyncThunk<
    User[],
    void
>(
    "user/fetchInactiveUsers",
    async () => {
        return await getInactiveUsers();
    }
);


// Update User
export const updateUserData = createAsyncThunk<
    string,
    { userId: number; userData: UpdateUser }
>(
    "user/updateUser",
    async ({ userId, userData }) => {
        return await updateUser(userId, userData);
    }
);


// Delete User
export const removeUser = createAsyncThunk<
    string,
    number
>(
    "user/deleteUser",
    async (userId) => {
        return await deleteUser(userId);
    }
);


// Deactivate User
export const deactivateUserData = createAsyncThunk<
    string,
    number
>(
    "user/deactivateUser",
    async (userId) => {
        return await deactivateUser(userId);
    }
);


// Activate User
export const activateUserData = createAsyncThunk<
    string,
    number
>(
    "user/activateUser",
    async (userId) => {
        return await activateUser(userId);
    }
);

