<template>
    <div>
        <div class="input">
            <el-input placeholder="请输入抗议先锋名称" v-model="username" @keyup.enter.native="searchEnterFun" class="input2" clearable>
                <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
            </el-input>
            <el-button type="primary" size="medium" @click="addAntiInfo" class="btns">
                添加信息
            </el-button>
        </div>
        <el-card class="cardnurse">
            <el-table
                    :data="antiActivelist"
                    stripe
                    style="height: 100%; width: 100%">
                <el-table-column
                        prop="id"
                        label="ID"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="护士"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="前往城市"
                        width="150" >
                </el-table-column>
                <el-table-column
                        prop="patient"
                        label="简述"
                      >
                </el-table-column>
                <el-table-column
                        prop="goTime"
                        :formatter="goformatTime"
                        label="开始时间"
                        width="320">
                </el-table-column>
                <el-table-column
                        prop="endTime"
                        :formatter="endformatTime"
                        label="结束时间"
                        width="320">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="scope" style="text-align: center">
                        <el-button @click="editantiActive(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
                        <el-button  @click="delantiActive(scope.row,scope.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
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
            <el-dialog :title="titleAntiMap[wartitle]"  :visible.sync="dialogantiVisible" width="650px" @close="clearfeild">
                <el-form :model="antiform" :rules="rules" ref="antiform">
                    <!--          <el-form-item label="ID" :label-idwidth="formLabelWidth" v-if="visible">-->
                    <!--            <el-input v-model="antiform.id"  autocomplete="off"></el-input>-->
                    <!--          </el-form-item>-->
                    <el-form-item label="姓名"  :label-width="formLabelWidth" prop="username">
                        <el-input  placeholder="请输入抗疫先锋姓名" v-model="antiform.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="前往城市" :label-width="formLabelWidth" prop="city">
                        <el-input v-model="antiform.city" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="简述" :label-width="formLabelWidth" prop="patient">
                    <el-input  v-model="antiform.patient" autocomplete="off" ></el-input>
                </el-form-item>
                    <el-form-item label="开始时间" :label-width="formLabelWidth" prop="go_time">
                        <el-date-picker
                                v-model="go_time"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" :label-width="formLabelWidth" prop="end_time">
                        <el-date-picker
                                v-model="end_time"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogantiVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAnti()">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import moment from 'moment'
    import {guardadd, guarddel, guardpage, guardupdate} from "../../utils/request";
    export default {
        name: "Antipioneer",
        data(){
            return{
                //开始时间
                go_time:'',
                //结束时间
                end_time:'',
                dialogWarVisible:false,
                visible:false,
                titleAntiMap:{
                    addAnti:'添加抗疫先锋信息',
                    editAnti:'编辑抗疫先锋信息'
                },
                formLabelWidth:'80px',
                wartitle:'',
                antiActivelist:[],
                antiform:{
                    username:'',
                    city:'',
                    patient:'',
                    goTime:'',
                    endTime:''
                },
                dialogantiVisible:false,
                pageSize:10,
                current:1,
                size:6,
                pages:2,
                total:5,
                username:'',
                rules:{
                    username:[
                        { required: true, message: '抗疫先锋姓名不能为空',trigger:'blur'},
                    ],
                    city:[
                        { required: true,message: '请输入抗疫城市', trigger: 'blur' },
                    ],
                    patient:[
                        { required: true,message: '请输入病人姓名', trigger: 'blur' },
                    ],
                    // go_time:[
                    //     { required: true,message: '请输入抗疫开始时间', trigger: 'blur' },
                    // ]
                }
            }
        },
        mounted() {
            this.getguardinfo()
        },
        methods:{
            //日期格式
            goformatTime(row){
                if(row.goTime){
                    return moment(row.goTime).format("YYYY-MM-DD HH:mm:ss")
                }else{
                    return '';
                }

            },
            endformatTime(row){
                if (row.endTime) {
                    return moment(row.endTime).format("YYYY-MM-DD HH:mm:ss");
                }else{
                    return '';
                }

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
                this.getguardinfo()
            },
            getguardinfo(){
                const param={};
                param.size=this.size;
                param.current=this.current
                //把搜索的关键字传递给后台关键字
                param.username=this.username
                param.title=this.title
                guardpage(param).then(res => {
                    if (res.code == 1){
                        // console.log(res)
                        this.antiActivelist=res.data.records;
                        this.total=res.data.total;
                    }else{
                        this.antiActivelist=''
                        this.total=1;
                    }
                })
            },
            //确定添加/编辑
            addAnti(){
                if (this.wartitle == "addAnti"){
                    this.antiform.goTime = moment(this.go_time).format("YYYY-MM-DD HH:mm:ss");
                    this.antiform.endTime = moment(this.end_time).format("YYYY-MM-DD HH:mm:ss");
                    var addAntiForm = JSON.stringify(this.antiform);
                    this.$refs.antiform.validate((valid) => {
                        if (valid) {
                            //    发送请求
                            guardadd(addAntiForm).then(res => {
                                if (res.code == 1) {
                                    this.go_time='';
                                    this.end_time='';
                                    //提示信息
                                    this.$message.success("添加成功");
                                    //关闭列表
                                    this.dialogantiVisible = false;
                                    //刷新列表
                                    this.getguardinfo();
                                } else {
                                    this.$message(res.message)
                                }
                            })
                        }
                    })


                }
                else {
                    //  修改对话框操作
                    this.antiform.goTime = moment(this.go_time).format("YYYY-MM-DD HH:mm:ss");
                    this.antiform.endTime = moment(this.end_time).format("YYYY-MM-DD HH:mm:ss");
                    var editantiForm = JSON.stringify(this.antiform);
                    this.$refs.antiform.validate((valid) => {
                        if (valid) {
                            guardupdate(editantiForm).then(res => {
                                if (res.code == 1){
                                    this.end_time='';
                                    this.go_time='';
                                    this.dialogantiVisible=false;
                                    this.getguardinfo();
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
                    this.$refs.antiform.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.nurseform.resetFields()，去除验证
                });
            },
            //添加战役动态信息
            addAntiInfo(){
                this.antiform={}
                this.wartitle="addAnti"
                this.dialogantiVisible=true
            },
            //编辑战役动态信息
            editantiActive(row){
                this.antiform=row;
                this.wartitle="editAnti"
                this.dialogantiVisible=true;
            },
            //删除医用人员信息
            delantiActive(id){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发起删除请求
                    guarddel(id).then(res => {
                        if(res.code == 1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //回到第一页
                            this.current=1
                            //刷新列表信息
                            this.getguardinfo()
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
                this.getguardinfo()
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
