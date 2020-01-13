<template>
  <div id="app" class="">
    <aside class="nav">
      <NavBar></NavBar>
    </aside>
    <div class="container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBar from './components/NavBar.vue';

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  @Prop() private msg!: string;
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
