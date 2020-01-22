import Vue from 'vue';
import Vuex, { mapActions, StoreOptions } from 'vuex';
import { R6Map, MapLayer } from '@/maps';
import * as utils from '@/utils';
import Konva from 'konva';

Vue.use(Vuex);

// represent an image or drawing
interface Layer {
  id: string;
  mapid: string;
  enabled: boolean;
  requestReset: boolean;

  image: HTMLImageElement;
  complete: boolean;

  draggable: boolean;
  opacity: number;
  offset: { x: number, y: number; };

  childs: Layer[];
  parent: Layer | null;
}

function mapToLayer(maplayer: MapLayer): Layer {
  let result: Layer;
  let image = utils.loadImage(maplayer.image);
  let childs: Layer[] = [];
  if (maplayer.layers) {
    childs = maplayer.layers.map((layer) => {
      let item = mapToLayer(layer);
      item.id = [maplayer.id, item.id].join('.');
      item.parent = result;
      return item;
    });
  }
  result = {
    id: maplayer.id,
    mapid: maplayer.mapid,
    enabled: false,
    requestReset: false,

    image: image,
    complete: false,

    draggable: false,
    opacity: 1,
    offset: { x: 0, y: 0 },

    childs: childs,
    parent: null
  };
  return result;
}

export default new Vuex.Store({
  state: {
    map: null as R6Map | null,
    layers: [] as Layer[],
    // stage config
    width: 100,
    height: 100,
    scale: 1,
    draggable: true,
    offset: {
      x: 0,
      y: 0,
    }
  },
  mutations: {
    changeMap(state, map) {
      state.map = map;
    },
    changeCanvasSize(state, payload) {
      state.width = payload.x;
      state.height = payload.y;
    },
    changeScale(state, value) {
      if (typeof value === 'number') {
        state.scale = value;
      }
    },
    changeOffset(state, value) {
      state.offset = value;
    },
    clearConfig(state) {
      state.scale = 1;
      state.offset = { x: 0, y: 0 };
      state.draggable = true;
    },
    changeDraggable(state, value){
      state.draggable = value;
    },

    // Layer methods:
    addLayer(state, layer) {
      state.layers.push(layer);
    },
    clearLayers(state) {
      state.layers = [];
    },
    resetLayer(state, layer){
      layer
    },

    // payload: {layer: Layer, enabled: boolean} or layer itself
    toggleLayer(state, payload) {
      if (payload.layer) {
        payload.layer.enabled = payload.enabled;
        return;
      }

      payload.enabled = !payload.enabled;
    },
    changeLayerOpacity(state, { layer, opacity }) {
      layer.opacity = opacity;
    },
    changeLayerOffset(state, { layer, offset }) {
      layer.offset = offset;
    },
    changeLayerKey(state, { layer, key, value }) {
      layer[key] = value;
    }
  },
  actions: {
    updateMap({ state, commit }, map) {
      if (!map) {
        return;
      }
      let initialScale = state.map === null;
      commit('clearLayers');
      commit('changeMap', map);
      let s = true; // first sign
      for (const floor of map.floors) {
        let layer = mapToLayer(floor);
        if (s) {
          layer.image.onload = () => {
            layer.enabled = true;
            layer.complete = true;
            if (initialScale) {
              commit('changeScale', state.width / state.layers[0].image.naturalWidth);
              initialScale = false;
            }
          };
          s = false;
        } else {
          layer.image.onload = () => {
            layer.complete = true;
          };
        }
        commit('addLayer', layer);
      }
    }
  },
  modules: {
  }
});
