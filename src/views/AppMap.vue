<template>
  <div class="has-background-black-bis" @wheel="onZoom($event)">
    <v-stage v-if="this.$store.state.map" ref="konva" :config="konvaConfig">
      <v-layer v-for="layer in this.$store.state.layers" :key="layer.name">
        <v-image v-if="layer.enabled" :config="{image: layer.image, opacity: layer.alpha}"></v-image>
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
    width: 100,
    height: 100,
    draggable: true
  };

  public $refs!: Vue['$refs'] & {
    konva: {
      getNode(): Konva.Stage;
    };
  };

  private resizeHandle = () => {
    this.resizeCanvas();
  };
  public mounted() {
    window.addEventListener('resize', this.resizeHandle);
  }

  public updated() {
    this.resizeCanvas();
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

  public resizeCanvas() {
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
  public onZoom(event: WheelEvent) {
    let sign = Math.sign(event.deltaY); // zoom in or out

    let pos = this.getRelativePointerPosition(this.konva);
    let ratio = 1 - sign * 0.1; // 0.9 or 1.1

    this.konva.scale({ x: this.scale * ratio, y: this.scale * ratio });
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