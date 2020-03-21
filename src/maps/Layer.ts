import { loadImage } from '@/utils';

export default class Layer {
  readonly id: string;
  readonly mapid: string;

  protected filePath!: string;
  image?: HTMLImageElement;

  config: LayerConfig = {
    enabled: false,
    draggable: false,
    opacity: 1.0,
    position: { x: 0, y: 0 }
  };

  constructor(id: string, mapid: string, image?: HTMLImageElement) {
    this.id = id;
    this.mapid = mapid;
    this.image = image;
  }

  load(path: string): Layer {
    this.filePath = path;
    loadImage(path).then((img)=> this.image = img);
    return this;
  }
  reload(): Layer {
    loadImage(this.filePath).then((img) => this.image = img);
    return this;
  }
}

export interface LayerConfig {
  enabled: boolean;
  draggable: boolean;
  opacity: number;
  position: { x: number, y: number; };
}