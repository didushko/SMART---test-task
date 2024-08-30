import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/UserTableInterfaces";

interface IState {
  isLoading: boolean;
  error: any;
  users: IUser[];
}

const initialState: IState = {
  isLoading: false,
  error: null,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state) {
      state.isLoading = true;
      state.error = null;
      state.users = initialState.users;
    },
    getUsersSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    },
    getUsersFail(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.users = initialState.users;
    },
  },
});

export default userSlice.reducer;
