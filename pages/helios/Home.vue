<template>
    <div class="pageContent">
        <div class="overview_header">
            <div class="overview_header_outline">
                <div class="exception_header">
                    <div class="header_description">设备异常（{{info.abNormal}}）</div>
                </div>
                <div class="rb_header">
                    <div class="header_description">设备返回（{{info.reback}}）</div>
                </div>
                <div class="leave_header">
                    <div class="header_description">设备离开（{{info.leave}}）</div>
                </div>
                <div class="normal_header">
                    <div class="header_description">连接正常（{{info.normal}}）</div>
                </div>
            </div>
        </div>
        <div class="overview_content">
            <div class="overview_content_outline" v-for="item in info.list">
                <div class="detect_info">
                    {{item.name}}
                </div>
                <div class="detect_outline">
                    <div class="detect">

                        <div class="detect_port" v-for="itemPort in item.detectPortList"
                             v-bind:class="getPortClass(itemPort.status)">
                            <div class="detect_description">
                                {{itemPort.name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pc_outline">
                    <div class="pc" v-for="itemPc,index in item.detectPcList" v-bind:class="(index+1)%4 == 0?'':'mr8'">
                        <div class="pc_img" v-bind:class="getPcClass(itemPc.status)">
                        </div>
                        <div class="pc_info">
                            <div class="pc_info_description mt20">
                                {{itemPc.assetCode}}
                            </div>
                            <div class="pc_info_description mt4">
                                {{itemPc.assetDutyName}}/{{itemPc.assetDutyCode}}
                            </div>
                            <div class="pc_info_description mt4">
                                {{item.name}}/{{itemPc.portName}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                    list: [],
                    reback: 0,
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
                }, 3000);
            },
            getPortClass(status) {
                if (status == '0') {
                    return 'normal_middle';
                } else if (status == '1') {
                    return 'exception_middle';
                } else if (status == '2') {
                    return 'leave_middle';
                } else if (status == '3') {
                    return 'rb_middle';
                } else if (status == '-1') {
                    return 'default_middle';
                }
            },
            getPcClass(status) {
                if (status == '0') {
                    return 'pc_normal';
                } else if (status == '1') {
                    return 'pc_exception';
                } else if (status == '2') {
                    return 'pc_leave';
                } else if (status == '3') {
                    return 'pc_rb';
                }
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

    .overview_header {
        height: 28px;
    }

    .overview_header_outline {
        height: 100%;
        width: 1000px;
        margin: 0 auto;
    }

    .normal_header {
        background: url("/static/default/img/normal_small.png") left no-repeat;
        float: right;
        margin-left: 40px;
        height: 100%;
    }

    .rb_header {
        background: url("/static/default/img/rb_small.png") left no-repeat;
        float: right;
        margin-left: 40px;
        height: 100%;
    }

    .exception_header {
        background: url("/static/default/img/exception_small.png") left no-repeat;
        float: right;
        margin-left: 40px;
        height: 100%;
    }

    .leave_header {
        background: url("/static/default/img/leave_small.png") left no-repeat;
        float: right;
        margin-left: 40px;
        height: 100%;
    }

    .header_description {
        size: 14px;
        color: #333333;
        font-family: "Microsoft YaHei";
        line-height: 28px;
        margin-left: 21px;
    }

    .overview_content {
        padding-top: 10px;
        text-align: center;
    }

    .overview_content_outline {
        padding: 10px;
        border: 1px solid #ebeef5;
        width: 1000px;
        margin: 10px auto;
    }

    .detect_outline {
        background: url("/static/default/img/bj.png") center no-repeat;
        width: 100%;
    }

    .detect {
        width: 100%;
        height: 102px;
        margin-left: 31px;
    }

    .detect_port {

        height: 100%;
        margin-right: 13px;
        margin-left: 13px;

        float: left;
    }

    .default_middle {
        background: url("/static/default/img/default.png") left no-repeat;
    }

    .normal_middle {
        background: url("/static/default/img/normal_middle.png") left no-repeat;
    }

    .exception_middle {
        background: url("/static/default/img/exception_middle.png") left no-repeat;
    }

    .rb_middle {
        background: url("/static/default/img/rb_middle.png") left no-repeat;
    }

    .leave_middle {
        background: url("/static/default/img/leave_middle.png") left no-repeat;
    }

    .detect_description {
        size: 12px;
        color: #ffffff;
        font-family: "Microsoft YaHei";
        text-align: left;
        padding-top: 78px;
    }

    .pc_outline {
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
    }

    .pc {
        width: 242px;
        height: 100px;
        background-color: #edf1fa;
        border: 1px solid #e1e4ec;
        float: left;
        margin-top: 10px;
    }

    .mr8 {
        margin-right: 8px;
    }

    .pc_img {
        margin-left: 22px;
        height: 100%;
        width: 26px;
        float: left;
    }

    .pc_rb {
        background: url("/static/default/img/pc_rb.png") left no-repeat;
    }

    .pc_normal {
        background: url("/static/default/img/pc_normal.png") left no-repeat;
    }

    .pc_exception {
        background: url("/static/default/img/pc_exception.png") left no-repeat;
    }

    .pc_leave {
        background: url("/static/default/img/pc_leave.png") left no-repeat;
    }

    .pc_info {
        height: 100%;
        margin-left: 10px;
        float: left;
    }

    .pc_info_description {
        width: 100%;
        size: 12px;
        text-align: left;

    }

    .mt20 {
        margin-top: 20px;
    }

    .mt4 {
        margin-top: 4px;
    }

    .detect_info{
        text-align: left;
        color: #333333;
        font-family: "Microsoft YaHei";
        line-height: 30px;
    }
</style>
