<template>
  <div class="has-background-black-bis" @wheel="onZoom($event)">
    <v-stage ref="konva" :config="konvaConfig">
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
import { Vector2d } from 'konva/types/types';

@Component({
  components: {}
})
export default class AppMap extends Vue {
  public konvaConfig = {
    width: 1000,
    height: 1000,
    draggable: true
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
    this.addPinchZoom();
    this.reloadCanvas();
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

        scale = Math.max(0.3, Math.min(4, scale));
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
        curCenter = this. getRelativePointerPosition(this.konva, centerPos); 

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

    return result
  }
}
</script>

<style lang="scss" scoped>
</style>