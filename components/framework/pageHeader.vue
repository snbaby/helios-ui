<template>
    <div class="pageHeader">
        <el-row style="padding: 0 20px;height: 100%;">
            <el-col :span="12" style="height: 100%;">
                <div class="sysName">
                    <font>{{systemName}}</font>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="float: right;">
                    <el-popover ref="popover4" placement="bottom-end" trigger="hover">
                        <div>
                            <div class="userInfo">[姓名]{{userInfo.name}}</div>
                            <div class="userInfo">[工号]{{userInfo.username}}</div>
                            <div class="userInfo">[部门]{{userInfo.depName}}</div>
                            <div style="text-align: center;cursor: default" class="userInfo userInfoHover"
                                 @click="updata">修改密码
                            </div>
                            <div style="text-align: center;cursor: default" class="userInfo userInfoHover"
                                 @click="cancel">注销
                            </div>
                        </div>
                        <div slot="reference" class="logoBox">
                            <img src="/static/default/img/nav_header.png"/>
                        </div>
                    </el-popover>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="修改密码" :visible.sync="changePassWordDialog" width="30%" id="changePassWord">
            <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username" :readonly="true" style="width: 100%"></el-input>
                </el-form-item>
                <input type="hidden">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword"  style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword"  style="width: 100%"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkNewPassword">
                    <el-input type="password" v-model="form.checkNewPassword"  style="width: 100%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changePassWordDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {fetch} from '@/core/fetch.js';

    export default {
        name: 'pageHeader',
        data() {
            var checkNewPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var newPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/.test(value)) {
                    callback(new Error('密码包含字母数字，长度为8-12个字符'));
                } else {
                    callback();
                }
            };
            return {
                systemName: '信息安全综合保障系统',
                changePassWordDialog: false,
                userInfo: {
                    name: "",
                    username: "",
                    depName: ""
                },
                form: {
                    username: "",
                    oldPassword: "",
                    newPassword: "",
                    checkNewPassword: ""
                },
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入原密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {validator: newPassword, trigger: 'change'},
                        {required: true, message: '请输入新密码', trigger: 'change'},
                    ],
                    checkNewPassword: [
                        {validator: checkNewPassword, trigger: 'change'},
                        {required: true, message: '请再次输入新密码', trigger: 'change'},
                    ],
                }
            };
        },
        methods: {
            init() {
                const data = JSON.parse(sessionStorage.getItem('info'));
                this.userInfo.name = data.name;
                this.userInfo.username = data.username;
                for (let i in data.groups) {
                    if (data.groups[i].type == 2) {
                        this.userInfo.depName = data.groups[i].name;
                        break;
                    }
                }
            },

            //修改密码
            updata() {
                this.changePassWordDialog = true;

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.username = this.userInfo.username;
                        fetch({
                            "url": '/api/admin/user/update/password',
                            "data": this.form,
                            "method": "post"
                        })
                            .then((data) => {
                                if (data.status == '200') {
                                    this.$alert('密码修改成功！', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$router.push({path: "/login"});
                                            sessionStorage.setItem("token", "");
                                            document.cookie = "dun-token=" + "";
                                        }
                                    });
                                } else {
                                    this.$alert('密码修改失败，用户名或原密码不正确！', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                        }
                                    });
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            //注销
            cancel() {
                this.$router.replace({path: '/login'});
                sessionStorage.setItem("token", "");
                document.cookie = "dun-token=" + "";
            }
        },
        created() {
            this.init();
        }
    };
</script>

<style lang="css" scoped>
    .pageHeader {
        height: 58px;
        width: 100%;
        min-width: 1024px;
        background: #004ea2;
    }

    .userInfo {
        padding: 10px 14px;
        font-size: 14px;
        color: #666;
    }

    .userInfoHover:hover {
        background: #f0f0f0;
    }

    .logoBox {
        padding-top: 10px;
    }

    .logoBox:hover {
        background: #1274de;
    }

    .sysName {
        background-image: url(/static/default/img/logo_name.png);
        background-size: 200px 100%;
        z-index: 1;
        height: 100%;
        background-repeat: no-repeat;
    }

    .sysName font {
        font-size: 20px;
        color: #fff;
        position: absolute;
        left: 235px;
        top: 26%;
    }
</style>
