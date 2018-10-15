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
        <el-dialog title="修改密码" :visible.sync="changePassWordDialog">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkNewPassword">
                    <el-input type="password" v-model="form.checkNewPassword"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changePassWordDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {logout, uptPassword} from '@/api/auth.js';

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
                systemName: '重要信息设备监控与管理系统',
                changePassWordDialog: false,
                userInfo: {
                    name: "",
                    username: "",
                },
                form: {
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
                this.userInfo.name = sessionStorage.getItem("name");
                this.userInfo.username = sessionStorage.getItem("code");
            },

            //修改密码
            updata() {
                this.changePassWordDialog = true;
                this.form.oldPassword = "";
                this.form.newPassword = "";
                this.form.checkNewPassword = "";
            },
            confirm() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    uptPassword(this.form).then(res => {
                        this.$notify.success({
                            title: '成功',
                            message: '修改密码成功'
                        });
                        this.$router.replace({path: '/login'});
                    });
                })
            },
            cancel() {
                logout().then(res => {
                    this.$router.replace({path: '/login'});
                })
            }
        }
        ,
        created() {
            this.init();
        }
    }
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
        top: 18px;
    }
</style>
