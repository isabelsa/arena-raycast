import { Cache } from "@raycast/api";
import Arena from "are.na";

const cache = new Cache({ namespace: "arena-raycast" });

const AUTH_CHANNEL_KEY = "authenticated-user-channels";

export const getCachedAuthenticatedChannels = () => {
  const channels = cache.get(AUTH_CHANNEL_KEY);

  if (!channels) {
    return [];
  }

  return JSON.parse(channels) as Arena.Channel[];
};

export const setCachedAuthenticatedChannels = (channels: Arena.Channel[]) => {
  cache.set(AUTH_CHANNEL_KEY, JSON.stringify(channels));
};
