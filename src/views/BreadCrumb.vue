<template>
  <div class="navbar clearfix">
    <el-breadcrumb class="breadcrumb-container" separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name: "BreadCrumb",
    data() {
      return {
        levelList: []
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()  //监听路由变化
      }
    },
    created(){
      this.getBreadcrumb()
    },
    methods:{
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)  //获取路由信息，并过滤保留路由名称信息存入数组
        this.levelList = matched
        // console.log(matched)
      }
    }
  }
</script>

<style scoped>

</style>