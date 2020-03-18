export interface R6Map {
  id: string;
  coverSrc: string;
  floorScreenshotPath?: {
    n?: string[],
    e?: string[],
    s?: string[],
    w?: string[],
    top?: string[],
  };
  floorBlueprintPath?: string[];
}

export const fileNames = [
  'bank_cover.webp',
  'bartlett_cover.jpg',
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
  'oregon_cover.jpg',
  'outback_cover.webp',
  'plane_cover.jpg',
  'skyscraper_cover.jpg',
  'themepark_cover.webp',
  'tower_cover.webp',
  'villa_cover.webp',
  'yacht_cover.webp',
];

// A map ID is 'bank' in 'bank_cover.webp'
const mapIds: string[] = fileNames.map((name) => {
  const regex = /^([A-Za-z0-9]+)_/;
  // must conform the name format
  if (!regex.test(name)) {
    console.error(`Can't extract id from file name: ${name}`);
    return '';
  }
  return name.match(regex)![1];
}).filter((it) => it !== '');

// a context to handy retrive the map image
export const requireMapFile = require.context('@/assets/maps/', true);

const maps: { [key: string]: R6Map; } = Object.fromEntries(mapIds.map((mapId) => {
  let nprefix = `./${mapId}/screenshots/n`;
  // TODO make all NESW direction?

  let bpprefix = `./${mapId}/blueprints`;

  let screenshots = requireMapFile.keys().filter((path) => {
    return path.startsWith(nprefix);
  });

  let blueprints = requireMapFile.keys().filter((path) => {
    return path.startsWith(bpprefix);
  });

  let map: R6Map = {
    id: mapId,
    coverSrc: getMapCoverFileName(mapId)!,
    floorScreenshotPath: { n: screenshots },
    floorBlueprintPath: blueprints
  };

  return [mapId, map];
}));


function getMapCoverFileName(mapId: string) {
  return fileNames.find((it) => it.startsWith(mapId));
}

export default maps;

export * from './Layer';
export * from './MapLayer';
export * from './FloorLayer';