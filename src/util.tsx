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

export function generateIcon(text: string, open: string, status: string): Image.ImageLike {
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
  const svgClosed = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <rect x="0" y="0" width="40" height="40" fill="#EDEDED" rx="10"></rect>
    <text
    font-size="21"
    fill="#333333"
    font-family="Verdana"
    text-anchor="middle"
    alignment-baseline="baseline"
    x="20.5"
    y="32.5">${letter}</text>
  </svg>
  `;

  if (open && status === 'public') {
    return {
      source: `data:image/svg+xml,${svgPublic}`,
    };
  } else if (status === 'closed') {
    return {
      source: `data:image/svg+xml,${svgClosed}`,
    };;
  } else if (status === 'private') {
    return {
      source: `data:image/svg+xml,${svgPrivate}`,
    };
  } else {
    return {
      source: `data:image/svg+xml,${svgPrivate}`,
    };
  }
  
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

export function getColour(open: string, status: string): string {
  if (open && status === 'public') {
    return 'green';
  } else if (status === 'closed') {
    return 'grey';
  } else if (status === 'private') {
    return 'red';
  } else {
    return 'yellow'; // default color if none of the conditions match
  }
}

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function prettifyDate(date: string): string{
  return capitalizeFirstLetter(formatDistance(new Date(), new Date(date)))
}

export function createURL(slug: string): string{
  const URL = "https://are.na/block/"
  const NEWURL = URL + slug

  return NEWURL
}

