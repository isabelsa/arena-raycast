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

export function getChannelContents(arena: any, channel: any, set: any){
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

export function getBlockContents(arena: any){
  arena 
  .block(8693)
  .get()
  .then((block:Block) => console.log(block.title))
  .catch(console.error);
}

export function getUserChannels(arena: any){
  arena
  .user(23484)
  .channels()
  .then((user: any) => console.log(user.full_name));
}