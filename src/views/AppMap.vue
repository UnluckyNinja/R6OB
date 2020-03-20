<template>
  <div class="black" @wheel="onZoom($event)">
    <v-stage ref="konva" :config="konvaConfig">
      <AppLayer v-for="layer in this.$store.state.map.floors" :key="layer.id" :layer="layer"></AppLayer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Konva from 'konva';
import { Vector2d } from 'konva/types/types';
import AppLayer from './AppLayer.vue';
import MapLayer from '../maps/MapLayer';
import FloorLayer from '../maps/FloorLayer';

@Component({
  components: {
    AppLayer
  }
})
export default class AppMap extends Vue {
  canvasWidth: number = 100;
  canvasHeight: number = 100;

  public get konvaConfig() {
    return {
      width: this.canvasWidth,
      height: this.canvasHeight,
      draggable: this.$store.state.stageConfig.draggable
    };
  }

  public $refs!: Vue['$refs'] & {
    konva: {
      getNode(): Konva.Stage;
    };
  };

  private resizeHandle = () => {
    this.reloadCanvas();
  };

  public mounted() {
    window.addEventListener('resize', this.resizeHandle);
    this.addPinchZoom();
    this.reloadCanvas();
  }

  public updated() {
    this.reloadCanvas();
  }

  public beforeDestory() {
    window.removeEventListener('resize', this.resizeHandle);
  }

  // should be only used on mobile
  public addPinchZoom() {
    function getDistance(p1: any, p2: any) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    (Konva as any).hitOnDragEnabled = true;

    var width = window.innerWidth;
    var height = window.innerHeight;

    var lastDist = 0;
    let oldCenter = { x: 1, y: 1 }; // placeholder data
    this.konva.on('touchmove', e => {
      e.evt.preventDefault();
      var touch1 = e.evt.touches[0];
      var touch2 = e.evt.touches[1];

      if (touch1 && touch2) {
        let x1 = touch1.clientX;
        let y1 = touch1.clientY;

        let x2 = touch2.clientX;
        let y2 = touch2.clientY;

        var dist = getDistance(
          {
            x: x1,
            y: y1
          },
          {
            x: x2,
            y: y2
          }
        );
        let centerPos = {
          x: (x1 + x2) / 2,
          y: (y1 + y2) / 2
        };
        if (lastDist === 0) {
          lastDist = dist;
          oldCenter = this.getRelativePointerPosition(this.konva, centerPos);
        }

        var scale = this.konva.scaleX() * (dist / lastDist);

        scale = Math.max(
          this.MIN_ZOOM_SCALE,
          Math.min(this.MAX_ZOOM_SCALE, scale)
        );
        this.konva.scaleX(scale);
        this.konva.scaleY(scale);

        let curCenter = this.getRelativePointerPosition(this.konva, centerPos);

        let ox = this.konva.offsetX();
        let oy = this.konva.offsetY();
        this.konva.offset({
          x: ox + (oldCenter.x - curCenter.x),
          y: oy + (oldCenter.y - curCenter.y)
        });

        this.konva.batchDraw();

        // after this event call ends,
        // two finger point will continuously call events with new position,
        // which comes with new center, and the center in previous call will be outdated,
        // causing canvas to shake.
        // to mitigate it, update to new center immediately after changing offset
        curCenter = this.getRelativePointerPosition(this.konva, centerPos);

        this.offset = this.konva.offset();

        this.scale = scale;
        lastDist = dist;
        oldCenter = curCenter;
      }
    });
    this.konva.on('touchend', function() {
      lastDist = 0;
    });
  }

  public reloadCanvas() {
    // this.$store.commit('changeConfig', {
    //   name: 'width',
    //   value: this.$el.clientWidth
    // });
    // this.$store.commit('changeConfig', {
    //   name: 'height',
    //   value: this.$el.clientHeight
    // });
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

    if (!this.map) return;
    if (!this.layers) return;
    if (!this.layers[0]) return;

    this.konva.scale({ x: this.scale, y: this.scale });
    this.konva.offset(this.offset);
    this.konva.draw();
  }

  public resizeCanva(ratio: number) {
    let pos = this.getRelativePointerPosition(this.konva);

    this.konva.scale({ x: ratio, y: ratio });
    this.scale = this.konva.scaleX();

    let ox = this.konva.offsetX();
    let oy = this.konva.offsetY();
    let newpos = this.getRelativePointerPosition(this.konva);

    // keep mouse pointing, offset relative to new/old mouse position
    this.konva.offset({ x: ox - newpos.x + pos.x, y: oy - newpos.y + pos.y });
    this.konva.draw();
    this.offset = this.konva.offset();

    /* for debug
    let debug = {
      oldMouse: pos,
      newMouse: newpos,
      curMouse: this.getRelativePointerPosition(this.konva),
      ratio,
      oldOffset: { ox, oy },
      newOffset: this.konva.offset()
    };
    console.log(debug);
    // */
  }

  public onZoom(event: WheelEvent) {
    let sign = Math.sign(event.deltaY); // zoom in or out
    let ratio = 1 - sign * 0.1; // 0.9 or 1.1
    ratio *= this.scale;
    ratio = Math.max(this.MIN_ZOOM_SCALE, Math.min(this.MAX_ZOOM_SCALE, ratio));
    this.resizeCanva(ratio);
  }

  public getRelativePointerPosition(node: Konva.Node, pos?: Vector2d | null) {
    // the function will return pointer position relative to the passed node
    let transform = node.getAbsoluteTransform().copy();

    // to detect relative position we need to invert transform
    transform.invert();

    if (!pos) {
      // get pointer (say mouse or touch) position
      pos = node.getStage()!.getPointerPosition();
    }
    // now we find relative point
    let result = transform.point(pos);

    return result;
  }

  public get konva() {
    return this.$refs.konva.getNode();
  }

  public get map(): MapLayer {
    return this.$store.state.map;
  }

  public get layers(): FloorLayer[] {
    return this.$store.state.map.floors;
  }

  public get scale(): number {
    return this.$store.state.stageConfig.scale;
  }
  public set scale(value) {
    this.$store.commit('changeConfig', { name: 'scale', value });
  }

  public get offset() {
    return this.$store.state.stageConfig.offset;
  }
  public set offset(value) {
    this.$store.commit('changeConfig', { name: 'offset', value });
  }

  public MAX_ZOOM_SCALE = 4;
  public MIN_ZOOM_SCALE = 0.3;
}
</script>

<style lang="scss" scoped>
</style>