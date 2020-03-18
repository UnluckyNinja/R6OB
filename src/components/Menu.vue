<template>
  <div class="menu-root container">
    <!-- header -->
    <div class="menu-header horizontal">
      <!-- selector trigger button -->
      <div class="item">
        <b-button
          icon-left="map-marked-alt"
          type="is-dark"
          @click="isMapSelectorModalActive = true"
        ></b-button>
      </div>
      <!-- title -->
      <div class="item expanded">
        <h1 class="title">R6OB</h1>
      </div>
      <!-- Locale Picker -->
      <LocalePicker class="item"></LocalePicker>
    </div>

    <!-- body options -->
    <div class="menu-main" >
      <div v-if="this.$store.state.map.floors">
        <div v-if="$store.state.map" class="header has-text-centered">
          <h5 class="title is-4">{{$t(`map.${$store.state.map.id}.name`)}}</h5>
        </div>
        <div class="main">
          <div
            class="layer-control-root"
            v-for="layer in this.$store.state.map.floors.slice().reverse()"
            :key="layer.id"
          >
            <LayerControl @solo="solo($event)" @update:layer-key="updateLayerKey" :layer="layer"></LayerControl>
            <!-- <b-loading :is-full-page="false" :active="!layer.complete"></b-loading> -->
          </div>
        </div>
      </div>
      <div v-else class="map-tip">
        <p>{{$t("tip.nomap")}}</p>
      </div>
    </div>

    <!-- selector -->
    <b-modal width="80%" :active.sync="isMapSelectorModalActive">
      <MapSelector @selected="changeMap($event)"></MapSelector>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MapSelector from './MapSelector.vue';
import LayerControl from './LayerControl.vue';
import LocalePicker from './LocalePicker.vue';
import { R6Map } from '../maps';
import FloorLayer from '../maps/FloorLayer';

@Component({
  components: {
    MapSelector,
    LayerControl,
    LocalePicker
  }
})
export default class Menu extends Vue {
  private isMapSelectorModalActive = false;

  private changeMap(map: R6Map) {
    this.isMapSelectorModalActive = false;
    this.$store.dispatch('loadMap', { mapId: map.id });
  }

  public solo(picked: FloorLayer) {
    picked.config.enabled = true;
    picked.parent!.floors.forEach((layer: any) => {
      if (layer !== picked) layer.config.enabled = false;
    });
  }

  public updateLayerKey(layer: any, key: string, value: any) {
    this.$store.commit('changeLayerKey', {
      layer,
      key,
      value
    });
    if (key === 'draggable') {
      if (value === true) {
        this.$store.commit('changeDraggable', false);
      }
      if (value === false) {
        let allFalse = this.$store.state.layers.every((one: any) => {
          return one.draggable === false;
        });
        if (allFalse) {
          this.$store.commit('changeDraggable', true);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-root {
  display: flex;
  flex-direction: column;

  .menu-header {
    padding: 1rem;
    word-break: keep-all;
  }
  .menu-main {
    display: flex;
    flex-direction: column;
    .map-tip {
      // flex-basis: 100%;
      padding: 20px;
      flex: 1 0;
    }
    .header {
    }
    .main {
      overflow: hidden auto;
      display: flex;
      flex-direction: column;
      overflow: hidden auto;
      .layer-control-root {
        flex: none;
        position: relative;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .menu-root {
    max-width: 240px;
  }
}
@media screen and (min-width: 800px) {
  .menu-root {
    width: 300px;
  }
}
</style>