<template>
  <div>
    <el-form
        v-loading="loading"
        element-loading-text="正在登录。。。"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :rules="rules"
        ref="loginForm"
        :model="loginForm"
        class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  style="width: 250px;margin-right:5px "></el-input>
        <img :src=captchaUrl @click="updateCapt">

      </el-form-item>
      <!--      <el-checkbox v-model="checked">记住我</el-checkbox>-->
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>

import {login} from '../utils/request'

export default {
  name: 'Login',
  data() {
    return {
      captchaUrl: '/user/rightcode?time='+ new Date(),
      loginForm: {
        username: 'admin',
        password: 'admin',
        code: ''
      },
      loading: false,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },

  methods: {
    updateCapt(){
        this.captchaUrl = '/user/rightcode?time='+ new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //     // 存储用户token
          //     const tokenStr = resp.obj.tokenHead+resp.obj.token;
          //     window.sessionStorage.setItem('tokenStr',tokenStr);
          //     // 跳转首页
          //     this.$router.replace('/home');
          this.loading=true;
         let form =JSON.stringify(this.loginForm);
         login(form).then(res =>{
           if(res.code==1){
             this.loading = false;
             // const token = res.data.token;
             // console.log(token);
             // sessionStorage.setItem("token",token);
             window.sessionStorage.setItem('user',JSON.stringify(res.data.result));
             // alert(window.sessionStorage.getItem('user'))
             this.$router.replace('/home/index');
             this.$notify({
               title: '登录成功',
               // message: res.message,
               type: 'success'
             });
           }else{
             this.loading = false;
             this.$notify.error({
               title: '错误',
               message: res.message
             })
           }
         })

        } else {
          console.log('error submit!!');
          this.$message.error('请输入所有字段！！');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 188px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #ffffff;
  border: 1px solid #eeaaee;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0px auto 40px auto;
  text-align: center;
}
.el-form-item__content{
  display: flex;
  align-items: center;
}
</style>
