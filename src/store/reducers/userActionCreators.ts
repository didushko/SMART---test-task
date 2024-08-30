import axios, { AxiosError } from "axios";
import { AppDispatch } from "../store";
import { userSlice } from "./userSlice";

const client = axios.create({
  withCredentials: true,
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getUsers =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.getUsers());
      const responce = await client.get("/users");
      dispatch(userSlice.actions.getUsersSuccess(responce.data));
    } catch (e: any) {
      if (e instanceof AxiosError) {
        dispatch(
          userSlice.actions.getUsersFail(e.response?.data || e.message)
        );
      } else dispatch(userSlice.actions.getUsersFail(e.message));
    }
  };
