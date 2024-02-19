import { Block, State } from "./types";


// Search functions
export function searchAllChannels(arena: any, state: State, setState: any, setIsLoading: any) {
  setIsLoading(true);

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
    })
    .then(() => setIsLoading(false))
    .catch((err: any) => console.log(err));
}

export function searchOwnChannels(arena: any, state: State, setState: any, setIsLoading: any) {
  setIsLoading(true);

  arena
  .user("citizen-citizen")
  .channels()
  .then((channels: any) => {
    channels.map((ch: any) => {
      const channel = {
        index: ch.id,
        title: ch.title,
        user: ch.user.full_name,
        length: ch.length,
        updated: ch.updated_at,
      };

      setState((prev: any) => ({ ...prev, items: [...channels] }));
    });
  })
  .then(() => setIsLoading(false))
  .catch((err: any) => console.log(err));

}


//Channel functions
export function getChannelContents(arena: any, channel: any, set: any, setIsLoading: any) {
  arena
    .channel(channel)
    .contents()
    .then((blocks: Block[]) => {
      blocks.map((x: Block) => {
        //console.log("Block ->", x);

        const block = {
          id: x.id,
          name: x.title,
          title: x.source?.title || x.content || x.generated_title,
          image: x.image?.square?.url,
          content: x.content,
          createdAt: x.created_at,
          commentCount: x.commentCount,
          description: x.description,
          source: x.source?.url  

        };

        set((prev: any) => [...prev, block]);
      });
    })
    .then(() => setIsLoading(false))
    .catch((err: any) => console.log(err));
}
