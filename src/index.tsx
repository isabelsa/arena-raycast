import { useEffect, useState } from "react";
import { ActionPanel, Action, Grid } from "@raycast/api";
import getChannelContents from "./data";

const Arena = require("are.na");
const arena = new Arena();


export default function Command() {
  const [items, setItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChannelContents(arena, "mood-omega", setItems)
  },[])


  console.log("State Items ->", items)
  
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
              <Action.CopyToClipboard content={image} />
              <Action.Push 
                title="More Info"
                icon={{
                  source: "info.svg",
                  tintColor: {
                    light: "#000",
                    dark: "#FFF",
                  }
                }}
                target={null}></Action.Push>
                <Action.OpenInBrowser title="Open in Browser" url={image}/>
            </ActionPanel>
          }
        />
        )}
    </Grid>
  );
}
