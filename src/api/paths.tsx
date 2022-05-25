import { FindMessagesQuery } from "./types";
import { createQuery } from "./util";

const API_BASE_URL =
  process.env.REACT_API_BASE_URL ||
  "http://iotrestapplication-env.eba-ye2disus.us-east-1.elasticbeanstalk.com";

const api = {
  messages: `${API_BASE_URL}/messages`,
  topicInfo: `${API_BASE_URL}/topic-info`,
};

export const message = {
  findAll: (query: FindMessagesQuery) =>
    `${api.messages}/?${createQuery(query)}`,
};

export const topicInfo = {
  findAll: api.topicInfo,
  create: api.topicInfo,
};
