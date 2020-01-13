<template>
  <div class="box">
    <div class="container" v-for="map of list" :key="map.name">
      <div class="card" @click="$emit('selected', map)">
        <figure class="image">
          <img width="320px" height="180px" :src="`/img/maps/${map.coverSrc}`" alt />
          <figcaption class="is-size-4">{{map.name.toUpperCase()}}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import maps, { R6Map } from '../maps';

@Component({
  components: {}
})
export default class MapSelector extends Vue {
  @Prop({
    default: () => {
      return maps;
    }
  })
  private list!: R6Map[];
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
div.container {
  flex: 0 0 320px;
  margin: 12px;
}
div.box {
  display: flex;
  flex-flow: row wrap;
}

div.is-overlay p {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
img, figure {
  object-fit: cover;
  overflow: hidden;
}
</style>