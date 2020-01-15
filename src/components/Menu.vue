<template>
  <div class="container">
    <!-- header -->
    <div class="panel">
      <!-- selector trigger button -->
      <div class="panel-heading level">
        <div class="level-left">
          <div class="level-item">
            <b-button
              icon-left="map-marked-alt"
              type="is-dark"
              @click="isMapSelectorModalActive = true"
            ></b-button>
          </div>
        </div>
        <div class="level-item">
          <h1 class="title">R6OB</h1>
        </div>
      </div>
      <!-- title -->
    </div>
    <!-- body options -->
    <div>
      <div v-if="$store.state.map" class="level">
        <h5 class="level-item title has-text-centered is-4">{{$store.state.map.name.toUpperCase()}}</h5>
      </div>
      <div v-else class="map-tip">
        <p>Please choose a map by click top-left button.</p>
      </div>
    </div>

    <div class="layer-control root" v-for="layer in this.$store.state.layers.slice().reverse()" :key="layer.name">
      <LayerControl @solo="solo($event)" :layer="layer"></LayerControl>
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
import { R6Map } from '../maps';

@Component({
  components: {
    MapSelector,
    LayerControl
  }
})
export default class Menu extends Vue {
  private isMapSelectorModalActive = false;

  private changeMap(event: R6Map) {
    this.isMapSelectorModalActive = false;
    this.$store.dispatch('updateMap', event);
  }

  public solo(self: any) {
    this.$store.commit('toggleLayerAt', {target: self, enabled: true});
    this.$store.state.layers.forEach((layer: any) => {
      if(layer !== self) this.$store.commit('toggleLayerAt', {target: layer, enabled: false});
    });
  }
}
</script>

<style lang="scss" scoped>
.title {
  word-break: keep-all;
}

.map-tip {
  // flex-basis: 100%;
  padding: 20px;
}

.panel {
  width: 300px;
}
</style>