import { Action, ActionPanel, List, getPreferenceValues } from "@raycast/api";
import { generateIcon, getAccessories } from "./util";
import { search } from "./data";
import { State } from "./types";
import { useState, useEffect } from "react";

import Channel from "./channel";

const preferences = getPreferenceValues();
const Arena = require("are.na");
const arena = new Arena({ accessToken: preferences.token });

export default function SearchArena() {
  const [state, setState] = useState<State>({ searchText: "", items: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    search(arena, state, setState, setIsLoading);
  }, [state.searchText]);

  console.log(state);

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Search for channels"
      searchBarPlaceholder="Search for channels "
      onSearchTextChange={(newValue) => setState((previous) => ({ ...previous, searchText: newValue }))}
    >
      {state.searchText === "" && state.items.length === 0 ? (
        <List.EmptyView title="Type something to get started" />
      ) : (
        state.items.map((item, index) => (
          <List.Item
            icon={generateIcon(1)}
            key={index}
            title={item.title}
            accessories={getAccessories(item.length.toString(), item.follower_count.toString())}
            actions={
              <ActionPanel>
                <Action.Push title="View Detail" target={<Channel id={item.slug} />}></Action.Push>
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
