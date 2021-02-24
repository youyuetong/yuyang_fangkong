<template>

  <div class="userInfo">
    <el-form
        ref="user"
        :model="user"
        :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
            v-model="user.username"
            clearable
            style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="类别" prop="role">
        <el-input
            :disabled="true"
            v-model="user.role"
            clearable
            style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input
            v-model="user.phone"
            clearable
            style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
            v-model="user.email"
            clearable
            style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="注册时间" prop="createTime">
        <el-input
            :disabled="true"
            v-model="user.createTime"
            clearable

            style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button
            type="success"
            plain
            size="small"
            icon="el-icon-edit"
            @click="userUpdate">修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "Userinfo",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
      }
    }
  },
  methods: {
    userUpdate() {
      this.$refs.user.validate((valid)=>{
        if(valid){
          // 调用后端接口！！！
        }else{
          console.log('error submit!!');
          this.$message.error('请输入所有字段！！');
          return false;
        }
      })
      alert(JSON.stringify(this.user));

    }
  }
}
</script>

<style>
.userInfo {
  padding: 20px;
}

</style>