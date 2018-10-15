<template>
    <div class="login">
        <div class="header">
            <div class="header-logo">
            </div>
            <div class="header-title">
                重要信息设备监控与管理系统
            </div>
        </div>
        <div class="content">
            <div class="content-login">
                <div class="content-login-title">
                    系统登陆
                </div>
                <div class="login-area">
                    <div class="error-info">
                        {{errorInfo}}
                    </div>
                    <div>
                        <input v-model="loginForm.code" placeholder="请输入用户名">
                    </div>
                    <div>
                        <input v-model="loginForm.password" type="password" placeholder="请输入密码"
                               @keyup.enter="login">
                    </div>
                    <div class="button" @click="login">
                        <p>登录</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            ©2018四川西盾科技有限公司
        </div>
    </div>
</template>

<script>
    import {
        menuTree
    } from '@/api/menu.js';
    import {
        login
    } from '@/api/auth.js';

    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    code: "",
                    password: ""
                },
                errorInfo: "",
            }
        },
        methods: {
            login() {
                this.errorInfo = '';
                if (this.loginForm.code == '') {
                    this.errorInfo = '用户名为空';
                } else if (this.loginForm.password == '') {
                    this.errorInfo = '密码为空';
                } else {
                    login(this.loginForm).then(res=>{
                        sessionStorage.setItem('authMenu',JSON.stringify(res.content.authMenu));
                        sessionStorage.setItem('authMenuTree',JSON.stringify(res.content.authMenuTree));
                        sessionStorage.setItem('name',res.content.name);
                        sessionStorage.setItem('code',res.content.code);
                        this.$router.push({
                            path: '/helios/home'
                        });
                    })

                }
            },
        }
    };
</script>

<style>
    html, body {
        height: 100%;
    }

    .login {
        min-height: 948px;
        min-width: 1024px;
        width: 100%;
        height: 100%;
    }

    .header {
        height: 120px;
        width: 100%;
        background-color: #ffffff;
    }

    .header-logo {
        background-image: url(/static/default/img/logo.png);
        background-size: 100% 100%;
        width: 120px;
        height: 100%;
        float: left;
    }

    .header-title {
        text-align: left;
        color: #004ea2;
        font-size: 32px;
        line-height: 120px;
        height: 100%;
        float: left;
    }

    .content {
        height: calc(100% - 170px) !important;
        width: 100%;
        background-image: url("/static/default/img/background.png");
        background-position-x: center;
        background-position-y: center;
        background-color: #05256e;
        background-repeat: no-repeat;
    }

    .error-info {
        color: #e8380b;
        position: absolute;
        top: 8px;
        left: 21px;
        font-weight: 500;
    }

    .footer {
        height: 50px;
        width: 100%;
        background-color: #f0f0f0;
        font-size: 16px;
        color: #666666;
        line-height: 50px;
        text-align: center;
    }

    .content-login {
        position: absolute;
        width: 384px;
        border-radius: 8px;
        top: calc(221px + ((100% - 778px) / 2)) !important;
        box-shadow: 0 0 15px #000000;
        opacity: 14;
        right: 200px;
    }

    .content-login-title {
        background-color: #004ea2;
        height: 64px;
        border-radius: 8px 8px 0px 0px;

        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 64px;
    }

    .button {
        font-size: 18px;
        background-color: #004ea2;
        color: #ffffff;
        border-radius: 8px;
        margin: 0px 20px;
        line-height: 48px;
        cursor: pointer;

    }

    .login-area {
        background-color: white;
        border-radius: 0px 0px 8px 8px;
        position: relative;
        padding-top: 30px;
        padding-bottom: 20px;
        text-align: center;
    }

    .login-area input {
        width: 300px;
        border: 1px solid #f0f0f0;
        padding: 12px 20px;
        border-radius: 8px 8px 0px 0px;
        font-size: 16px;
    }

    .login-area input::placeholder {
        color: #bbbbbb;
        font-size: 16px;
    }

    .login-area input:focus {
        outline-style: none;
    }
</style>
