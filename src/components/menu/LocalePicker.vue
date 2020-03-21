<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on }">
      <v-btn class="icononly" color="info" small fab elevation="0" v-on="on">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="locale" mandatory>
        <v-list-item v-for="loc in this.locales" :key="loc" :value="loc">
          <v-list-item-title>{{$t('lang', loc)}}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
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