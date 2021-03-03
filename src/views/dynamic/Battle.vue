<template>
  <div class="noticeType1">
    <i class="el-icon-s-promotion" >战役动态</i>
    <hr/>
    <ul v-for="(item,id) in battle" :key="id">
      <li >
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import {battleList} from "@/utils/request";

export default {
name: "Battle",
  data(){
    return{
      battle: []
    }
  },
  mounted:function () {
    this.getBattle();
  },
  methods:{
    getBattle:function (){
       var battle=JSON.stringify(this.battle)
      battleList().then(res=>{
        console.log(res.data)
        this.battle = res.data;
      })
    }
  }
}
</script>

<style scoped>
  .noticeType1{
  width: 48%;
    float: right;
  }
  .el-icon-s-promotion
  {
    font-weight: bolder;
    font-size: 19px;
  }
</style>
