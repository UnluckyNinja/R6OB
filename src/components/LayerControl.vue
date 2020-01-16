<template>
  <div class="box small layer-control">
    <b-field class="level">
      <div class="control">
        <b-checkbox type="is-dark" v-model="enabled"></b-checkbox>
      </div>
      <b-button
        class="control label has-text-centered"
        type="is-dark"
        @click="solo"
        outlined
      >{{this.layer.name}}</b-button>
      <b-slider
        class="alpha-slider"
        type="is-dark"
        :disabled="!this.layer.enabled"
        v-model="alpha"
        :custom-formatter="val => val.toFixed(0) + '%'"
      ></b-slider>
    </b-field>
    <b-collapse
      v-if="this.layer.childs && this.layer.childs.length > 0"
      :open.sync="isOpen"
      animation="fade"
    >
      <LayerControl v-for="layer in this.layer.childs" :key="layer.name" :layer="layer"></LayerControl>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { R6Map } from '../maps';

@Component({
  components: {}
})
export default class LayerControl extends Vue {
  @Prop() public layer: any;
  private isOpen = false;

  public get enabled() {
    return this.layer.enabled;
  }
  public set enabled(value: boolean) {
    this.$store.commit('toggleLayerAt', this.layer); // TO decouple
  }
  public get alpha() {
    return this.layer.alpha * 100;
  }
  public set alpha(value: number) {
    this.$store.commit('changeLayerAlphaAt', {
      // TO decouple
      target: this.layer,
      alpha: value / 100
    });
  }
  solo() {
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
  .control {
    margin: 6px;
  }
  .alpha-slider {
    margin: 0 20px;
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