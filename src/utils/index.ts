// export function loadImage(path: string): HTMLImageElement {
//   let image = new Image();
//   image.src = path;
//   return image;
// }

export function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = path;
  });
}

export function getFileName(path: string): any {
  let temp = path.split('/').pop();
  if (!temp) temp = path;
  let dot = temp.lastIndexOf('.');
  if (dot === -1) {
    return temp;
  }
  return temp.slice(0, dot);

}