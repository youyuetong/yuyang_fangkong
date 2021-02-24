<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="400px" indicator-position="outside">
      <el-carousel-item v-for="item in imagesBox" :key="item.id">
        <img class="imgCarousel" :src="item.idView" >
      </el-carousel-item>
    </el-carousel>

    <Notice></Notice>
    <Battle></Battle>
  </div>
</template>

<script>
  import Notice from "@/views/dynamic/Notice";
  import Battle from "@/views/dynamic/Battle";

  export default {
    name: "Index",
    components: {Battle, Notice},
    data () {
      return {
        imagesBox:[{id:0,idView:require("../assets/1.jpg")},
          {id:1,idView:require("../assets/2.jpeg")},
          {id:2,idView:require("../assets/3.jpeg")}
        ],
        fiveNews: []
      }
    },
  }
</script>

<style>
.el-carousel__item h3 {
  color: #eeaaee;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.imgCarousel {
  /* 设置图片宽度和浏览器宽度一样 */
  width: 100%;
  height: inherit;
}
</style>