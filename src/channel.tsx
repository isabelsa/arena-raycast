import { useEffect, useState } from "react";
import { ActionPanel, Action, Grid, Icon, getPreferenceValues, useNavigation } from "@raycast/api";
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

  const { pop } = useNavigation();

  useEffect(() => {
    getChannelContents(arena, channel, setItems, setIsLoading);
    
  }, []);

  return (
    <Grid columns={3} fit={Grid.Fit.Fill} isLoading={isLoading}>
      {items.map((i: any) => (
        <Grid.Item
          key={i.id}
          content={{ tooltip: i.title, value: i.image ?? generateThumbnail(i.title) }}
          subtitle={i.name}
          actions={
            <ActionPanel>
              <Action.Push title="View detail" target={<DetailView name={i.name} image={i.image} moreInfo={i}/>}></Action.Push>
              <Action.Push
                icon={Icon.PlusCircle}
                title="Add block to channel"
                target={<UploadView arena={arena} channel={channel} pop={pop} />}
              />
              <Action.CopyToClipboard content={i.image} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
