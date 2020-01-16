<template>
  <div class="has-background-black-bis" @wheel="onZoom($event)">
    <v-stage v-if="this.$store.state.map" @load="addPinchZoom" ref="konva" :config="konvaConfig">
      <v-layer v-for="layer in this.$store.state.layers" :key="layer.id">
        <v-image
          v-if="layer.enabled && layer.complete"
          :config="{image: layer.image, opacity: layer.alpha}"
        ></v-image>
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Konva from 'konva';

@Component({
  components: {}
})
export default class AppMap extends Vue {
  public konvaConfig = {
    width: 1000,
    height: 1000,
    draggable: true,
  };

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
    this.reloadCanvas();
  }

  public addPinchZoom() {
    function getDistance(p1: any, p2: any) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    (Konva as any).hitOnDragEnabled = true;

    var width = window.innerWidth;
    var height = window.innerHeight;

    var lastDist = 0;
    var startScale = 1;
    this.konva.on('touchmove', e => {
      e.evt.preventDefault();
      var touch1 = e.evt.touches[0];
      var touch2 = e.evt.touches[1];

      if (touch1 && touch2) {
        var dist = getDistance(
          {
            x: touch1.clientX,
            y: touch1.clientY
          },
          {
            x: touch2.clientX,
            y: touch2.clientY
          }
        );

        if (!lastDist) {
          lastDist = dist;
        }

        var scale = (this.konva.scaleX() * dist) / lastDist;

        scale = Math.max(0.3, Math.min(4, scale));

        this.konva.scaleX(scale);
        this.konva.scaleY(scale);
        this.konva.batchDraw();
        lastDist = dist;
      }
    });
  }

  public updated() {
    this.reloadCanvas();
  }

  public beforeDestory() {
    window.removeEventListener('resize', this.resizeHandle);
  }

  public get konva() {
    return this.$refs.konva.getNode();
  }

  public get map() {
    return this.$store.state.map;
  }

  public get layers() {
    return this.$store.state.layers;
  }

  public get scale() {
    return this.$store.state.scale;
  }
  public set scale(value) {
    this.$store.commit('changeScale', value);
  }

  public get offset() {
    return this.$store.state.offset;
  }
  public set offset(value) {
    this.$store.commit('changeOffset', value);
  }

  public reloadCanvas() {
    this.$store.commit('changeCanvasSize', {
      x: this.$el.clientWidth,
      y: this.$el.clientHeight
    });

    if (!this.map) return;
    if (!this.layers) return;
    if (!this.layers[0]) return;

    this.konvaConfig.width = this.$el.clientWidth;
    this.konvaConfig.height = this.$el.clientHeight;
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
    ratio = Math.max(0.3, Math.min(4, ratio));
    this.resizeCanva(ratio);
  }

  public getRelativePointerPosition(node: Konva.Node) {
    // the function will return pointer position relative to the passed node
    var transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    var pos = node.getStage()!.getPointerPosition();

    // now we find relative point
    return transform.point(pos);
  }
}
</script>

<style lang="scss" scoped>
</style>