<template>
    <div class="pageContent">
        <el-col :span="4">
            <el-row class="marginTop">
                <el-col :span="9" class="imgGreen"></el-col>
                <el-col :span="15">设备正常:{{info.normal}}</el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col :span="9" class="imgRed"></el-col>
                <el-col :span="15">设备异常:{{info.abNormal}}</el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col :span="9" class="imgBlue"></el-col>
                <el-col :span="15">授权离开:{{info.leave}}</el-col>
            </el-row>
            <el-row class="marginCenter">
                <el-col :span="16" class="centerImg">
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="20">
            <el-row>
                <span v-for="item,index in info.list" :key="index">
                    <el-col :span="6" class="boxBorder">
                        <el-row>
                            <font class="cabinetFont">{{item.name}}</font>
                            <el-popover
                                placement="right"
                                width="40"
                                trigger="click">
                                        <div class="chooseText">设备管理</div>
                                        <div class="chooseText">报警管理</div>
                                        <div class="imgCabinet" slot="reference"></div>
                            </el-popover>
                        </el-row>
                        <el-row>
                            <el-col :span="24%item.detectPcList.length/2">&nbsp;</el-col>
                            <el-col :span="parseInt(24/item.detectPcList.length)"
                                    v-for="detectPc,index in item.detectPcList" :key="index">
                                <el-row class="sensorDevice">
                                    {{detectPc.portName}}
                                </el-row>
                                <el-row style="height: 39px">
                                    <el-popover
                                        placement="right"
                                        width="40"
                                        trigger="click">
                                        <div class="chooseText">设备信息</div>
                                        <div class="chooseText">报警管理</div>
                                        <div class="imgHostRed" slot="reference" v-if="detectPc.status == '1'"></div>
                                        <div class="imgHostGreen" slot="reference" v-if="detectPc.status == '0'"></div>
                                        <div class="imgHostGray" slot="reference" v-if="detectPc.status == '2'"></div>
                                        <!--<div class="imgHostBlue" slot="reference" v-if="detectPc.status == 'live'"></div>-->
                                    </el-popover>
                                </el-row>
                                <el-row class="sensorDetector">
                                    {{detectPc.assetCode}}
                                </el-row>
                            </el-col>
                            <el-col :span="24%item.detectPcList.length/2">&nbsp;</el-col>
                        </el-row>
                    </el-col>
                </span>
            </el-row>
        </el-col>
    </div>
</template>

<script>
    import {
        info
    } from '@/api/overview.js';

    export default {
        components: {},
        data() {
            return {
                info: {
                    normal: 0,
                    abNormal: 0,
                    leave: 0,
                    list: []
                },
                interval: null
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                const self = this;
                this.interval = setInterval(function () {
                    info().then(res => {
                        self.info = res.content;
                    })
                }, 5000);
            }
        },
        beforeDestroy() {
            if (this.interval != null) {
                clearInterval(this.interval);
            }
        }

    }

</script>


<style lang="css" scoped>
    .pageContent {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
    }

    ::-webkit-scrollbar {
        display: none
    }

    .sensorDetector {
        margin-bottom: 20px;
        text-align: center;
        height: 20px
    }

    .sensorDevice {
        margin-top: 20px;
        text-align: center;
        height: 20px
    }

    .boxBorder {
        border: 1px solid;
    }

    .imgGreen {
        background: url("/static/default/img/green.png") right no-repeat;
        height: 20px;
    }

    .imgRed {
        background: url("/static/default/img/red.png") right no-repeat;
        height: 20px;
    }

    .imgBlue {
        background: url("/static/default/img/blue.png") right no-repeat;
        height: 20px;
    }

    .marginTop {
        margin-top: 20px;
    }

    .centerImg {
        background: url("/static/default/img/center.png") right no-repeat;
        height: 100px;
    }

    .marginCenter {
        margin-top: 100%;
    }

    .cabinetFont {
        line-height: 40px;
        position: absolute;
        margin-left: calc(50% + 23px);
        margin-top: 20px;
    }

    .imgCabinet {
        background: url("/static/default/img/cabinet.png");
        height: 49px;
        width: 35px;
        cursor: pointer;
        margin: auto;
        margin-top: 20px;
        /*center no-repeat;*/
        /*height: 50px;*/
        /*margin-top: 20px;*/
    }

    .imgHostGreen {
        background: url("/static/default/img/hostGreen.png") center no-repeat;
        height: 39px;
        width: 41px;
        margin: auto;
        cursor: pointer;
    }

    .imgHostGray {
        background: url("/static/default/img/hostGray.png") center no-repeat;
        height: 39px;
        width: 41px;
        margin: auto;
        cursor: pointer;
    }

    .imgHostBlue {
        background: url("/static/default/img/hostBlue.png") center no-repeat;
        height: 39px;
        width: 41px;
        margin: auto;
        cursor: pointer;
    }

    .imgHostRed {
        background: url("/static/default/img/hostRed.png") center no-repeat;
        height: 39px;
        width: 41px;
        margin: auto;
        cursor: pointer;
    }

    .imgHostGrey {
        /*background: url("/static/default/img/hostGreen.png") center no-repeat;*/
        height: 39px;
    }

    .chooseText {
        cursor: pointer;
        text-align: center;
        line-height: 30px;
    }
</style>
