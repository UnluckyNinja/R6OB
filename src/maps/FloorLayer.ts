import Layer from './Layer';
import MapLayer from './MapLayer';

export default class FloorLayer extends Layer {
  readonly index: number = parseInt(this.id)-1;

  i18nPath = `map.${this.mapid}.floors[${this.index}]`;
  parent?: MapLayer;
  subLayers: Layer[] = [];
}