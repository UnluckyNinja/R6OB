export function loadImage(path: string): Promise<HTMLImageElement> {
  let image = new Image();
  image.src = path;
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image);
    };
  });
}