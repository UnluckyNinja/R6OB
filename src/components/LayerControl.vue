<template>
  <div class="box small layer-control">
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
        :disabled="!this.layer.enabled"
        v-model="alpha"
        :custom-formatter="val => val.toFixed(0) + '%'"
      ></b-slider>
    </b-field>
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
      <b-field position="is-right" grouped>
        <b-checkbox-button v-model="draggable" value="false" type="is-dark" size="is-small">
          <div>
            <b-icon icon="arrows-alt"></b-icon>
          </div>
        </b-checkbox-button>
        <div class="control">
          <b-button type="is-danger" @click="requestReset" size="is-small" icon-left="redo-alt"></b-button>
        </div>
      </b-field>
    </b-field>
    <b-collapse
      v-if="this.layer.childs && this.layer.childs.length > 0"
      :open.sync="isOpen"
      animation="fade"
    >
      <LayerControl v-for="layer in this.layer.childs" :key="layer.id" :layer="layer"></LayerControl>
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
  @Prop() public readonly layer: any;
  private isOpen = false;

  public get enabled() {
    return this.layer.enabled;
  }
  public set enabled(value: boolean) {
    this.$store.commit('toggleLayer', this.layer); // TO decouple
  }
  public get alpha() {
    return this.layer.opacity * 100;
  }
  public set alpha(value: number) {
    this.$emit('update:layer-key', this.layer, 'opacity', value / 100);
  }
  public get draggable() {
    return !this.layer.draggable;
  }
  public set draggable(value: boolean) {
    this.$emit('update:layer-key', this.layer, 'draggable', !value);
  }

  public requestReset() {
    this.$emit('update:layer-key', this.layer, 'requestReset', true);
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