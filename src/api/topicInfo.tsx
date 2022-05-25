import * as paths from "./paths";
import { CreateTopicInfoCommand, TopicInfoResponse } from "./types";

// GET /topic-info
export async function findAll(): Promise<TopicInfoResponse[]> {
  const response = await fetch(paths.topicInfo.findAll);

  if (response.status !== 200) {
    throw new Error("Backend died");
  }

  return response.json();
}

// POST /topic-info
export async function create(command: CreateTopicInfoCommand): Promise<void> {
  const response = await fetch(paths.topicInfo.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (response.status !== 200) {
    throw new Error("Backend died");
  }
}
