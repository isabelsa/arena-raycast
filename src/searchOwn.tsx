import { Action, ActionPanel, List, getPreferenceValues } from "@raycast/api";
import { generateIcon, getAccessories } from "./util";
import { searchOwnChannels } from "./data";
import { State } from "./types";
import { useState, useEffect } from "react";

import Channel from "./channel";

const preferences = getPreferenceValues();
const Arena = require("are.na");
const arena = new Arena({ accessToken: preferences.token });


export default function SearchOwnChannels() {
  const [state, setState] = useState<State>({ searchText: "", items: [] });
  const [isLoading, setIsLoading] = useState(true);
  
  console.log("TEstinG", arena)

  useEffect(() => {
    searchOwnChannels(arena, state, setState, setIsLoading);
  }, [state.searchText]);

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Search for channels"
      searchBarPlaceholder="Search for channels "
      onSearchTextChange={(newValue) => setState((prev) => ({ ...prev, searchText: newValue }))}
    >
      {state.searchText === "" && state.items.length === 0 ? (
        <List.EmptyView title="Type something to get started" />
      ) : (
        state.items.map((item, index) => (
          <List.Item
            icon={generateIcon(item.title, item.open, item.status)}
            key={index}
            title={item.title}
            accessories={getAccessories(item.updated_at, item.length.toString(),)}
            actions={
              <ActionPanel>
                <Action.Push title="View channel details" target={<Channel id={item.slug} />}></Action.Push>
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
