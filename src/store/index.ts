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
  childs?: Layer[];
  parent?: Layer;
};

async function mapToLayer(map: MapLayer): Promise<Layer> {
  let result: Layer;
  let image = await utils.loadImage(map.image);
  let childs = undefined;
  if (map.layers) {
    childs = await Promise.all(map.layers.map(async (layer) => {
      let item = await mapToLayer(layer);
      item.parent = result;
      return item;
    }));
  }
  result = {
    name: map.name,
    enabled: false,
    alpha: 1.0,
    image: image,
    childs: childs,
  };
  return result;
}

function findLayerInState(state: any, layer: any) {
  // if(layer && layer.parent){

  // }
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
      if (map) {
        state.map = map;
      }
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
      if(payload.target){
        payload.target.enabled = payload.enabled;
        return;
      }
      
      payload.enabled = !payload.enabled;
    },
    changeLayerAlphaAt(state, payload) {
      payload.target.alpha = payload.alpha;
    },
    changeScale(state, value){
      state.scale = value;
    },
    changeOffset(state, value){
      state.offset = value;
    },
    clearConfig(state){
      state.scale = 1;
      state.offset = {x: 0, y: 0}; 
    }
  },
  actions: {
    updateMap({ state, commit }, map) {
      if (map) {
        let initialScale = state.map === null;
        commit('changeMap', map);
        commit('clearLayers');
        (async () => {
          let s = true; // first sign
          for (const floor of map.floors) {
            let layer = await mapToLayer(floor);
            if (s) {
              layer.enabled = true;
              s = false;
            }
            commit('addLayer', layer);
          }
          if (initialScale) commit('changeScale', state.width / state.layers[0].image.naturalWidth);
        })();
      }
    }
  },
  modules: {
  }
});
