import Vue from 'vue';
import Vuex, { mapActions, StoreOptions } from 'vuex';
import maps, { R6Map, requireMapFile } from '@/maps';
import * as utils from '@/utils';
import Konva from 'konva';
import MapLayer from '@/maps/MapLayer';
import Layer from '@/maps/Layer';
import FloorLayer from '@/maps/FloorLayer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // mapList: maps,
    map: {} as MapLayer,
    // stage config
    stageConfig: {
      width: 100,
      height: 100,
      scale: 1,
      draggable: true,
      offset: {
        x: 0,
        y: 0,
      }
    } as any
  },
  mutations: {
    changeMap(state, map) {
      state.map = map;
    },
    // changeCanvasSize(state, payload) {
    //   state.width = payload.x;
    //   state.height = payload.y;
    // },
    changeConfig(state, { name, value }) {
      if (typeof value === 'function') {
        state.stageConfig[name] = value(state.stageConfig[name]);
      } else {
        state.stageConfig[name] = value;
      }
    },
    resetConfig(state) {
      state.stageConfig.scale = 1;
      state.stageConfig.offset = { x: 0, y: 0 };
      state.stageConfig.draggable = true;
    }
  },
  actions: {
    loadMap({ state, commit }, { mapId, blueprint = false }: { mapId: string, blueprint: boolean; }) {
      let map = maps[mapId];

      let files: string[];

      // determine which set of images to display
      if (blueprint) {
        if (!map.floorBlueprintPath) {
          return console.error('No blueprint file path found.');
        }
        files = map.floorBlueprintPath;
      } else {
        if (!map.floorScreenshotPath || !map.floorScreenshotPath.n) {
          return console.error('No screenshot file path found.');
        }
        files = map.floorScreenshotPath.n; // default direction
      }

      // generate map tree
      let maplayer = new MapLayer(map.id, map.id);
      files.forEach((file) => {
        let idx = utils.getFileName(file);
        let layer = new FloorLayer(idx, map.id);

        layer.load(requireMapFile(file));

        maplayer.setFloor(idx-1, layer); // it starts from 1
      });
      
      maplayer.floors[maplayer.floors.length-1].config.enabled = true;

      commit('changeMap', maplayer);

    },
  },
  modules: {
  }
});
