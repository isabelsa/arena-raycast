import {useState, useEffect} from "react"
import {List, Grid, Icon, Image, getPreferenceValues} from "@raycast/api"
import {getIcon} from "./util"

const preferences = getPreferenceValues();
const Arena = require("are.na");
const arena = new Arena({ accessToken: preferences.token });

interface Channel {
  index: string;
  title: string;
  user: string;
  length: number;
  updated: string;
}

interface State {
  searchText: string;
  items: Channel[];
}

function search(state: State, setState: any){
  console.log("trigger")
  arena
  .search(state.searchText)
  .channels()
  .then((channels: any) => {
    
    console.log(channels)

    channels.map((chan: any) => {      
      const channel = {
        index: chan.id,
        title: chan.title,
        user: chan.user.full_name,
        length: chan.length,
        updated: chan.updated_at
      }

     setState((prev) => ({...prev, items: [...channels] }))
    });
  });
}

export default function SearchArena() {
  const [state, setState] = useState<State>({ searchText: "", items: [] });

  useEffect(() => {
    search(state, setState)
  }, [state.searchText]);

  console.log(state)



  return (
    <List 
    navigationTitle="Search for channels"
    searchBarPlaceholder="Search for channels " 
    onSearchTextChange={(newValue) => setState((previous) => ({ ...previous, searchText: newValue }))}>
      {state.searchText === "" && state.items.length === 0 ? (
        <List.EmptyView icon={{ source: "https://placekitten.com/500/500" }} title="Type something to get started" />
      ) : (
        state.items.map((item, index) => <List.Item icon={getIcon(1)} key={index} title={item.title} />)
      )}
    </List>
  );
}