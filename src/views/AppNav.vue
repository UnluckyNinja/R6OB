<template>
  <div class="nav nav-root">
    <b-collapse
      :open.sync="isOpen"
      class="nav-main has-background-white-ter"
      animation="fade"
      position="is-bottom"
    >
      <Menu class="nav-main-body"></Menu>
      <footer class="footer nav-main-footer has-background-grey-lighter">
        <a
          class="level-item icon-link"
          href="https://github.com/UnluckyNinja/R6OB/"
          target="_blank"
        >
          <b-icon pack="fab" icon="github" type="is-dark" size="is-medium"></b-icon>
        </a>
        <p class="level-item">©2020 UnluckyNinja</p>
      </footer>
    </b-collapse>
    <div class="nav-handle" @click="isOpen = !isOpen">
      <b-button class="nav-button" :icon-left="isOpen? 'chevron-left': 'bars' " type="is-dark"></b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '../components/Menu.vue';

@Component({
  components: {
    Menu
  }
})
export default class AppNav extends Vue {
  private isOpen: boolean = true;
}
</script>

<style lang="scss" scoped>
.nav-root {
  display: flex;
  & > * {
    flex: none;
  }

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

div.nav-handle {
  padding-left: 0;
  padding-right: 0;
  transition: background-color 0.5s;
  transition-timing-function: ease;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: rgb(211, 211, 211);
    }
  }
  @media not all and (pointer: fine) {
    .nav-button {
      height: 100%;
    }
  }
}
</style>