<template>
  <div class="panel">
    <!-- header -->
    <div class="panel-heading">
      <div class="columns">
        <!-- selector trigger button -->
        <div class="column is-narrow">
          <b-button
            icon-left="map-marked-alt"
            type="is-dark"
            @click="isMapSelectorModalActive = true"
          ></b-button>
        </div>
        <!-- title -->
        <div class="column">
          <h1 class="title">R6OB</h1>
        </div>
      </div>
    </div>
    <!-- body options -->
    <div v-if="map" class="panel-block header">
      <div class="level">
        <h5 class="level-item title has-text-centered is-4">{{map.name.toUpperCase()}}</h5>
      </div>
    </div>
    <!-- selector -->
    <b-modal width="80%" :active.sync="isMapSelectorModalActive">
      <MapSelector @selected="isMapSelectorModalActive = false, map=$event"></MapSelector>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MapSelector from './MapSelector.vue';
import { R6Map } from '../maps';

@Component({
  components: {
    MapSelector
  }
})
export default class Menu extends Vue {
  private isMapSelectorModalActive = false;
  private map: R6Map|null = null;
}
</script>

<style lang="scss" scoped>
.title {
  word-break: keep-all;
}
.panel {
  width: 240px;
  // .columns {
  //   margin: 0;
  //   padding: 0;
  // }
  .panel-block.header {
    flex-direction: column;
  }
}
</style>