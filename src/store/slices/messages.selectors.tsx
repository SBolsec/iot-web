import { createSelector } from "@reduxjs/toolkit";

import { State } from "./messages.slice";
import { RootState } from "../store";

export const status = createSelector(
  (state: RootState) => state.message,
  (state: State) => state.status
);

export const result = createSelector(
  (state: RootState) => state.message,
  (state: State) => {
    if (state.status === "success") {
      return state.result;
    } else {
      throw new Error("Messages not loaded");
    }
  }
);

export const filter = createSelector(
  (state: RootState) => state.message,
  (state: State) => state.filter
);
