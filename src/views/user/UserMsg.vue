<template>
    <div>
        <el-button type="primary" class="el-button" size="medium" @click="addinfo">
            添加用户信息
        </el-button>
        <el-card class="card">
            <el-table
                    :data="usermanagerlist"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop=""
                        label="ID"
                        >
                  <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="120">
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
                        label="民族"
                        >
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="注册日期"
                        :formatter="timeFormatter"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="scope" style="text-align: center">
                        <el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
                        <el-button  @click="del(scope.row,scope.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
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
            <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogUserVisible" width="650px" @close="clearfeild">
                <el-form :model="adduserform" :rules="userformrules" ref="adduserform">
                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                        <el-input v-model="adduserform.username" autocomplete="off"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="密码" :label-width="formLabelWidth">-->
<!--                        <el-input v-model="adduserform.password" autocomplete="off"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="年龄"  :label-width="formLabelWidth" prop="age">
                        <el-input placeholder="请输入年龄" v-model.number="adduserform.age" autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="籍贯" :label-width="formLabelWidth">
                        <el-input v-model="adduserform.home" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                        <el-input v-model="adduserform.phone" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                        <el-input v-model="adduserform.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="种族" :label-width="formLabelWidth">
                        <el-input  placeholder="请输入种族" v-model="adduserform.nation" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogUserVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addform()">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    // scriptimport {updateUser, user_add, user_page, userdelete} from "../utils/request";

    import {nurseadd, updatenurse, updateUser, user_add, user_page, userdelete} from "../../utils/request";
    import moment from 'moment'
    export default {
        name: "UserMsg",
        data(){
            return{
                titleMap: {
                    addUser:'添加用户信息',
                    editUser:'编辑用户信息'
                },
                //新增和编辑弹框标题
                dialogStatus: "",
                formLabelWidth:'80px',
                adduserform:{
                    username:'',
                    home:'',
                    nation:'',
                    email:'',
                    age:'',
                    email:'',
                    phone:''
                },
                dialogUserVisible:false,
                pageSize:10,
                usermanagerlist:[],
                current:1,
                size:6,
                pages:2,
                total:5,
                userformrules:{
                    username:[
                        {required: true, message: '用户名不能为空',trigger: 'blur'}
                    ],
                    age:[
                        { required: true, message: '年龄不能为空',trigger: 'blur'},
                        // { type: 'number', message: '年龄必须为数字值',trigger: 'blur'}
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
            this.getuserinfo();
        },
        methods: {
            //日期格式
          timeFormatter(row){
              return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
            },
            //关闭对话框调用不同的接口

            addform(){
                if (this.dialogStatus == "addUser") {
                    var addUserForm = JSON.stringify(this.adduserform);
                    this.$refs.adduserform.validate((valid) => {
                        if (valid) {
                            user_add(addUserForm).then(res => {
                                if (res.code == 1) {
                                    // console.log(res)
                                    //提示添加成功
                                    this.$message.success("添加成功！")
                                    //关闭对话框
                                    this.dialogUserVisible = false;
                                    //刷新列表信息
                                    this.getuserinfo()
                                    // //清空 表单信息
                                    // this.adduserform = {};
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    })
                    // console.log("向服务器发送添加的请求！");
                } else {
                    var edituserform = JSON.stringify(this.adduserform);
                    this.$refs.adduserform.validate((valid) => {
                        if (valid) {
                            updateUser(edituserform).then(res => {
                                // alert(res.code);
                                if (res.code == 1){
                                    this.dialogUserVisible=false;
                                    this.getuserinfo();
                                    this.$message.success("修改成功")
                                    // console.log(res);
                                }else {
                                    this.$message(res.message)
                                }
                            })
                        }
                    })

                    // console.log("向服务器发送修改的请求！");
                }
            },
            //去除验证
            clearfeild(){
                this.$nextTick(()=>{
                    this.$refs.adduserform.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.nurseform.resetFields()，去除验证
                });
            },
            //添加信息
            addinfo() {
                this.adduserform={}
                this.dialogStatus="addUser"
                this.dialogUserVisible=true;
                // console.log( this.dialogStatus);
            },
            // 编辑信息
            edit(row){
                // alert(row)
                this.dialogStatus="editUser"
                this.dialogUserVisible=true;
                this.adduserform=row;
                // console.log( this.dialogStatus)
            },
            //删除信息
            del(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发起删除请求
                    userdelete(id).then(res => {
                        if(res.code == 1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //回到第一页
                            this.current=1
                            //刷新列表信息
                            this.getuserinfo()
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
            getuserinfo(){
                const param={};
                param.size=this.size;
                param.current=this.current
                user_page(param).then(res => {
                    if (res.code == 1){
                        // console.log(res)
                        this.usermanagerlist=res.data.records;
                        this.total=res.data.total;
                    }
                })
            },
            handleCurrentChange(val) {
                this.current=val;
                // console.log(val);
                this.getuserinfo()
            }
        }
    }
</script>
<style scoped>
    .el-button{
        margin-top: 25px;
    }
    .pakage{
        margin-top: 10px;
        float: right;
    }
    .card{
        margin-top: 20px;
        height: 100%;
        padding: 8px;
    }
</style>
