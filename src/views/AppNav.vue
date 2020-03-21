<template>
  <div class="d-flex flex-column nav-root">
    <!-- header -->
    <div class="d-flex align-center flex-shrink-0">
      <!-- selector trigger button -->
      <v-btn
        class="ma-3 icononly"
        color="primary"
        small
        fab
        elevation="0"
        @click="$emit('map-overlay', true)"
      >
        <v-icon size="28">mdi-map-marker-circle</v-icon>
      </v-btn>
      <!-- title -->
      <div class="headline ma-3 flex-grow-1">
        <h1>R6OB</h1>
      </div>
      <!-- Locale Picker -->
      <div class="ma-3 pa-0">
        <LocalePicker></LocalePicker>
      </div>
    </div>
    <div class="overflow-hidden flex-grow-1">
      <Menu class_="nav-main-body"></Menu>
    </div>
    <v-divider></v-divider>
    <v-footer class="d-flex flex-shrink-0">
      <a class="mx-2" href="https://github.com/UnluckyNinja/R6OB/" target="_blank">
        <v-icon color="black" large>mdi-github</v-icon>
      </a>
      <div class="mx-2">©2020 UnluckyNinja</div>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/menu/Menu.vue';
import LocalePicker from '@/components/menu/LocalePicker.vue';

@Component({
  components: {
    Menu,
    LocalePicker
  }
})
export default class AppNav extends Vue {}
</script>

<style lang="scss" scoped>
.nav-root {
  height: 100vh;

  .nav-main {
    display: flex;
    max-height: 100vh;
    flex-direction: column;
    overflow: hidden;
    .nav-main-body {
      flex: auto;
    }
    .nav-main-footer {
      flex: none;
    }
  }
}
</style>