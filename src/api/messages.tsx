import * as paths from "./paths";
import { FindMessagesQuery, MessageResponse } from "./types";

// GET /messages
export async function findAll(
  query: FindMessagesQuery
): Promise<MessageResponse[]> {
  const response = await fetch(paths.message.findAll(query));

  if (response.status !== 200) {
    throw new Error("Backend died");
  }

  return response.json();
}
