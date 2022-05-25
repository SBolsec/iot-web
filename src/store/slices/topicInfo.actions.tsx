import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api/topicInfo";

export const findAll = createAsyncThunk("topicInfo/findAll", api.findAll);
