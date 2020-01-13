export interface R6Map {
  name: string;
  coverSrc: string;
  floors: string[];
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

const maps: R6Map[] = fileNames.map((file) => {
  const name = file.match(/^(.*)_/)![1];
  return {
    name,
    coverSrc: file,
    floors: []
  };
});

export default maps;