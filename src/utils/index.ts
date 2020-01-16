export function loadImage(path: string): HTMLImageElement {
  let image = new Image();
  image.src = path;
  return image;
}