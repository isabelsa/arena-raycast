import { useEffect, useState } from "react";
import { ActionPanel, Action, Grid, Icon, getPreferenceValues, useNavigation } from "@raycast/api";
import { generateThumbnail, createURL } from "./util";
import { Slug } from "./types";

import { getChannelContents } from "./data";
import { UploadView } from "./block";

// Initialize are.na JS wrapper
const Arena = require("are.na");
const preferences = getPreferenceValues();
const arena = new Arena({ accessToken: preferences.token });

export default function Channel(slug: Slug) {
  const [channel] = useState<string>(slug.id);
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { pop } = useNavigation();

  useEffect(() => {
    getChannelContents(arena, channel, setItems, setIsLoading);
  }, []);

  return (
    <Grid columns={3} fit={Grid.Fit.Fill} isLoading={isLoading}>
      {items.length === 0 ? (
      <Grid.EmptyView icon={Icon.Binoculars} title="No blocks in this channel" />
      ) : (
        items.map((i: any) => (
        <Grid.Item
          key={i.id}
          content={{ tooltip: i.title, value: i.image ?? generateThumbnail(i.title) }}
          subtitle={i.name}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open in Are.na" url={createURL("block", i.id)} ></Action.OpenInBrowser>
              <Action.Push
                icon={Icon.PlusCircle}
                title="Add block to channel"
                target={<UploadView arena={arena} channel={channel} pop={pop} />}
              />
              <Action.CopyToClipboard content={i.image} />
            </ActionPanel>}
          />
          ))
      )}
    </Grid>
  );
}
