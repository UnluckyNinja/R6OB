<template>
  <v-app id="app" :style="{'--vh': heightVar+'px'}">
    <v-navigation-drawer
      class="overflow-visible"
      width="auto"
      v-model="isOpen"
      absolute
      floating
      app
    >
      <div class="d-flex flex-row">
        <AppNav @map-overlay="isMapSelectorModalActive = true"></AppNav>
        <div style="position: relative">
          <div class="nav-handle" @click="isOpen = !isOpen">
            <v-btn class="nav-button icononly" color="primary" small fab elevation="0">
              <v-icon large>{{isOpen? 'mdi-chevron-left': 'mdi-menu'}}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
    <v-content>
      <AppMap class="map"></AppMap>
      <FloorSlider
        class="floor-slider mx-10 px-10"
        v-if="$store.state.map.floors"
        :list="$store.state.map.floors"
        label="i18nPath"
        :i18n="true"
        @input="onSlide"
      ></FloorSlider>
    </v-content>
    <!-- selector -->
    <v-dialog
      max-width="80vw"
      height="90vh"
      content-class="map-dialog"
      v-model="isMapSelectorModalActive"
    >
      <MapSelector @selected="changeMap($event)" @close="isMapSelectorModalActive = false"></MapSelector>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AppNav from './views/AppNav.vue';
import AppMap from './views/AppMap.vue';
import MapSelector from '@/components/menu/MapSelector.vue';
import FloorSlider from '@/components/FloorSlider.vue';
import { R6Map } from '@/maps';
import FloorLayer from '@/maps/FloorLayer';

@Component({
  components: {
    AppNav,
    AppMap,
    MapSelector,
    FloorSlider
  }
})
export default class App extends Vue {
  public heightVar = window.innerHeight * 0.01;
  private isOpen: boolean = true;

  private isMapSelectorModalActive = false;

  private changeMap(map: R6Map) {
    this.isMapSelectorModalActive = false;
    this.$store.dispatch('loadMap', { mapId: map.id });
  }

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

  onSlide(event: { item: FloorLayer; value: number }[]) {
    let found = false;
    event.forEach(({ item, value }, i) => {
      if (value === 0) {
        item.config.enabled = false;
      } else {
        item.config.enabled = true;
        if (!found) {
          item.config.opacity = 1;
          found = true;
        } else {
          item.config.opacity = value;
        }
      }
    });
  }
}
</script>

<style lang="scss">
html,
body {
  overflow: hidden !important;
}

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: Helvetica, Tahoma, Arial, 'Noto Sans CJK SC', 'Noto Sans CJK',
    'Source Han Sans', 'Noto Serif CJK SC', 'Noto Serif CJK',
    'Source Han Serif SC', ‘Source Han Serif’, STXihei, '华文细黑',
    'Microsoft YaHei', '微软雅黑', SimSun, '宋体', Heiti, '黑体', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}

#app {
  .map-dialog {
    height: 100%;
    overflow: hidden;
  }
  .floor-slider {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: white, $alpha: 0.4);
    opacity: 0.2;
    transition: opacity 1s;
    &:hover,
    &:active {
      opacity: 1;
    }
  }
}

footer {
  justify-content: center;
  a {
    text-decoration: none;
  }
}

.full-vh {
  height: 100vh;
}

.v-btn.icononly {
  border-radius: 4px;
}

.v-application
  .v-navigation-drawer.overflow-visible
  .v-navigation-drawer__content {
  overflow: visible !important;
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

.nav-handle {
  margin: 0;
  padding: 0;
  height: 100%;
  position: absolute;
  visibility: visible;
  transition: background-color 0.5s;
  transition-timing-function: ease;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: var(--v-secondary-base);
    }
  }
  @media not all and (pointer: fine) {
    .nav-button {
      height: 100%;
    }
  }
}
</style>
