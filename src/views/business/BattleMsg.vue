<template>
  <div>
    <div class="input">
      <el-input placeholder="请输入动态标题" v-model="title" class="input1" @keyup.enter.native="searchEnterFun" clearable>
      </el-input>

      <el-input placeholder="请输入作者" v-model="auth" @keyup.enter.native="searchEnterFun" class="input2" clearable>
        <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
      </el-input>
      <el-button type="primary" size="medium" @click="addWarInfo" class="btns">
        添加信息
      </el-button>
    </div>
    <el-card class="cardnurse">
      <el-table
          :data="warActivelist"
          stripe
          style="height: 100%; width: 100%">
        <el-table-column
            prop="id"
            label="ID"
            width="100"
        >
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="400">
        </el-table-column>
        <el-table-column
            prop="auth"
            label="作者"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createTime"
            :formatter="formatTime"
            label="发布时间"
            width="300">
        </el-table-column>
        <el-table-column
            prop=""
            label="操作">
          <template slot-scope="scope" style="text-align: center">
            <el-button @click="showBattle(scope.row)" type="text" size="small" icon="el-icon-s-order">内容</el-button>
            <el-button @click="editwarActive(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button  @click="delwarActive(scope.row,scope.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="pakage"
          @current-change="handleCurrentChange"
          :current-page.sync="current"
          :page-size="size"
          :page-count="pages"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
      <!-- 添加/编辑 弹框-->
      <el-dialog :title="titlenurseMap[wartitle]"  :visible.sync="dialogwarVisible" width="650px" @close="clearfeild">
        <el-form :model="warform" :rules="rules" ref="warform">
<!--          <el-form-item label="ID" :label-idwidth="formLabelWidth" v-if="visible">-->
<!--            <el-input v-model="warform.id"  autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="标题"  :label-width="formLabelWidth" prop="title">
            <el-input  placeholder="请输入战役标题" v-model="warform.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" :label-width="formLabelWidth" prop="auth">
            <el-input v-model="warform.auth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
            <el-input type="textarea" :rows="6" v-model="warform.content" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogwarVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBattle()">确 定</el-button>
        </div>
      </el-dialog>
        <el-dialog title="战役动态内容" :visible.sync="dialogWarVisible" width="600px">
            <el-form :model="warform">
                <el-form-item  :label-width="formLabelWidth">
                   <div class="contentp">
                        <span>
                        {{warform.content}}
                    </span>
                   </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWarVisible = false" type="primary">关闭</el-button>
            </div>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import {battlepage,battleadd, battledel, battleupdate} from "@/utils/request";
export default {
  name: "BattleMsg",
  data(){
    return{
      dialogWarVisible:false,
      visible:false,
      titlenurseMap:{
        addWar:'添加战役动态信息',
        editWar:'编辑战役动态信息'
      },
      formLabelWidth:'80px',
      wartitle:'',
      warActivelist:[],
      warform:{
        title:'',
        auth:'',
        content:''
      },
      dialogwarVisible:false,
      pageSize:10,
      current:1,
      size:6,
      pages:2,
      total:5,
      title:'',
      auth:'',
      rules:{
        title:[
          { required: true, message: '战役标题不能为空',trigger:'blur'},
        ],
        auth:[
          { required: true,message: '请输入作者名称', trigger: 'blur' },
        ],
        content:[
              { required: true,message: '请输入战役动态内容', trigger: 'blur' },
          ]
      }
    }
  },
  mounted() {
    this.getwarinfo()
  },
  methods:{
    //日期格式
    formatTime(row){
      return moment(row.createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    //搜索信息
    //点击回车即可搜索
    searchEnterFun(e){
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.search();
      }
    },
    search(){
      // 点击搜索按钮重新获取内容
      this.getwarinfo()
    },
    getwarinfo(){
      const param={};
      param.size=this.size;
      param.current=this.current
      //把搜索的关键字传递给后台关键字
      param.auth=this.auth
      param.title=this.title
      battlepage(param).then(res => {
        if (res.code == 1){
          // console.log(res)
          this.warActivelist=res.data.records;
          this.total=res.data.total;
        }else{
          this.warActivelist=''
          this.total=1;
        }
      })
    },
    //确定添加/编辑
    addBattle(){
      if (this.wartitle == "addWar"){
        var addWarForm = JSON.stringify(this.warform);
          this.$refs.warform.validate((valid) => {
              if (valid) {
                  //    发送请求
                  battleadd(addWarForm).then(res => {
                      if (res.code == 1) {
                          //提示信息
                          this.$message.success("添加成功")
                          //关闭列表
                          this.dialogwarVisible = false;
                          //刷新列表
                          this.getwarinfo();
                      } else {
                          this.$message(res.message)
                      }
                  })
              }
          })


      }
      else {
        //  修改对话框操作
        var editWarForm = JSON.stringify(this.warform);
          this.$refs.warform.validate((valid) => {
              if (valid) {
                  battleupdate(editWarForm).then(res => {
                      if (res.code == 1){
                          this.dialogwarVisible=false;
                          this.getwarinfo();
                          this.$message.success("修改成功");
                          console.log(res)
                      }
                      else {
                          this.$message(res.message);
                      }
                  })
              }
          })

      }
    },
      //去除验证
      clearfeild(){
          this.$nextTick(()=>{
              this.$refs.warform.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.nurseform.resetFields()，去除验证
          });
      },
    //添加战役动态信息
    addWarInfo(){
      this.warform={}
      this.wartitle="addWar"
      this.dialogwarVisible=true
    },
    //编辑战役动态信息
    editwarActive(row){
        this.warform=row;
        this.wartitle="editWar"
        this.dialogwarVisible=true;
    },
    //删除战役动态信息
    delwarActive(id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //发起删除请求
        battledel(id).then(res => {
          if(res.code == 1){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //回到第一页
            this.current=1
            //刷新列表信息
            this.getwarinfo()
          }else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '您已取消删除'
        });
      });
    },
    //查看内容
    showBattle(row){
        // console.log(row);
        this.dialogWarVisible=true
        this.warform.content=row.content;
    },
    handleCurrentChange(val){
      this.current=val;
      this.getwarinfo()
    }
  }
}
</script>

<style scoped>
.input{
  display: flex;
  margin-top: 23px;
  width: 50%;
  margin-right: 10px;
}
.contentp{
    padding-right: 20px;
    font-size:16px ;
}
.textarea_input{
  height: 100%;
}
.input1{
  margin-right: 13px;
}
.input2{
  width: 100%;
}
.btns{
  margin-left:15px;
}
.cardnurse{
  margin-top: 20px;
}
.pakage{
  margin-top: 10px;
  float: right;
}
</style>
