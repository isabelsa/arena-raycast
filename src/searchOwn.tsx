import { Action, ActionPanel, List, getPreferenceValues } from "@raycast/api";
import { generateIcon, getAccessories, createURL } from "./util";
import { getOwnChannels } from "./data";
import { State } from "./types";
import { useState, useEffect } from "react";

import Channel from "./channel";

const preferences = getPreferenceValues();
const Arena = require("are.na");
const arena = new Arena({ accessToken: preferences.token });


export default function SearchOwnChannels() {
  const [state, setState] = useState<State>({ searchText: "", items: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOwnChannels(arena, state, setState, setIsLoading);

    console.log("RUNNNING CHANNEL")
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
            accessories={getAccessories(item.updated_at, item.length.toString())}
            actions={
              <ActionPanel>
                <Action.Push title="View channel details" target={<Channel id={item.slug} />}></Action.Push>
                <Action.OpenInBrowser title="Open in Are.na" url={createURL("channel", item.slug, item.user.slug)} ></Action.OpenInBrowser>
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
