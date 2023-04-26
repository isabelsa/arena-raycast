import { Icon, Image, List } from "@raycast/api";

export function getIcon(text: any): Image.ImageLike {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <rect x="0" y="0" width="40" height="40" fill="#fff" rx="10"></rect>
  <text
  font-size="22"
  fill="white"
  font-family="Verdana"
  text-anchor="middle"
  alignment-baseline="baseline"
  x="20.5"
  y="32.5">${text}</text>
</svg>
  `;

  return {
    source: `data:image/svg+xml,${svg}`,
  };
}

//Select icon type

export function getAccessories(item: any, itemTwo: any) {
  const accessories = new Array<List.Item.Accessory>();

  accessories.push({ icon: Icon.AppWindowList, text: `${item} items` });

  return accessories;
}
