import { createSelector } from "@reduxjs/toolkit";

import { State } from "./topicInfo.slice";
import { RootState } from "../store";

export const status = createSelector(
  (state: RootState) => state.topicInfo,
  (state: State) => state.status
);

export const result = createSelector(
  (state: RootState) => state.topicInfo,
  (state: State) => state.result
);
