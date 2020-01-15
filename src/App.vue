<template>
  <div id="app" class>
    <aside class="nav">
      <AppNav></AppNav>
    </aside>
    <AppMap></AppMap>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppNav from './views/AppNav.vue';
import AppMap from './views/AppMap.vue';

@Component({
  components: {
    AppNav,
    AppMap,
  }
})
export default class App extends Vue {
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

html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}

aside.nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9000;
}
.nav {
  height: 100%;
}
.full-vh {
  height: 100vh;
}

.box.small{
  padding: 0.5rem;
}

div.nopadding {
  padding: 0;
}
</style>
