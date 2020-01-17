<template>
  <div class="nav nav-root">
    <b-collapse
      :open.sync="isOpen"
      class="nav-body has-background-white-ter"
      animation="fade"
      position="is-bottom"
    >
      <Menu class="menu"></Menu>
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
.columns {
  margin: 0;
  padding: 0;
  .column {
    margin: 0;
    padding: 0;
  }
}

.nav-root {
  display: flex;
  & > * {
    flex: 0 0;
  }
}

.nav-handle,
.nav-body {
  flex-grow: 0;
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