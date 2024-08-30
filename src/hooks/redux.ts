import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilteredSelector = () =>
  useSelector(
    createSelector(
      [
        (state: RootState) => state.userSlice,
        (state: RootState) => state.filtersSlice,
      ],
      (userSlice, filters) => {
        const filtered = userSlice.users.filter((user) => {
          for (const field in filters) {
            if (filters[field as keyof typeof filters]) {
              const userField = field as keyof typeof user;

              if (
                !(
                  userField in user &&
                  user[userField]
                    .toString()
                    .toLowerCase()
                    .includes(
                      filters[field as keyof typeof filters]!.toLowerCase()
                    )
                )
              ) {
                return false;
              }
            }
          }
          return true;
        });
        return {
          users: filtered,
          error: userSlice.error,
          isLoading: userSlice.isLoading,
        };
      }
    )
  );
