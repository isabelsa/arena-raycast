import { Action, ActionPanel, List, getPreferenceValues } from "@raycast/api";
import { getIcon, getAccessories } from "./util";
import { search } from "./data";
import { State } from "./types";
import { useState, useEffect } from "react";

import Channel from "./channel";

const preferences = getPreferenceValues();
const Arena = require("are.na");
const arena = new Arena({ accessToken: preferences.token });

export default function SearchArena() {
  const [state, setState] = useState<State>({ searchText: "", items: [] });

  useEffect(() => {
    search(arena, state, setState);
  }, [state.searchText]);

  console.log(state);

  return (
    <List
      navigationTitle="Search for channels"
      searchBarPlaceholder="Search for channels "
      onSearchTextChange={(newValue) => setState((previous) => ({ ...previous, searchText: newValue }))}
    >
      {state.searchText === "" && state.items.length === 0 ? (
        <List.EmptyView title="Type something to get started" />
      ) : (
        state.items.map((item, index) => (
          <List.Item
            icon={getIcon(1)}
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
