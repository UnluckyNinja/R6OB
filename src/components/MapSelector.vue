<template>
  <div class="root d-flex flex-column overflow-hidden accent">
    <v-toolbar dense style="position:relative; z-index: 10">
      <v-spacer></v-spacer>
      <v-toolbar-title class>{{$t(`ui.map-selector.title`)}}</v-toolbar-title>
      <v-btn @click="$emit('close')" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-radio-group v-if="$vuetify.breakpoint.smAndUp" v-model="selectedFilter">
          <v-container>
            <v-row>
              <v-col v-for="(r, i) of ROTATIONS" :key="i" cols="auto">
                <v-radio :value="i">
                  <template v-slot:label>
                    <v-icon :color="r.color">{{r.icon}}</v-icon>
                    <span>{{$t(r.labelid)}}</span>
                  </template>
                </v-radio>
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>
        <div v-else>
          <v-container>
            <v-row>
              <v-col class="pa-1" cols="auto">
                <v-icon :color="ROTATIONS[selectedFilter].color">{{ROTATIONS[selectedFilter].icon}}</v-icon>
              </v-col>
              <v-col class="pa-1" cols="auto">
                <div class="select-wrapper px-2">
                  <select v-model="selectedFilter">
                    <option v-for="(r, i) of ROTATIONS" :key="i" :value="i">{{$t(r.labelid)}}</option>
                  </select>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </v-toolbar>
    <v-container class="overflow-y-auto">
      <!-- <v-row class="overflow-y-auto">  -->
      <!-- subsititute -->
      <transition-group class="row overflow-hidden" name="map-list" tag="div">
        <v-col cols="12" sm="6" md="4" v-for="map of rotation" :key="map.id">
          <v-card class="ma-auto" width="320" @click="$emit('selected', map)">
            <v-img height="180" :src="`${publicPath}img/maps/${map.coverSrc}`"></v-img>
            <v-card-title class="justify-center">{{$t(`map.${map.id}.name`)}}</v-card-title>
          </v-card>
        </v-col>
      </transition-group>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import maps, { R6Map, mapIds } from '../maps';
import { QUICK_MATCH, RANKED } from '@/maps/Rotation';

@Component({
  components: {}
})
export default class MapSelector extends Vue {
  @Prop({
    default: () => {
      return Object.values(maps);
    }
  })
  private readonly list!: R6Map[];
  private publicPath = process.env.BASE_URL;

  readonly filter = {
    all: 0,
    quickplay: 1,
    ranked: 2
  };
  private selectedFilter = this.filter.all;

  private _ROTATIONS: { [key: number]: any } | null = null;

  ROTATIONS: { [key: number]: any } = {
    [this.filter.all]: {
      labelid: 'ui.map-selector.filter-all',
      color: null,
      icon: 'mdi-all-inclusive',
      rotation: Object.values(maps)
    },
    [this.filter.quickplay]: {
      labelid: 'ui.map-selector.filter-quickplay',
      color: 'orange',
      icon: 'mdi-flash',
      rotation: Object.values(maps).filter(value =>
        QUICK_MATCH.includes(value.id)
      )
    },
    [this.filter.ranked]: {
      labelid: 'ui.map-selector.filter-ranked',
      color: 'yellow',
      icon: 'mdi-star',
      rotation: Object.values(maps).filter(value => RANKED.includes(value.id))
    }
  };

  // @Watch('selectedFilter')
  public get rotation() {
    return this.ROTATIONS[this.selectedFilter].rotation;
  }

  // private compare: (a: R6Map, b: R6Map) => number = (a, b) => {
  //   return 1;
  // };
}
</script>

<style lang="scss" scoped>
.root {
  height: 100%;
}

label i:first-child {
  margin-right: 6px;
}
.select-wrapper {
  border-style: solid;
  border-radius: 100px;
  border-width: 1px;
  &:focus-within{
    background-color: rgba($color: black, $alpha: 0.2);
  }
  select:focus {
    outline: none;
  }
}

// transition class
.map-list-move {
  transition: all 0.5s;
}
.map-list-enter, .map-list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.map-list-leave-active {
  opacity: 0;
  position: absolute;
}
</style>