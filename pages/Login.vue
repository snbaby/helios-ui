<template>
    <div id="login">
            <div class="header">
                <div class="logo">
                </div>
                <div class="title">
                    重要信息设备监控与管理系统
                </div>
            </div>
            <div class="content">
                <div class="back-img">
                </div>
                <div class="content-input">
                    <div class="login-input">
                        <div class="login-header">
                            <p class="login-text">系统登陆</p>
                        </div>
                        <div class="background-color">
                            <div>
                                <input class="username" v-model="loginForm.userName" placeholder="请输入用户名">
                            </div>
                            <div>
                                <input class="password" v-model="loginForm.password" type="password" placeholder="请输入密码"
                                       @keyup.enter="login">
                            </div>
                            <div class="button" @click="login">
                                <p>登录</p>
                            </div>
                            <div class="last">
                            </div>
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
    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    userName: "",
                    password: ""
                },
                errorInfo: "",
            }
        },
        methods: {
            login() {
                this.errorInfo = '';
                if (this.loginForm.userName == "") {
                    this.errorInfo = '用户名为空';
                } else if (this.loginForm.password == "") {
                    this.errorInfo = '密码为空';
                } else {

                }
            },
        }
    };
</script>

<style>
    html, body {
        height: 100%;
    }

    #login {
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

    .logo {
        background-image: url(/static/default/img/logo.png);
        background-size: 100% 100%;
        width: 120px;
        height: 100%;
        float: left;
    }

    .title {
        text-align: left;
        color: #004ea2;
        font-size: 32px;
        line-height: 120px;
        height: 100%;
        float: left;
    }

    .content {
        position: relative;
        height: calc(100% - 170px) !important;
        width: 100%;
    }

    .footer {
        height: 50px;
        width: 100%;
        background-color: #f0f0f0;
        font-size: 16px;
        color: #666666;
        line-height: 50px;
    }

    .back-img {
        height: 100%;
        width: 100%;
        background-image: url("/static/default/img/background.png");
        position: absolute;
        background-position-x: center;
        background-position-y: center;
        background-color: #05256e;
        background-repeat: no-repeat;
    }

    .login-input {
        position: absolute;
        width: 384px;
        height: 335px;
        border-radius: 8px;
        top: calc(221px + ((100% - 778px) / 2)) !important;
        box-shadow: 0 0 15px #000000;
        opacity: 14;
        right: 20px;
    }

    .content-input {
        position: relative;
        max-width: 1280px;
        height: 100%;
        margin: auto;
        z-index: 2;
    }

    .login-header {
        background-color: #004ea2;
        height: 64px;
        border-radius: 8px 8px 0px 0px;
    }

    .login-text {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 64px;
    }

    .username, .password {
        height: 30px;
        width: 300px;
        border: 1px solid #f0f0f0;
        padding: 12px 20px;
    }

    .username {
        margin: 35px 20px 0px 20px !important;
        border-radius: 8px 8px 0px 0px;
        font-size: 16px;
    }

    .username::placeholder {
        color: #bbbbbb;
        font-size: 16px;
    }

    .username:focus, .password:focus {
        outline-style: none;
    }

    .password::placeholder {
        color: #bbbbbb;
        font-size: 16px;
        letter-spacing: normal;

    }

    .password {
        margin: 0px 20px 10px 20px !important;
        border-radius: 0px 0px 8px 8px;
        font-size: 16px;
        letter-spacing: 3px;
    }

    .button {
        width: 344px;
        height: 48px;
        font-size: 18px;
        background-color: #004ea2;
        color: #ffffff;
        border-radius: 8px;
        margin: 0px 20px;
        text-align: center;
        line-height: 48px;
        cursor: pointer;

    }

    .background-color {
        background-color: white;
        border-radius: 0px 0px 8px 8px;
        position: relative;
    }

    .last {
        width: 100%;
        height: 66px;
    }
</style>
