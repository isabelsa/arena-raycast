import { useEffect, useState } from "react";
import { ActionPanel, Action, Grid, Detail, Icon, getPreferenceValues } from "@raycast/api";
import { getIcon } from "./util";
import { Slug } from "./types";

import { getChannelContents } from "./data";
import { UploadView } from "./block";
import { DetailView } from "./block";

// Initialize are.na JS wrapper
const Arena = require("are.na");
const preferences = getPreferenceValues();
const arena = new Arena({ accessToken: preferences.token });

export default function Channel(slug: Slug) {
  const [channel] = useState(slug.id);
  const [items, setItems] = useState<string[]>([]);
  const [isLoading] = useState(true);

  useEffect(() => {
    getChannelContents(arena, channel, setItems);
  }, []);

  return (
    <Grid columns={3} fit={Grid.Fit.Fill} isLoading={isLoading}>
      <Grid.Item
        content={{ value: { source: Icon.PlusCircle }, tooltip: "Add block" }}
        title="Add block"
        subtitle="URL, Text"
        actions={
          <ActionPanel>
            <Action.Push title="Add block" target={<UploadView arena={arena} toChannel={channel} />} />
          </ActionPanel>
        }
      />
      {items.map(({ id, name, title, image }: any) => (
        <Grid.Item
          key={id}
          content={{ tooltip: title, value: image ?? getIcon(title) }}
          subtitle={name}
          actions={
            <ActionPanel>
              <Action.Push title="View Detail" target={<DetailView name={name} image={image} />}></Action.Push>
              <Action.CopyToClipboard content={image} />
              <Action.OpenInBrowser title="Open in Browser" url={image} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
