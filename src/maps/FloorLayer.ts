import Layer from './Layer';
import MapLayer from './MapLayer';

export default class FloorLayer extends Layer {
  parent?: MapLayer;
  subLayers: Layer[] = [];
}