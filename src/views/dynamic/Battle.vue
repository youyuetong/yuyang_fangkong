<template>
  <div class="noticeType">
    <i class="el-icon-s-order" >战役动态</i>

  </div>
</template>

<script>
import {battleList} from "@/utils/request";

export default {
name: "Battle",
  data(){
    return{
      notice: []
    }
  },
  mounted:function () {
    this.getNotice();
  },
  methods:{
    getNotice:function (){
      battleList().then(res=>{
        this.notice = JSON.stringify(res.data);
        alert(this.notice);
      })
    }
  }
}
</script>

<style scoped>

</style>