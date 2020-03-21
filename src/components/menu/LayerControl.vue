<template>
  <v-card class="layer-control" outlined>
    <!-- Checkbox & Name Button & Alpha Slider -->
    <v-container>
      <v-row justify="space-around" align="center" dense>
        <v-col cols="auto">
          <v-simple-checkbox :ripple="false" v-model="enabled"></v-simple-checkbox>
        </v-col>
        <v-col cols="4">
          <v-btn
            width="100%"
            @click="solo"
            outlined
          >{{$t(`map.${this.layer.mapid}.floors[${this.layer.id-1}]`)}}</v-btn>
        </v-col>
        <v-col cols="12" sm>
          <v-slider
            class="ma-auto"
            :disabled="!this.layer.config.enabled"
            v-model="alpha"
            hide-details
          ></v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-btn-toggle v-model="sublayers" multiple borderless>
            <v-btn small disabled>
              <v-icon>mdi-cctv</v-icon>
            </v-btn>
            <v-btn small disabled>
              <v-icon>mdi-border-style</v-icon>
            </v-btn>
            <v-btn small disabled>
              <v-icon>mdi-transit-connection-variant</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <!-- mini buttons just placeholder now -->
          <v-btn-toggle max="0" multiple borderless>
            <!-- single floor drag -->
            <v-btn @click="soloDrag" small :color="draggable?'red': ''">
              <v-icon :color="draggable?'white': ''">mdi-arrow-all</v-icon>
            </v-btn>
            <!-- button to reset offset -->
            <v-btn @click="resetOffset" small>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { R6Map } from '@/maps';
import FloorLayer from '@/maps/FloorLayer';

@Component({
  components: {}
})
export default class LayerControl extends Vue {
  @Prop() public readonly layer!: FloorLayer;
  private isOpen = false;

  private sublayers = [];

  public get enabled() {
    return this.layer.config.enabled;
  }
  public set enabled(value: boolean) {
    this.layer.config.enabled = value;
  }
  public get alpha() {
    return this.layer.config.opacity * 100;
  }
  public set alpha(value: number) {
    this.layer.config.opacity = value / 100;
  }
  public get draggable() {
    return this.layer.config.draggable;
  }
  public set draggable(value: boolean) {
    this.layer.config.draggable = value;
  }

  public resetOffset() {
    this.layer.config.position = { x: 0, y: 0 };
  }

  public solo() {
    this.draggable = false;
    this.$emit('solo', this.layer);
  }
  public soloDrag() {
    this.$emit('solo-drag', this.layer);
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 800px) {
  .layer-control {
    .alpha-slider {
      margin: 10px 20px;
    }
  }
}
</style>