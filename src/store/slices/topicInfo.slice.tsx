import { createSlice } from "@reduxjs/toolkit";

import { TopicInfoResponse } from "../../api/types";
import * as actions from "./topicInfo.actions";
import { StateWithStatus } from "../types";

export type State = StateWithStatus<TopicInfoResponse[]>;

const initialState = {
  result: [],
  status: "idle",
} as State;

const topicInfoSlice = createSlice({
  initialState,
  name: "topicInfoSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.findAll.pending, (state) => {
      state.status = "idle";
    });
    builder.addCase(actions.findAll.fulfilled, (state, action) => {
      state.status = "success";
      state.result = action.payload.sort((a, b) =>
        a.topic.localeCompare(b.topic)
      );
    });
    builder.addCase(actions.findAll.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const topicInfo = topicInfoSlice.reducer;
