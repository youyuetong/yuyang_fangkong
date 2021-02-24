<template>
   <div class="noticeType">
     <i class="el-icon-s-order" >通知公告</i>



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
      noticeList().then(res=>{
        this.notice = JSON.stringify(res.data);
        alert(this.notice);
      })
    }
  }


}
</script>

<style scoped>
.noticeType {

}
</style>