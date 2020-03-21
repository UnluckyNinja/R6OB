<template>
  <v-slider
    v-model="sliderValue"
    :max="MAX_VALUE"
    class="root"
    color="primary"
    @input="onInput"
    :thumb-size="96"
    hide-details
    height="40"
  >
    <template v-slot:thumb-label="{value}">
      <div class="body-1">
        <div v-if="typeof (text = getLabel(value)) === 'string'">{{text}}</div>
        <div v-else>
          {{text[0]}}
          <v-icon color="accent" small>mdi-arrow-left-right</v-icon>
          {{text[1]}}
        </div>
      </div>
    </template>
  </v-slider>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class FloorSlider extends Vue {
  readonly MAX_VALUE = 1000;

  @Prop()
  readonly list!: any[];

  @Prop({
    default: () => {
      return false;
    }
  })
  readonly i18n!: boolean;

  sliderValue: number = 1000;

  @Prop({
    default: () => {
      return 'label';
    }
  })
  readonly label!: string;

  getBetween(value: number): { left: any; right: any } {
    if (this.list.length <= 1) {
      return { left: this.list[0], right: this.list[0] };
    }
    let count = this.list.length; // how many points

    let unit = this.MAX_VALUE / (count - 1); // how long a segment

    let ceil = Math.ceil(value / unit); // ceil point
    let floor = Math.floor(value / unit); // floor point

    return { left: this.list[floor], right: this.list[ceil] };
  }

  getLabel(value: number) {
    let between = this.getBetween(value);
    let labelL = between.left[this.label];
    let labelR = between.right[this.label];
    if (labelL === labelR) {
      return this.i18n ? `${this.$t(labelL)}` : `${labelL}`;
    }
    return this.i18n ? [this.$t(labelL), this.$t(labelR)] : [labelL, labelR];
  }

  onInput(value: number) {
    if (this.list.length <= 1) {
      return { item: this.list[0], value: 0 };
    }
    let count = this.list.length; // how many points

    let unit = this.MAX_VALUE / (count - 1); // how long a segment

    let ceil = Math.ceil(value / unit); // ceil point
    let floor = Math.floor(value / unit); // floor point
    let result = this.list.map((v, i, array) => {
      let r_value = 0;
      if (i === floor) {
        // how close to the point, 1.0 is match
        r_value = 1 - Math.abs(value - floor * unit) / unit;
      } else if (i === ceil) {
        // how close to the point, 1.0 is match
        r_value = 1 - Math.abs(value - ceil * unit) / unit;
      }
      return { item: v, value: r_value }; // the others are {item: v, value: 0}
    });
    this.$emit('input', result);
  }
}
</script>
<style lang="scss" scoped>
</style>