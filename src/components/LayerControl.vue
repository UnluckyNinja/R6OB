<template>
  <div class="box small layer-control">
    <v-container>
      <v-row>
        <v-col>

        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
    <!-- Checkbox & Name Button & Alpha Slider -->
    <b-field class="field level" grouped>
      <div class="control">
        <b-checkbox type="is-dark" v-model="enabled"></b-checkbox>
      </div>
      <div class="control">
        <b-button
          class="label has-text-centered"
          type="is-dark"
          @click="solo"
          outlined
        >{{$t(`map.${this.layer.mapid}.floors[${this.layer.id-1}]`)}}</b-button>
      </div>
      <b-slider
        class="alpha-slider"
        type="is-dark"
        :disabled="!this.layer.config.enabled"
        v-model="alpha"
        :custom-formatter="val => val.toFixed(0) + '%'"
      ></b-slider>
    </b-field>


    <!-- mini buttons just placeholder now -->
    <b-field grouped>
      <b-field>
        <b-checkbox-button size="is-small" :value="true" disabled>
          <div>
            <b-icon icon="video"></b-icon>
          </div>
        </b-checkbox-button>
        <b-checkbox-button size="is-small" :value="true" disabled>
          <div>
            <b-icon icon="border-style"></b-icon>
          </div>
        </b-checkbox-button>
        <b-checkbox-button size="is-small" :value="true" disabled>
          <div>
            <b-icon icon="project-diagram"></b-icon>
          </div>
        </b-checkbox-button>
      </b-field>
      <b-field expanded></b-field>

      <!-- single floor drag -->
      <b-field position="is-right" grouped>
        <b-checkbox-button v-model="draggable" value="false" type="is-dark" size="is-small">
          <div>
            <b-icon icon="arrows-alt"></b-icon>
          </div>
        </b-checkbox-button>

        <!-- button to reset offset -->
        <div class="control">
          <b-button type="is-danger" @click="resetOffset" size="is-small" icon-left="redo-alt"></b-button>
        </div>
      </b-field>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { R6Map } from '../maps';
import FloorLayer from '../maps/FloorLayer';

@Component({
  components: {}
})
export default class LayerControl extends Vue {
  @Prop() public readonly layer!: FloorLayer;
  private isOpen = false;

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
    this.layer.config.offset = {x: 0, y: 0};
  }

  public solo() {
    this.$emit('solo', this.layer);
  }
}
</script>

<style lang="scss" scoped>
.label {
  min-width: 80px;
}
.layer-control {
  margin: 12px;
  .field {
    margin: 6px;
  }
}

@media screen and (max-width: 800px) {
  .level {
    flex-wrap: wrap;
  }
  .layer-control {
    .alpha-slider {
      margin: 10px 20px;
    }
  }
}
</style>