import { Block } from "./types";

export function getChannelContents(arena: any, channel: any, set: any, setIsLoading: any) {
  arena
    .channel(channel, { page: 1, per: 150, direction: "desc" })
    .contents()
    .then((blocks: Block[]) => {
      blocks.map((x: Block) => {
        const block = {
          id: x.id,
          name: x.title,
          title: x.source?.title || x.content || x.generated_title,
          image: x.image?.square?.url,
          content: x.content,
          createdAt: x.created_at,
          commentCount: x.commentCount,
          description: x.description,
          source: x.source?.url,
        };

        set((prev: any) => [...prev, block]);
      });
    })
    .then(() => setIsLoading(false))
    .catch((err: any) => console.log(err));
}
