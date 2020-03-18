<template>
  <v-layer ref="layer" :config="config">
    <v-image v-if="layer.config.enabled && layer.image" :config="{image: layer.image}"></v-image>
  </v-layer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class AppLayer extends Vue {
  @Prop() readonly layer!: any;

  // public get konvaLayer() {
  //   return (this.$refs.layer as any).getNode();
  // }

  // public get requestReset() {
  //   return this.layer.requestReset;
  // }

  public get config() {
    return {
      opacity: this.layer.opacity,
      offset: this.layer.offset,
      draggable: this.layer.draggable,
      listening: this.layer.draggable
    };
  }

  // @Watch('requestReset')
  // public resetLayer(val: boolean) {
  //   if (val) {
  //     this.konvaLayer.position({ x: 0, y: 0 });
  //     this.$store.commit('changeLayerKey', {
  //       layer: this.layer,
  //       key: 'requestReset',
  //       value: false
  //     });
  //     this.konvaLayer.batchDraw();
  //   }
  // }
}
</script>

<style lang="scss" scoped>
</style>