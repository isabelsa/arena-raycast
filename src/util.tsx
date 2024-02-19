import { Icon, Image, List } from "@raycast/api";
import { formatDistance } from "date-fns"


export function generateThumbnail(text: string): Image.ImageLike {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect x="0" y="0" width="400" height="400" fill="#fff"></rect>
  <text
    x="8"
    y="20"
    font-size="20"
    fill="black"
    font-family="Verdana"
    text-anchor="left"
    alignment-baseline="baseline"
 >${text}</text>
</svg>
  `;

  return {
    source: `data:image/svg+xml,${svg}`,
  };
}

export function generateIcon(text: string, type: any): Image.ImageLike {
  const truncate = Array.from(text)[0];
  const letter = truncate.toString().toUpperCase();

  const svgPrivate = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <rect x="0" y="0" width="40" height="40" fill="#FBD6D3" rx="10"></rect>
    <text
    font-size="21"
    fill="#AB4642"
    font-family="Verdana"
    text-anchor="middle"
    alignment-baseline="baseline"
    x="20.5"
    y="32.5">${letter}</text>
  </svg>
  `;

  const svgPublic = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <rect x="0" y="0" width="40" height="40" fill="#DDF6D9" rx="10"></rect>
    <text
    font-size="21"
    fill="#417E30"
    font-family="Verdana"
    text-anchor="middle"
    alignment-baseline="baseline"
    x="20.5"
    y="32.5">${letter}</text>
  </svg>
  `;


  if(type){
    return {
      source: `data:image/svg+xml,${svgPublic}`,
    };
  }

  return {
    source: `data:image/svg+xml,${svgPrivate}`,
  };
  

  
}


export function getAccessories(updated: string, size: string) {
  const accessories = new Array<List.Item.Accessory>();
  const result = prettifyDate(updated)

  if(updated){
    accessories.push({ text: `${result}` });
  }

  if(size){
    accessories.push({  icon: Icon.AppWindowGrid2x2, text: `${size}` });
  }

  return accessories;
}


// String manipulation

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function prettifyDate(date: string){
  return capitalizeFirstLetter(formatDistance(new Date(), new Date(date)))
}

