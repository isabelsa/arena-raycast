import type Arena from "are.na";
import { Action, ActionPanel, List, showToast, Toast } from "@raycast/api";
import { generateIcon, getAccessories, createURL } from "./util";
import { useState, useEffect } from "react";
import { getChannelsForAuthenticatedUser } from "./arena";
import Channel from "./channel";

export default function SearchOwnChannels() {
  const [channels, setChannels] = useState<Arena.Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const channels = await getChannelsForAuthenticatedUser();
      setChannels(channels);
    } catch (e) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to load channels",
        message: "An error occurred while loading channels.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <List isLoading={isLoading} navigationTitle="Search for channels" searchBarPlaceholder="Search for channels ">
      {channels.length === 0 ? (
        <List.EmptyView />
      ) : (
        channels.map((item, index) => (
          <List.Item
            icon={generateIcon(item.title, item.open, item.status)}
            key={index}
            title={item.title}
            accessories={getAccessories(item.updated_at, item.length.toString())}
            actions={
              <ActionPanel>
                <Action.Push title="View channel details" target={<Channel id={item.slug} />}></Action.Push>
                <Action.OpenInBrowser
                  title="Open in Are.na"
                  url={createURL("channel", item.slug, item.user.slug)}
                ></Action.OpenInBrowser>
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
