// messages

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

// topic-info

export type CreateTopicInfoCommand = {
  room: number;
  threshold: number;
};

export type TopicInfoResponse = {
  topic: string;
  threshold: number;
  turnedOn: boolean;
};
