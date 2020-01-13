<template>
  <div class="nav nav-root">
    <div class="columns">
      <b-collapse :open.sync="isOpen" class="column" animation="fade" position="is-bottom">
        <div class>
          <Menu></Menu>
        </div>
      </b-collapse>
      <div class="nav-handle column" @click="isOpen = !isOpen">
        <div>
          <b-button :icon-left="isOpen? 'chevron-left': 'bars' " type="is-dark"></b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from './Menu.vue';

@Component({
  components: {
    Menu
  }
})
export default class NavBar extends Vue {
  private isOpen: boolean = true;
}
</script>

<style lang="scss">
.nav-root {
  > .columns {
    align-items: stretch;
    flex-direction: row;
    overflow: hidden;
    > .column > div {
      // height: 100%;
      height: 100vh;
    }
  }
}

div.nav-handle {
  padding-left: 0;
  padding-right: 0;
  transition: background-color 0.5s;
  transition-timing-function: ease;
  margin-left: -0.75rem;
  &:hover {
    cursor: pointer;
    background-color: dimgrey;
  }
}
</style>