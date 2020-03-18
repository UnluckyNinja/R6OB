import Layer from './Layer';
import FloorLayer from './FloorLayer';

export default class MapLayer extends Layer {
  floors: FloorLayer[] = [];
  addFloor(floor: FloorLayer) {
    floor.parent = this;
    this.floors.push(floor);
  }
  setFloor(index: number, floor: FloorLayer, ) {
    floor.parent = this;
    this.floors[index] = floor;
  }
}