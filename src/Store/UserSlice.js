/* UserSlice.js:

   Reducer Definition:
   -> This file contains the definition of a Redux reducer (a slice of the global state)
      specific to user-related actions and state.

   Action Creators:
   -> It includes action creators, which are functions responsible for creating actions.
      Actions are objects that describe changes to the state.

   Initial State:
   -> The initial state of the user-related slice is often defined in this file.
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import hostName from '../config';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userCredentials) => {
    try {
      const request = await axios.post(`${hostName}/api/login`, userCredentials);
      const response = await request.data.data;
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials';
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default UserSlice.reducer;
