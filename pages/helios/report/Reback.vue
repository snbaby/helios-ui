<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="流程单号：">
                    <el-input v-model="searchForm.id" clearable></el-input>
                </el-form-item>
                <el-form-item label="主机编号：">
                    <el-input v-model="searchForm.assetCode" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="search" @click="search(1)" type="primary">查询</el-button>
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
                    prop="id"
                    label="流程单号"
                >
                </el-table-column>
                <el-table-column
                    prop="assetName"
                    label="主机名"
                >
                </el-table-column>
                <el-table-column
                    prop="assetCode"
                    label="主机编号"
                >
                </el-table-column>
                <el-table-column
                    prop="assetDutyName"
                    label="责任人"
                >
                </el-table-column>
                <el-table-column
                    prop="assetDutyCode"
                    label="责任人工号"
                >
                </el-table-column>
                <el-table-column
                    prop="assetApplyName"
                    label="申请人"
                >
                </el-table-column>
                <el-table-column
                    prop="assetApplyCode"
                    label="申请人工号"
                >
                </el-table-column>
                <el-table-column
                    prop="reason"
                    label="返回原因"
                >
                </el-table-column>
                <el-table-column
                    prop="crtTime"
                    label="流程时间"
                >
                    <template slot-scope="scope">
                        {{dateFormat(scope.row.crtTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="detail(scope.row.message)"
                            type="text"
                            size="small">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <pagination :option="datas" @pageChange="pageChange"></pagination>
            </div>
        </div>
        <el-dialog title="返回流程" :visible.sync="detailDialog" width="990px">
            <table width="950px" class="record">
                <tr>
                    <td width="150px" class="tar tc-minor">流程编号</td>
                    <td width="200px" class="tal tc-primary">{{message.pId}}</td>
                    <td width="100px" class="tar tc-minor">设备编号</td>
                    <td width="200px" class="tal tc-primary">{{message.ZCH}}</td>
                    <td width="100px" class="tar tc-minor">设备名称</td>
                    <td width="200px" class="tal tc-primary">{{message.SBMC}}</td>
                </tr>
                <tr>
                    <td class="tar tc-minor">责任人</td>
                    <td class="tal tc-primary">{{message.EMPNAME}}</td>
                    <td class="tar tc-minor">责任人工号</td>
                    <td class="tal tc-primary">{{message.ZRRPERSONID}}</td>
                    <td class="tar tc-minor">安装位置</td>
                    <td class="tal tc-primary">{{message.AZWZ}}</td>
                </tr>
                <tr>
                    <td class="tar tc-minor">申请描述</td>
                    <td colspan="5">
                        <table width="100%" class="record-none">
                            <tr>
                                <td colspan="2" class="tal tc-primary">
                                    {{message.Reason}}
                                </td>
                            </tr>
                            <tr>
                                <td class="tar tc-minor">
                                    申请人:
                                </td>
                                <td width="150px" class="tal tc-primary">
                                    {{message.SQR + '-' + message.SQRID}}
                                </td>
                            </tr>
                            <tr>
                                <td class="tar tc-minor">
                                    申请时间:
                                </td>
                                <td class="tal tc-primary">
                                    {{message.SQSJ}}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr v-for="item,index in message.items" :key="index">
                    <td class="tar tc-minor">{{item.extendAttrs.WorkItemName}}</td>
                    <td colspan="5">
                        <table width="100%" class="record-none">
                            <tr>
                                <td colspan="2">
                                    {{item.content}}&nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td class="tar tc-minor">
                                    审批人:
                                </td>
                                <td width="150px" class="tal tc-primary">
                                    {{item.extendAttrs.loginUserName + '-' + item.extendAttrs.loginUserID}}
                                </td>
                            </tr>
                            <tr>
                                <td class="tar tc-minor">
                                    审批时间:
                                </td>
                                <td class="tal tc-primary">
                                    {{item.extendAttrs.ENDTIME}}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue';
    import utils from '@/util/utils';

    import {
        rebackPage
    } from '@/api/report.js';

    import {
        list
    } from '@/api/detect.js';

    export default {
        name: 'index',
        components: {
            pagination
        },
        data() {
            return {
                searchForm: {
                    assetCode: "",
                    id: "",
                },
                datas: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    list: []
                },

                detailDialog: false,
                message: {
                    ORGID: '',
                    ZRRPERSONID: '',
                    AZWZ: '',
                    SBMC: '',
                    SQRORGNAME: '',
                    ORGNAME: '',
                    pId: '',
                    SQRORGID: '',
                    EMPNAME: '',
                    Reason: '',
                    SQSJ: '',
                    SQR: '',
                    SQRID: '',
                    items: [],
                    ZCH: ''
                }

            }
        },
        created() {
            this.init();
        },
        methods: {
            dateFormat(time) {
                return utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
            },
            init() {
                this.searchForm.assetCode = '';
                this.searchForm.id = '';
                this.datas.pageNum = 1;

                this.queryPage();
            },
            search() {
                this.datas.pageNum = 1;
                this.queryPage();
            },
            pageChange(page) {
                this.datas.pageNum = page;
                this.queryPage();
            },
            queryPage() {
                const param = {
                    pageNum: this.datas.pageNum,
                    pageSize: this.datas.pageSize,
                    assetCode: this.searchForm.assetCode,
                    id: this.searchForm.id
                };
                rebackPage(param).then(res => {
                    this.datas = res.content;
                })
            },
            detail(message) {
                this.detailDialog = true;
                this.message = JSON.parse(message);
            }
        }
    };
</script>
<style>
    .record {
        border: 1px solid #c0c4cc;
        border-collapse: collapse;
    }

    .record tr{
        border: 1px solid #c0c4cc;
        border-collapse: collapse;
    }

    .record tr td{
        border: 1px solid #c0c4cc;
        border-collapse: collapse;
    }

    .record-none {
        border: 0px solid #c0c4cc;
        border-collapse: collapse;
    }

    .record-none tr{
        border: 0px solid #c0c4cc;
        border-collapse: collapse;
    }

    .record-none tr td{
        border: 0px solid #c0c4cc;
        border-collapse: collapse;
    }

    .record td {
        padding-left: 10px;
        padding-right: 10px;
        line-height: 42px;
        font-size: 14px;
    }

    .tar {
        text-align: right;
    }

    .tal {
        text-align: left;
    }

    .tc-primary {
        color: #333333;
    }

    .tc-minor {
        color: #a6a6a6;
    }


</style>
