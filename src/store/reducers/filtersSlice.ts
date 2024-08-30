import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  phone: string | undefined;
}

const initialState: IState = {
  name: undefined,
  username: undefined,
  email: undefined,
  phone: undefined,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<IState>>) {
      state.name = action.payload.hasOwnProperty("name")
        ? action.payload.name
        : state.name;
      state.username = action.payload.hasOwnProperty("username")
        ? action.payload.username
        : state.username;
      state.email = action.payload.hasOwnProperty("email")
        ? action.payload.email
        : state.email;
      state.phone = action.payload.hasOwnProperty("phone")
        ? action.payload.phone
        : state.phone;
    },
    clearFilters(state) {
      state.name = undefined;
      state.username = undefined;
      state.email = undefined;
      state.phone = undefined;
    },
  },
});

export default filtersSlice.reducer;
