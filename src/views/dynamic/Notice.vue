<template>
   <div class="noticeType">
     <i class="el-icon-s-order" >通知公告</i>
       <hr/>
       <ul v-for="(item,id) in notice" :key="id">
           <li >
               {{item.title}}
           </li>
       </ul>

   </div>
</template>

<script>



import {noticeList} from "@/utils/request";

export default {
  name: "Notice",
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
        this.notice=JSON.stringify(this.notice);
        noticeList().then(res=>{
          console.log(res.data)
          this.notice = res.data;
      })
    }
  }


}
</script>

<style scoped>
    .noticeType {
        width: 48%;
        float: left;
    }
    .el-icon-s-order{
        font-weight: bolder;
        font-size: 19px;
    }
</style>
