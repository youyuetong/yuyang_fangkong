<template>
    <div>
        <div class="input">
            <el-input placeholder="请输入标题公告" v-model="title" @keyup.enter.native="searchEnterFun" class="input2" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchnotice" ></el-button>
            </el-input>
            <el-button type="primary" size="medium" @click="addNoticeInfo" class="btns">
                添加公告
            </el-button>
        </div>
        <el-card class="cardnotice">
            <el-table
                    :data="Noticelist"
                    stripe
                    style="height: 100%; width: 100%">
                <el-table-column
                        prop="id"
                        label="ID"
                        width="140"
                >
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        width="240">
                </el-table-column>
                <el-table-column
                        prop="auth"
                        label="发布者"
                        >
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        :formatter="formatTime"
                        label="发布时间"
                        >
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作">
                    <template slot-scope="scope" style="text-align: center">
                        <el-button @click="showNotice(scope.row)" type="text" size="small" icon="el-icon-s-order">内容</el-button>
                        <el-button @click="editNotice(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
                        <el-button  @click="delNotice(scope.row,scope.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
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
            <el-dialog :title="titlenoticeMap[noticetitle]"  :visible.sync="dialognoticeVisible" width="650px" @close="clearfeild">
                <el-form :model="noticeform" :rules="rules" ref="noticeform">
                    <!--          <el-form-item label="ID" :label-idwidth="formLabelWidth" v-if="visible">-->
                    <!--            <el-input v-model="noticeform.id"  autocomplete="off"></el-input>-->
                    <!--          </el-form-item>-->
                    <el-form-item label="标题"  :label-width="formLabelWidth" prop="title">
                        <el-input  placeholder="请输入公告标题" v-model="noticeform.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" :label-width="formLabelWidth" prop="auth">
                        <el-input v-model="noticeform.auth" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                        <el-input type="textarea" :rows="6" v-model="noticeform.content" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialognoticeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNoticeMsg()">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="避谣专题内容" :visible.sync="Nvisible" width="600px">
                <el-form :model="noticeform">
                    <el-form-item  :label-width="formLabelWidth">
                        <div class="contentp">
                        <span>
                        {{noticeform.content}}
                    </span>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Nvisible = false" type="primary">关闭</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import moment from 'moment'
    import {
        noticeadd,
        noticedel,
        noticepage,
        noticeupdate,
        refuteadd,
        refutedel,
        refutepage,
        refuteupdate
    } from "../../utils/request";
    export default {
        name: "RefuteMsg",
        data(){
            return{
                dialognoticeVisible:false,
                titlenoticeMap:{
                    addnotice:'添加避谣专题信息',
                    editnotice:'编辑避谣专题信息'
                },
                formLabelWidth:'80px',
                noticetitle:'',
                Noticelist:[],
                noticeform:{
                    title:'',
                    auth:'',
                    content:''
                },
                Nvisible:false,
                pageSize:10,
                current:1,
                size:6,
                pages:2,
                total:5,
                title:'',
                rules:{
                    title:[
                        { required: true, message: '公告标题不能为空',trigger:'blur'},
                    ],
                    auth:[
                        { required: true,message: '请输入发布公告作者名称', trigger: 'blur' },
                    ],
                    content:[
                        { required: true,message: '请输入公告内容', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted() {
            this.getnoticeinfo()
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
                    this.searchnotice();
                }
            },
            searchnotice(){
                // 点击搜索按钮重新获取内容
                this.getnoticeinfo()
            },
            getnoticeinfo(){
                const param={};
                param.size=this.size;
                param.current=this.current
                //把搜索的关键字传递给后台关键字
                param.title=this.title
                noticepage(param).then(res => {
                    if (res.code == 1){
                        // console.log(res)
                        this.Noticelist=res.data.records;
                        this.total=res.data.total;
                    }else{
                        this.Noticelist=''
                        this.total=1;
                    }
                })
            },
            //确定添加/编辑
            addNoticeMsg(){
                if (this.noticetitle == "addnotice"){
                    var addNoticeForm = JSON.stringify(this.noticeform);
                    this.$refs.noticeform.validate((valid) => {
                        if (valid) {
                            //    发送请求
                            noticeadd(addNoticeForm).then(res => {
                                if (res.code == 1) {
                                    //提示信息
                                    this.$message.success("添加成功")
                                    //关闭列表
                                    this.dialognoticeVisible = false;
                                    //刷新列表
                                    this.getrefuinfo();
                                } else {
                                    this.$message(res.message)
                                }
                            })
                        }
                    })


                }
                else {
                    //  修改对话框操作
                    var editNoticeForm = JSON.stringify(this.noticeform);
                    this.$refs.noticeform.validate((valid) => {
                        if (valid) {
                            noticeupdate(editNoticeForm).then(res => {
                                if (res.code == 1){
                                    this.dialognoticeVisible=false;
                                    this.getrefuinfo();
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
                    this.$refs.noticeform.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.nurseform.resetFields()，去除验证
                });
            },
            //添加公告信息
            addNoticeInfo(){
                this.noticeform={}
                this.noticetitle="addnotice"
                this.dialognoticeVisible=true
            },
            //编辑公告信息
            editNotice(row){
                this.noticeform=row;
                this.noticetitle="editnotice"
                this.dialognoticeVisible=true;
            },
            //删除避谣信息
            delNotice(id){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发起删除请求
                    noticedel(id).then(res => {
                        if(res.code == 1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //回到第一页
                            this.current=1
                            //刷新列表信息
                            this.getrefuinfo()
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
            showNotice(row){
                // console.log(row);
                this.Nvisible =true
                this.noticeform.content=row.content;
            },
            handleCurrentChange(val){
                this.current=val;
                this.getrefuinfo()
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
    .input2{
        width: 65%;
    }
    .btns{
        margin-left:15px;
    }
    .cardnotice{
        margin-top: 20px;
    }
    .pakage{
        margin-top: 10px;
        float: right;
    }
</style>
