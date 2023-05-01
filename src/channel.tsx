import { useEffect, useState } from "react";
import { ActionPanel, Action, Grid, Icon, getPreferenceValues } from "@raycast/api";
import { generateThumbnail } from "./util";
import { Slug } from "./types";

import { getChannelContents } from "./data";
import { UploadView } from "./block";
import { DetailView } from "./block";

// Initialize are.na JS wrapper
const Arena = require("are.na");
const preferences = getPreferenceValues();
const arena = new Arena({ accessToken: preferences.token });

export default function Channel(slug: Slug) {
  const [channel] = useState<string>(slug.id);
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChannelContents(arena, channel, setItems, setIsLoading);
  }, []);

  return (
    <Grid columns={3} fit={Grid.Fit.Fill} isLoading={isLoading}>
      {items.map(({ id, name, title, image }: any) => (
        <Grid.Item
          key={id}
          content={{ tooltip: title, value: image ?? generateThumbnail(title) }}
          subtitle={name}
          actions={
            <ActionPanel>
              <Action.Push title="View metadata" target={<DetailView name={name} image={image} />}></Action.Push>
              <Action.Push
                icon={Icon.PlusCircle}
                title="Add block"
                target={<UploadView arena={arena} toChannel={channel} />}
              />
              <Action.CopyToClipboard content={image} />
              <Action.OpenInBrowser title="Open in Browser" url={image} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
