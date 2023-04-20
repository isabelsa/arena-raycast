import { useEffect, useState } from "react";
import { ActionPanel, Action, Grid, Detail } from "@raycast/api";
import { getChannelContents } from "./data";

const Arena = require("are.na");
const arena = new Arena();

const createBlockMarkdown = (title: any, image: any) => {
  return `![Illustration](${image})`;
};

export default function GetChannelContents() {
  const [items, setItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChannelContents(arena, "mood-omega", setItems)
  },[])

  
  return (
    <Grid
      columns={3}
      fit={Grid.Fit.Fill}
      isLoading={isLoading}
    >
      {items.map(({id, name, title, image}: any) => 
          <Grid.Item
          key={id}
          content={{ tooltip: title, value: { source: image } }}
          subtitle={name}
          actions={
            <ActionPanel>
               <Action.Push 
                title="View Detail"
                target={
                  <Detail
                  markdown={createBlockMarkdown(title, image)}
                  metadata={
                    <Detail.Metadata>
                      <Detail.Metadata.Link title="Author" target={name} text={name} />
                      <Detail.Metadata.Separator />
                      <Detail.Metadata.TagList title="Statistics">
                        <Detail.Metadata.TagList.Item text={`❤️ ${name}`} color={name} />
                        <Detail.Metadata.TagList.Item text={`👁 ${name}`} color={name} />
                      </Detail.Metadata.TagList>
                    </Detail.Metadata>
                  } 
                />}
                >
                </Action.Push>
              <Action.CopyToClipboard content={image} />
              <Action.OpenInBrowser title="Open in Browser" url={image}/>
            </ActionPanel>
          }
        />  
        )}
    </Grid>
  );
}
