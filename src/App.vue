<template>
  <div id="app" :style="{'--vh': heightVar+'px'}">
    <div class="main">
      <aside class="nav">
        <AppNav></AppNav>
      </aside>
      <AppMap class="map"></AppMap>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AppNav from './views/AppNav.vue';
import AppMap from './views/AppMap.vue';

@Component({
  components: {
    AppNav,
    AppMap
  }
})
export default class App extends Vue {
  public heightVar = window.innerHeight * 0.01;

  public mounted() {
    window.addEventListener('resize', () => {
      this.heightVar = window.innerHeight * 0.01;
    });

    this.$i18n.locale = this.locale;
  }

  public get locale() {
    // return last set locale
    if (window.localStorage.locale) {
      return window.localStorage.locale;
    }
    // if can't retrive info from browser
    if (!navigator) {
      return 'en';
    }
    const locales = this.$i18n.messages;
    let locale = Object.keys(locales).find(key => {
      return navigator.language.toLowerCase().startsWith(key.toLowerCase());
    });
    if (!locale) {
      locale = 'en';
    }
    window.localStorage.locale = locale;
    return locale;
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

  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
}

#app > .main {
  margin: 0;
  position: relative;
  flex: 1 1;
  .map {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.icon-link {
  margin: auto 8px;
}

.footer {
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 0px;
  user-select: none;
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

.box.small {
  padding: 0.5rem;
}

div.nopadding {
  padding: 0;
}

.horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  &.transpose > * {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column;
  }
  & > * {
    flex: none;

    &.expanded {
      flex: 1 1;
    }
  }
}

.b-checkbox.checkbox input[type='checkbox'] {
  visibility: hidden;
}
</style>
