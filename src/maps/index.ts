export interface R6Map {
  name: string;
  coverSrc: string;
  floors: MapLayer[];
}

export interface MapLayer {
  name: string;
  image: string;
  layers: MapLayer[];
}

const fileNames = [
  'bank_cover.webp',
  'border_cover.webp',
  'chalet_cover.webp',
  'clubhouse_cover.jpg',
  'coastline_cover.webp',
  'consulate_cover.jpg',
  'favela_cover.webp',
  'fortress_cover.webp',
  'hereford_cover.webp',
  'house_cover.webp',
  'kafe_cover.jpg',
  'kanal_cover.webp',
  'oregon_cover.webp',
  'outback_cover.webp',
  'plane_cover.jpg',
  'skyscraper_cover.jpg',
  'themepark_cover.webp',
  'tower_cover.webp',
  'villa_cover.webp',
  'yacht_cover.webp',
];

const floorSrc = require.context('@/assets/maps/', true);

const maps: R6Map[] = fileNames.map((file) => {
  const regex = /^(.*)_/;
  if (!regex.test(file)) throw `illegal map file name: ${file}`;

  const name = file.match(regex)![1];
  let files = floorSrc.keys().filter((path) => {
    return path.startsWith(`./${name}`);
  });

  // floors
  let layers: MapLayer[] = files.map((path) => {
    return {
      name: filename(path),
      image: floorSrc(path),
      layers: []
    };
  });
  return {
    name,
    coverSrc: file,
    floors: layers,
  };
});

function filename(path: string): any {
  let temp = path.split('/').pop();
  if (!temp) temp = path;
  let dot = temp.lastIndexOf('.');
  if (dot === -1) {
    return temp;
  }
  return temp.slice(0, dot);

}

export default maps;