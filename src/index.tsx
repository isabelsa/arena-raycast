import { useEffect, useState } from "react";
import { ActionPanel, Action, Icon, Grid, Color } from "@raycast/api";
import fetch from "node-fetch";

const Arena = require("are.na");
const arena = new Arena();


export default function Command() {
  const [items, setItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    arena
    .channel("arena-influences")
    .contents({ page: 1, per: 3 })
    .then((contents : any) => {
      contents.map((content: any) => {
        // console.log("Test ->", content)
        const block = {id: content.id, name: content.title, image: content.image.thumb.url}
        setItems((prev : any) => [...prev, block]);
      });
    })
    .catch((err : any) => console.log(err));
  },[])


  console.log("State Items ->", items)
  
  return (
    <Grid
      columns={3}
      inset={Grid.Inset.Large}
      isLoading={isLoading}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Grid Item Size"
          storeValue
          onChange={(newValue) => {
            setItemSize(newValue as Grid.ItemSize);
            setIsLoading(false);
          }}
        >
          <Grid.Dropdown.Item title="Large" value={Grid.Inset.Large} />
          <Grid.Dropdown.Item title="Medium" value={Grid.Inset.Medium} />
          <Grid.Dropdown.Item title="Small" value={Grid.Inset.Small} />
        </Grid.Dropdown>
      }
    >
      {items.map(({id, name, image}: any) => 
          <Grid.Item
          key={id}
          content={{ tooltip: name, value: { source: image } }}
          title={name}
          subtitle={name}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={image} />
            </ActionPanel>
          }
        />
        )}
    </Grid>
  );
}
