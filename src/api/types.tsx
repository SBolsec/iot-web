export type FindMessagesQuery = {
  minutes?: number;
};

export type MessageResponse = {
  id: string;
  timestamp: string;
  topic: string;
  payload: string;
};

export type MessageFilter = {
  room: string;
  time: number;
};

export type TopicInfoCommand = {
  room: number;
  threshold: number;
};

export type TopicInfoResponse = {
  topic: string;
  threshold: number;
  turnedOn: boolean;
};
