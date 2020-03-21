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

  public get config() {
    return {
      ...this.layer.config,
      listening: this.layer.config.draggable
    };
  }
}
</script>

<style lang="scss" scoped>
</style>