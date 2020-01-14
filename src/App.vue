<template>
  <div id="app" class="">
    <aside class="nav">
      <NavBar></NavBar>
    </aside>
    <div class="container">
      <v-stage v-if="this.$store.state.map" ref="konva" :config="konvaConfig">
        <v-layer v-for="layer in this.$store.state.map.floors" :key="layer.name">
          <v-image :config="{image: loadImage(layer.image)}"></v-image>
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBar from './views/AppNav.vue';

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  konvaConfig = {
    width: 100,
    height: 100,
  } as any;
  
  public mounted(){
    let konva = this.$refs.konva as Element;
    // TODO fix konva canvas size
    this.konvaConfig.width = this.$el.clientWidth;
    this.konvaConfig.height = this.$el.clientHeight;
  }

  public loadImage(src: string) {
    let image = new Image();
    image.src = src;
    image.onload = ()=>{
      (this.$refs.konva as any).getNode().draw(); 
    }
    return image;
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  > div {
    height: 100vh;
  }
}

html, body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}

.nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9000;
  padding-bottom: 0;
}

.full-vh {
  height: 100vh;
}

div.nopadding {
  padding: 0;
}
</style>
