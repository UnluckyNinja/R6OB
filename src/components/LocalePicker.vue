<template>
  <div>
    <b-dropdown v-model="locale" aria-role="list">
      <b-button class="button" type="is-info" icon-left="language" slot="trigger"></b-button>
      <b-dropdown-item
        v-for="loc in this.locales"
        :key="loc"
        aria-role="listitem"
        :value="loc"
      >{{$t('lang', loc)}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class LocalePicker extends Vue {
  public get locales() {
    return Object.keys(this.$i18n.messages);
  }
  public get locale() {
    return this.$i18n.locale;
  }
  public set locale(value: string) {
    this.$i18n.locale = value;
    window.localStorage.locale = value;
  }
}
</script>

<style lang="scss" scoped>
</style>