<template>
    <div>
        <div class="input">
            <el-input placeholder="请输入医护姓名关键字" v-model="selectquery" @keyup.enter.native="searchEnterFun" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
            </el-input>
            <el-button type="primary" size="medium" @click="addNurseInfo" class="btns">
                添加信息
            </el-button>
        </div>
        <el-card class="cardnurse">
            <el-table
                    :data="nursemasglist"
                    stripe
                    style="height: 100%; width: 100%">
                <el-table-column
                        prop="id"
                        label="ID"
                        >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="age"
                        label="年龄"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        >
                </el-table-column>
                <el-table-column
                        prop="home"
                        label="籍贯"
                >
                </el-table-column>
                <el-table-column
                        prop="nation"
                        label="民族" >
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        :formatter="formatTime"
                        label="注册日期"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="scope" style="text-align: center">
                        <el-button @click="editnurse(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
                        <el-button  @click="delnurse(scope.row,scope.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
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
            <el-dialog :title="titlenurseMap[nursetitle]" :visible.sync="dialognurseVisible" width="650px">
                <el-form :model="nurseform" :rules="nurserformrules" :ref="nurseform">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="nurseform.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄"  :label-width="formLabelWidth">
                        <el-input type="number" placeholder="请输入年龄" v-model="nurseform.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯" :label-width="formLabelWidth">
                        <el-input v-model="nurseform.home" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="nurseform.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="nurseform.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="种族" :label-width="formLabelWidth">
                        <el-input  placeholder="请输入种族" v-model="nurseform.nation" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialognurseVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNurse()">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import {nurseadd, nursedel, nursepage, updatenurse} from "../../utils/request";
    import moment from 'moment'
export default {
    name: "NurseMsg",
    data(){
        return{
            titlenurseMap:{
                addNurse:'添加医护人员信息',
                editNurse:'编辑医护人员信息'
            },
            formLabelWidth:'80px',
            nursetitle:'',
            nursemasglist:[],
            nurseform:{
                username:'',
                home:'',
                age:'',
                phone:'',
                nation:'',
                email:''
            },
            dialognurseVisible:false,
            pageSize:10,
            current:1,
            size:6,
            pages:2,
            total:5,
            selectquery:'',
            nurserformrules:{
                username:[
                    {required: true, message: '医用人员姓名不能为空'}
                ],
                age:[
                    { required: true, message: '年龄不能为空'},
                    { type: 'number', message: '年龄必须为数字值'}
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur",
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (/^1[34578]\d{9}$/.test(value) == false) {
                                callback(new Error("手机号格式错误"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    mounted() {
        this.getnurseinfo()
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
            this.getnurseinfo()
        },
        getnurseinfo(){
            const param={};
            param.size=this.size;
            param.current=this.current
            //把搜索的关键字传递给后台关键字
            param.username=this.selectquery
            nursepage(param).then(res => {
                if (res.code == 1){
                    // console.log(res)
                    this.nursemasglist=res.data.result.records;
                    this.total=res.data.result.total;
                }
            })
        },
        //确定添加/编辑
        addNurse(){
            if (this.nursetitle == "addNurse"){
                var addNurseForm = JSON.stringify(this.nurseform);
            //    发送请求
                this.$refs[addNurseForm].validate((valid) => {
                    if (valid) {
                        nurseadd(addNurseForm).then(res => {
                            if (res.code == 1) {
                                //提示信息
                                this.$message.success("添加成功")
                                //关闭列表
                                this.dialognurseVisible = false;
                                //刷新列表
                                this.getnurseinfo();
                                //情况列表
                                this.nurseform = {};
                            } else {
                                this.$message(res.message)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
            else {
                //  修改对话框操作
                var editNurseForm = JSON.stringify(this.nurseform);
               updatenurse(editNurseForm).then(res => {
                   if (res.code == 1){
                        this.dialognurseVisible=false;
                         this.getnurseinfo();
                         this.$message.success("修改成功");
                         this.nurseform={}
                     }
                     else {
                       this.$message(res.message);
                    }
                })
            }
        },
        //添加医用人员信息
        addNurseInfo(){
            this.nursetitle="addNurse"
            // this.nursemasglist={}
            this.dialognurseVisible=true
        },
        //编辑医用人员信息
        editnurse(row){
            this.nursetitle="editNurse"
            this.dialognurseVisible=true;
            this.nurseform=row;
        },
        //删除医用人员信息
        delnurse(id){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //发起删除请求
                nursedel(id).then(res => {
                    if(res.code == 1){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //回到第一页
                        this.current=1
                        //刷新列表信息
                        this.getnurseinfo()
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
        handleCurrentChange(val){
            this.current=val;
            this.getnurseinfo()
        }
    }
}
</script>

<style scoped>
    .input{
        display: flex;
        margin-top: 23px;
        width: 40%;
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
