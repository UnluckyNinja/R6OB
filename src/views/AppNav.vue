<template>
  <div class="nav nav-root columns">
    <b-collapse
      :open.sync="isOpen"
      class="nav-body column has-background-white-ter"
      animation="fade"
      position="is-bottom"
    >
      <Menu class="menu"></Menu>
    </b-collapse>
    <div class="nav-handle column" @click="isOpen = !isOpen">
      <div>
        <b-button :icon-left="isOpen? 'chevron-left': 'bars' " type="is-dark"></b-button>
      </div>
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
.nav-handle,
.nav-body {
  flex-grow: 0;
}
div.nav-handle {
  padding-left: 0;
  padding-right: 0;
  transition: background-color 0.5s;
  transition-timing-function: ease;
  margin-left: -0.75rem;
  &:hover {
    cursor: pointer;
    background-color: rgb(211, 211, 211);
  }
}
</style>