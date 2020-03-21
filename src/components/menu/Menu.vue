<template>
  <div class="menu-root">
    <!-- body options -->
    <div class="menu-body d-flex flex-column" v-if="this.$store.state.map.floors">
      <div v-if="$store.state.map" class="title">
        <h3>{{$t(`map.${$store.state.map.id}.name`)}}</h3>
      </div>
      <div class="flex-grow-1 overflow-x-hidden overflow-y-auto">
        <div
          v-for="floor in this.$store.state.map.floors.slice().reverse()"
          :key="floor.id"
          style="position: relative"
        >
          <LayerControl
            @solo="solo($event)"
            @solo-drag="soloDrag($event)"
            @update:layer-key="updateLayerKey"
            :layer="floor"
          ></LayerControl>
          <v-overlay :value="!floor.image" absolute>
            <v-progress-circular indeterminate></v-progress-circular>
          </v-overlay>
        </div>
      </div>
    </div>
    <div v-else class="menu-body map-tip pa-4">
      <p>{{$t("tip.nomap")}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LayerControl from './LayerControl.vue';
import { R6Map } from '@/maps';
import FloorLayer from '@/maps/FloorLayer';

@Component({
  components: {
    LayerControl
  }
})
export default class Menu extends Vue {
  public solo(picked: FloorLayer) {
    picked.config.enabled = true;
    picked.config.opacity = 1;
    picked.parent!.floors.forEach((layer: any) => {
      if (layer !== picked) layer.config.enabled = false;
    });
  }
  public soloDrag(picked: FloorLayer) {
    if (picked.config.draggable) {
      picked.config.draggable = false;
      return;
    }
    picked.config.draggable = true;
    picked.parent!.floors.forEach((layer: any) => {
      if (layer !== picked) layer.config.draggable = false;
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
  height: 100%;
  .menu-body {
    height: 100%;
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