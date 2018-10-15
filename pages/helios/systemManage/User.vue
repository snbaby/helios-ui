<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="用户名称：">
                    <el-input v-model="searchForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户编码：">
                    <el-input v-model="searchForm.code" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search()" type="primary">查询</el-button>
                    <el-button @click="add()">新建</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="datas.list">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="用户编号"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名称"
                >
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="del(scope.row)"
                            type="text"
                            size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <pagination :option="datas" @pageChange="pageChange"></pagination>
            </div>
        </div>
        <el-dialog title="新建人员" :visible.sync="newUserDialog">
            <el-form :model="formInline" :rules="rules" ref="formInline">
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="formInline.name" placeholder="用户名称" ></el-input>
                </el-form-item>
                <el-form-item label="用户编码" prop="code">
                    <el-input v-model="formInline.code" placeholder="用户编码" ></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input type="password" v-model="formInline.password" placeholder="登录密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="formInline.checkPassword" placeholder="确认密码"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue';
    import {
        page,
        add,
        del
    } from '@/api/user.js';

    export default {
        components: {
            pagination
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.formInline.password && this.formInline.password) {
                    callback(new Error("两次输入密码不一致!"));
                }
                else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.formInline.password && this.formInline.password) {
                    callback(new Error("两次输入密码不一致!"));
                }
                else {
                    callback();
                }
            };
            return {
                searchForm: {
                    name: "",
                    code: "",
                },
                datas: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    list: []
                },

                newUserDialog: false,
                formInline: {
                    code:"",
                    name:"",
                    password: "",
                    checkPassword: "",
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: "用户名不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [{
                        required: true,
                        message: "用户编码不能为空",
                        trigger: "blur"
                    }],
                    password: [{required: true,validator: validatePass, trigger: "blur"}],
                    checkPassword: [{required: true,validator: validatePass2, trigger: "blur"}]
                },
            }
        },
        created(){
            this.init();
        },
        methods: {
            init(){
                this.searchForm.name = '';
                this.searchForm.code = '';
                this.datas.pageNum = 1;

                this.queryPage();
            },
            search() {
                this.datas.pageNum = 1;
                this.queryPage();
            },
            confirm() {
                this.$refs['formInline'].validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    const param = {
                        name: this.formInline.name,
                        code: this.formInline.code,
                        password: this.formInline.password
                    };
                    add(param).then(res=>{
                        this.$notify.success({
                            title: '成功',
                            message: '新建人员成功'
                        });
                        this.init();
                        this.newUserDialog = false;
                    })
                });

            },
            pageChange(page) {
                this.datas.pageNum = page;
                this.queryPage();
            },
            queryPage() {
                const param = {
                    pageNum: this.datas.pageNum,
                    pageSize: this.datas.pageSize,
                    name: this.searchForm.name,
                    code: this.searchForm.code
                };
                page(param).then(res => {
                    this.datas = res.content;
                })
            },
            add(){
                this.formInline.code = '';
                this.formInline.name = '';
                this.formInline.password = '';
                this.formInline.checkPassword = '';

                this.newUserDialog = true;

            },
            del(row){
                const param = {
                    id: row.id,
                };
                del(param).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: '删除人员成功'
                    });
                    this.init();
                })
            }
        }

    };
</script>
