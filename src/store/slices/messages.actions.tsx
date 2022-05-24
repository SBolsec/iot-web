import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api/messages";
import { MessageFilter } from "../../api/types";

export const findAll = createAsyncThunk("messageSlice/findAll", api.findAll);

export const filter = createAction<MessageFilter>("messageSlice/filter");

export const reset = createAction("messageSlice/reset");
