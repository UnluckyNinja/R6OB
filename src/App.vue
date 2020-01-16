<template>
  <div id="app" class>
    <div class="main">
      <aside class="nav">
        <AppNav></AppNav>
      </aside>
      <AppMap class="map"></AppMap>
    </div>
    <footer class="footer has-background-grey-lighter">
      <div class="level">
        <a class="level-item icon-link" href="https://github.com/UnluckyNinja/R6OB/" target="_blank">
          <b-icon pack="fab" icon="github" type="is-dark" size="is-medium"></b-icon>
        </a>
        <p class="level-item">@2020 UnluckyNinja</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppNav from './views/AppNav.vue';
import AppMap from './views/AppMap.vue';

@Component({
  components: {
    AppNav,
    AppMap
  }
})
export default class App extends Vue {
  public mounted() {
    const locales = this.$i18n.messages;
    const defaultLocale = (() => {
      if (!navigator) {
        return 'en';
      }
      if (window.localStorage.locale) {
        return window.localStorage.locale;
      }
      let locale = Object.keys(locales).find(key => {
        return navigator.language.toLowerCase().startsWith(key.toLowerCase());
      });
      window.localStorage.locale = locale;
      return locale;
    })();
    this.$i18n.locale = defaultLocale;
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

  height: 100vh;
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
  height: 60px;
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
</style>
