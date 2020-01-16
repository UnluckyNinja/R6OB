<template>
  <div class="container">
    <!-- header -->
    <div class="panel">
      <!-- selector trigger button -->
      <div class="panel-heading horizontal">
        <div class="item">
          <b-button
            icon-left="map-marked-alt"
            type="is-dark"
            @click="isMapSelectorModalActive = true"
          ></b-button>
        </div>
        <div class="item expanded">
          <h1 class="title">R6OB</h1>
        </div>
        <LocalePicker class="item"></LocalePicker>
      </div>
      <!-- title -->
    </div>
    <!-- body options -->
    <div>
      <div v-if="$store.state.map" class="level">
        <h5
          class="level-item title has-text-centered is-4"
        >{{$t(`map.${$store.state.map.id}.name`)}}</h5>
      </div>
      <div v-else class="map-tip">
        <p>{{$t("tip.nomap")}}</p>
      </div>
    </div>

    <div
      class="layer-control root"
      v-for="layer in this.$store.state.layers.slice().reverse()"
      :key="layer.id"
    >
      <LayerControl @solo="solo($event)" :layer="layer"></LayerControl>
      <!-- <b-loading :is-full-page="false" :active="!layer.complete"></b-loading> -->
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

@Component({
  components: {
    MapSelector,
    LayerControl,
    LocalePicker
  }
})
export default class Menu extends Vue {
  private isMapSelectorModalActive = false;

  private changeMap(event: R6Map) {
    this.isMapSelectorModalActive = false;
    this.$store.dispatch('updateMap', event);
  }

  public solo(self: any) {
    this.$store.commit('toggleLayerAt', { target: self, enabled: true });
    this.$store.state.layers.forEach((layer: any) => {
      if (layer !== self)
        this.$store.commit('toggleLayerAt', { target: layer, enabled: false });
    });
  }
}
</script>

<style lang="scss" scoped>
.title {
  word-break: keep-all;
}

.horizontal {
  display: flex;
  flex-direction: row;
  .item {
    flex: 0 0;
    margin: 8px;

    &.expanded {
      flex: 1 1;
    }
  }
}

.map-tip {
  // flex-basis: 100%;
  padding: 20px;
}
.layer-control.root {
  position: relative;
}

@media screen and (max-width: 800px) {
  .panel {
    max-width: 240px;
  }
}
@media screen and (min-width: 800px) {
  .panel {
    width: 300px;
  }
}
</style>