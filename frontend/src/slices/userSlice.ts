import { createSlice } from "@reduxjs/toolkit";

import type { UserState } from "../types/User";

import {
    fetchUsers,
    fetchActiveUsers,
    fetchInactiveUsers,
    fetchUserById,
    registerUser,
    loginUser,
    updateUserData,
    removeUser,
    deactivateUserData,
    activateUserData
} from "../thunks/userThunk";

const initialState : UserState = {
       users : [],
       activeUsers :[],
       inactiveUsers : [],
       singleUser : null,
       loading : false,
       error : null,
       message : null
};

const userSlice = createSlice({
         name : "user",
         initialState,
         reducers : {

         }
         ,
         extraReducers(builder) {

               builder
                .addCase(fetchUsers.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.users = action.payload;
                    state.loading = false;
                })
                .addCase(fetchUsers.rejected, (state) => {
                    state.loading = false;
                    state.error = "Unable to load users.";
                });
                builder.addCase(fetchActiveUsers.fulfilled,(state,action) => {
                       state.activeUsers = action.payload;
                       state.loading = false;  
                })
                .addCase(fetchActiveUsers.pending,(state) => {
                       state.loading = true;
                })
                .addCase(fetchActiveUsers.rejected,(state) => {
                       state.error = "something went something";
                })

                builder.addCase(fetchInactiveUsers.fulfilled,(state,action) => {
                      state.inactiveUsers = action.payload;
                      state.loading = false;
                })
                .addCase(fetchInactiveUsers.pending,(state) => {
                      state.loading = true;
                })
                .addCase(fetchInactiveUsers.rejected,(state) => {
                      state.error = "something went wrong";
                })

                // GET USER BY ID
                builder.addCase(fetchUserById.fulfilled, (state, action) => {
                    state.singleUser = action.payload;
                    state.loading = false;
                })
                .addCase(fetchUserById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchUserById.rejected, (state) => {
                    state.loading = false;
                    state.error = "Failed to fetch user";
                });


                // REGISTER USER
                builder.addCase(registerUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload;
                })
                .addCase(registerUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(registerUser.rejected, (state) => {
                    state.loading = false;
                    state.error = "Failed to register user";
                });


                // LOGIN USER
                builder.addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload;
                })
                .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(loginUser.rejected, (state) => {
                    state.loading = false;
                    state.error = "Login failed";
                });


                // UPDATE USER
                builder.addCase(updateUserData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload;
                })
                .addCase(updateUserData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateUserData.rejected, (state) => {
                    state.loading = false;
                    state.error = "Failed to update user";
                });


                // DELETE USER
                builder.addCase(removeUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload;
                })
                .addCase(removeUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(removeUser.rejected, (state) => {
                    state.loading = false;
                    state.error = "Failed to delete user";
                });


                // DEACTIVATE USER
                builder.addCase(deactivateUserData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload;
                })
                .addCase(deactivateUserData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(deactivateUserData.rejected, (state) => {
                    state.loading = false;
                    state.error = "Failed to deactivate user";
                });


                // ACTIVATE USER
                builder.addCase(activateUserData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.message = action.payload;
                })
                .addCase(activateUserData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(activateUserData.rejected, (state) => {
                    state.loading = false;
                    state.error = "Failed to activate user";
                });
      
         },
});

const userReducer = userSlice.reducer;

export default userReducer;