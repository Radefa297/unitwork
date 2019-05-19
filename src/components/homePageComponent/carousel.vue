<template>
  <div class="carousel-warp">
    <v-window v-model="onBoardKey">
      <v-window-item
        v-for="(carousel,index) in carousels"
        :key="`carousel-${index}`"
      >
        <v-img :width="$vuetify.breakpoint.width" :src="carousel.picUrl" :href="carousels.linkUrl"></v-img>
      </v-window-item>
    </v-window>
    <v-card
      color="transparent"
      flat
      class="chevron-wrap"
      dark
    >
      <v-card-actions class="justify-space-between d-block">
<!--        <v-btn-->
<!--          flat-->
<!--          @click="prev"-->
<!--        >-->
<!--          <v-icon small>chevron_left</v-icon>-->
<!--        </v-btn>-->
        <v-item-group
          v-model="onBoardKey"
          class="text-xs-center"
          mandatory
        >
          <v-item
            v-for="carouselIndex in carousels.length"
            :key="`carouselIndex-${carouselIndex}`"
          >
            <v-btn
              slot-scope="{ active, toggle }"
              :input-value="active"
              icon
              @click="toggle"
            >
              <v-icon small :color="active?'yellow darken-2':''">fiber_manual_record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
<!--        <v-btn-->
<!--          flat-->
<!--          @click="next"-->
<!--        >-->
<!--          <v-icon small>chevron_right</v-icon>-->
<!--        </v-btn>-->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    props: {
      carousels: {}
    },
    data: () => ({
      onBoardKey: 0,
      timer: '',
      transitionDuration: 4000
    }),
    created() {
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          this.autoPlay()
        }, this.transitionDuration)
      })
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      next() {
        this.onBoardKey = this.onBoardKey + 1 === this.carousels.length
          ? 0
          : this.onBoardKey + 1
      },
      prev() {
        this.onBoardKey = this.onBoardKey - 1 < 0
          ? this.carousels.length - 1
          : this.onBoardKey - 1
      },
      autoPlay() {
        this.onBoardKey++;
        if (this.onBoardKey > this.carousels.length - 1) {
          this.onBoardKey = 0
        }
      }
    }
  }
</script>

<style scoped>
.thumbUp-container{
  position: absolute;
  bottom: 5%;
  right: 0;
  border-radius: 10px 0 0 10px;
  -webkit-box-shadow: 0 12px 20px -10px rgba(255,152,0,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(255,152,0,.2);
  box-shadow: 0 12px 20px -10px rgba(255,152,0,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(255,152,0,.2);
}
  .carousel-warp{
    display: block;
    position: relative;
  }
  .chevron-wrap{
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
  }
</style>
