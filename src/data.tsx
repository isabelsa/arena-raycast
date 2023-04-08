import React from "react"
import fetch from "node-fetch";

const Arena = require("are.na");
const arena = new Arena();


export default function fetchBlocks(setState){

  const block = {id: {id}, name: content.title, image: content.image.thumb.url}

  arena
    .channel("arena-influences")
    .contents({ page: 1, per: 3 })
    .then((contents : any) => {
      contents.map((content: any) => {
        // console.log("Test ->", content)

        
        setState((prev : any) => [...prev, block]);
      });
    })
    .catch((err : any) => console.log(err));

  return null
}