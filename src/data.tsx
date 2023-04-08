type Block = {
  id: string
  name: string
  title: string
  source: {
      title: string
    }
  image: {
    square: {
      url: string
    }
  }
}

export default function getChannelContents(arena: any, channel: any, set: any){
  arena
  .channel(channel)
  .contents()
  .then((blocks: Block[]) => {
    blocks.map((x: Block) => {
      
      console.log("Block ->", x)
      
      const block = {
        id: x.id, 
        name: x.title, 
        title: x.source.title,
        image: x.image.square.url}
      set((prev : any) => [...prev, block]);
  })
  })
  .catch((err : any) => console.log(err));
}