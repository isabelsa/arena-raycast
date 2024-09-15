import { getPreferenceValues } from "@raycast/api";
import Arena from "are.na";

const preferences = getPreferenceValues();
const arena = new Arena({ accessToken: preferences.token });

const getChannelsForUser = (user: Arena.User): Promise<Arena.Channel[]> => arena.user(user.slug).channels();

// @ts-expect-error: The 'me' method exists in our forked version of the Arena library
// We've extended the Arena type to include the 'me' method for authenticated user operations
const getAuthenticatedUser = (): Promise<Arena.User> => arena.me().get();

export const getChannelsForAuthenticatedUser = async (): Promise<Arena.Channel[]> => {
  const user = await getAuthenticatedUser();
  return getChannelsForUser(user);
};
