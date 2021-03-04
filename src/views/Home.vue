<template>
  <div>

    <el-container>
      <el-header class="homeHeader">
        <div class="title">疫情防控平台</div>
        <el-dropdown class="userInfo" @command="handleCommand">
<!--          {{user.username}}-->
        <span class="el-dropdown-link"><i>ssss<img src="../assets/touxiang.jpg"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <el-container>
        <el-aside width="auto" ><!-- style="background-color: rgb(238, 241, 246)" -->
          <el-menu
              unique-opened
              router
              class="el-menu-vertical-demo"
              default-active="this.$route.path"
          >
            <!--            <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.hidden">-->
            <!--              <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>-->
            <!--              <el-menu-item :index="children.path" v-for="(children,index) in item.children">{{children.name}}</el-menu-item>-->
            <!--            </el-submenu>-->

            <el-menu-item index="/home/index">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>基础管理</template>
              <el-menu-item index="/usermsg">用户管理</el-menu-item>
              <el-menu-item index="/nursemsg">医护人员</el-menu-item>
              <el-menu-item index="/adminmsg">管理员管理</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="el-icon-message"></i>业务管理</template>
              <el-menu-item index="/battlemsg">战役动态</el-menu-item>
              <el-menu-item index="/test2">抗议先锋</el-menu-item>
              <el-menu-item index="/test2">辟谣专题</el-menu-item>
              <!--              <el-menu-item index="/test2">你问医答</el-menu-item>-->
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"><i class="el-icon-message"></i>系统管理</template>
              <el-menu-item index="/usermsg">菜单管理</el-menu-item>
              <el-menu-item index="/test2">角色管理</el-menu-item>
              <el-menu-item index="/test2">公告管理</el-menu-item>
            </el-submenu>

          </el-menu>

        </el-aside>
        <el-main
        class="main">
          <el-breadcrumb
              separator-class="el-icon-arrow-right"
              v-if="this.$router.currentRoute.path!='/home/index'">
            <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import {goOut} from "../utils/request";
export default {
  name: "Home",

  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
    }
  },
  methods: {
    handleCommand(command) {
      if(command == 'logout'){
        this.$confirm('此操作将注销登录 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          goOut().then(res => {
            if (res.code==1){
              console.log(res.data)
              this.$router.replace('/');
              window.sessionStorage.removeItem('user');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });
      }
      if(command == 'userinfo'){
        this.$router.replace('/userinfo/list');
      }
    }
  }

}
</script>

<style scoped>
.homeHeader {
  background: deepskyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.main{
  height: 100%;
}
.homeHeader .title {
  font-size: 25px;
  font-family: 华文楷体;
  color: white;
}
.homeHeader .userInfo{
  cursor: pointer;
}
.el-dropdown-link{
  font-size: 25px;
}
.el-dropdown-link img{
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

</style>
