import { Block, State } from "./types";

export function search(arena: any, state: State, setState: any) {
  arena
    .search(state.searchText)
    .channels()
    .then((channels: any) => {
      channels.map((chan: any) => {
        const channel = {
          index: chan.id,
          title: chan.title,
          user: chan.user.full_name,
          length: chan.length,
          updated: chan.updated_at,
        };

        setState((prev: any) => ({ ...prev, items: [...channels] }));
      });
    });
}

export function getChannelContents(arena: any, channel: any, set: any) {
  arena
    .channel(channel)
    .contents()
    .then((blocks: Block[]) => {
      blocks.map((x: Block) => {
        console.log("Block ->", x);

        const block = {
          id: x.id,
          name: x.title,
          title: x.source?.title || x.content || x.generated_title,
          image: x.image?.square?.url,
          content: x.content,
        };
        set((prev: any) => [...prev, block]);
      });
    })
    .catch((err: any) => console.log(err));
}
