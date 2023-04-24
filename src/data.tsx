type Block = {
  id: string
  name: string
  title?: string
  source: {
      title: string
    }
  image: {
    square: {
      url: string
    }
  }
}

export function getUserChannels(arena: any, userId: any){
  arena
  .user(userId)
  .channels()
  .then((channels : any) => {
    channels.map((x : any) => {
      
      const channel = {
        title: x.title,
        user: x.user.full_name,
        status: x.status,
        updated: x.updated_at
      } 

      // console.log(channel)
    })
  })
  .catch("EHHHHHHH", console.error);
}