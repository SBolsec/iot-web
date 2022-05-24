import { createSlice } from "@reduxjs/toolkit";

import { MessageFilter, MessageResponse } from "../../api/types";
import * as actions from "./messages.actions";
import { StateWithStatus } from "../types";

export type State = StateWithStatus<MessageResponse[]> & {
  filter: MessageFilter;
};

const initialFilterState: MessageFilter = {
  room: "",
  time: 120,
};

const initialState = {
  result: [],
  status: "idle",
  filter: initialFilterState,
} as State;

const messageSlice = createSlice({
  initialState,
  name: "messageSlice",
  reducers: {
    filter: (state, action) => {
      state.filter = action.payload;
    },
    reset: (state) => {
      state.filter = initialFilterState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.findAll.pending, (state) => {
      state.status = "idle";
    });
    builder.addCase(actions.findAll.fulfilled, (state, action) => {
      state.status = "success";
      state.result = action.payload;
    });
    builder.addCase(actions.findAll.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const message = messageSlice.reducer;
