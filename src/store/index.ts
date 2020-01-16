import Vue from 'vue';
import Vuex, { mapActions, StoreOptions } from 'vuex';
import { R6Map, MapLayer } from '@/maps';
import * as utils from '@/utils';

Vue.use(Vuex);

// represent an image or drawing
type Layer = {
  name: string;
  enabled: boolean;
  alpha: number;
  image: HTMLImageElement;
  complete: boolean;
  childs?: Layer[];
  parent?: Layer;
};

function mapToLayer(map: MapLayer): Layer {
  let result: Layer;
  let image = utils.loadImage(map.image);
  let childs = undefined;
  if (map.layers) {
    childs = map.layers.map((layer) => {
      let item = mapToLayer(layer);
      item.parent = result;
      return item;
    });
  }
  result = {
    name: map.name,
    enabled: false,
    alpha: 1.0,
    image: image,
    complete: false,
    childs: childs,
  };
  return result;
}

export default new Vuex.Store({
  state: {
    map: null as R6Map | null,
    width: 100,
    height: 100,
    layers: [] as Layer[],
    scale: 1,
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
    addLayer(state, layer) {
      state.layers.push(layer);
    },
    clearLayers(state) {
      state.layers = [];
    },
    toggleLayerAt(state, payload) {
      if (payload.target) {
        payload.target.enabled = payload.enabled;
        return;
      }

      payload.enabled = !payload.enabled;
    },
    changeLayerAlphaAt(state, payload) {
      payload.target.alpha = payload.alpha;
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
