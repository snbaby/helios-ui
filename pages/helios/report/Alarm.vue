<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="侦测器：">
                    <el-select v-model="searchForm.detectId" filterable placeholder="请选择" clearable>
                        <el-option
                            v-for="item in detectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
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
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-table :data="scope.row.alarmList">
                            <el-table-column
                                type="index"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="crtTime"
                                label="报警时间"
                            >
                                <template slot-scope="innerScope">
                                    {{dateFormat(innerScope.row.crtTime)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                            >
                                <template slot-scope="innerScope">
                                    {{convertStatus(innerScope.row.status)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="uptTime"
                                label="修复时间"
                            >
                                <template slot-scope="innerScope">
                                    {{innerScope.row.uptTime?dateFormat(innerScope.row.uptTime):''}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="uUser.name"
                                label="修复人"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="uUser.code"
                                label="修复人工号"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="message"
                                label="原因"
                            >
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    type="index"
                    width="50">
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
                    prop="detectName"
                    label="侦测器"
                >
                </el-table-column>
                <el-table-column
                    prop="detectCode"
                    label="侦测器编号"
                >
                </el-table-column>
                <el-table-column
                    prop="dpName"
                    label="端口名"
                >
                </el-table-column>
                <el-table-column
                    prop="dpCode"
                    label="端口编号"
                >
                </el-table-column>
                <el-table-column
                    prop="dpPort"
                    label="端口"
                >
                </el-table-column>
                <el-table-column
                    label="报警次数"
                >
                    <template slot-scope="scope">
                        {{scope.row.alarmList.length}}
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <pagination :option="datas" @pageChange="pageChange"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue';
    import utils from '@/util/utils';

    import {
        alarmPage
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
                    detectId: "",
                },
                datas: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    list: []
                },
                detectList: [],

                newDialog: false,
                formInline: {
                    alarmId: "",
                    message: ""
                },
                rules: {
                    message: [
                        {
                            required: true,
                            message: "原因不能为空",
                            trigger: "blur"
                        }
                    ]
                },

            }
        },
        created() {
            this.init();
            this.getDetectList();
        },
        methods: {
            dateFormat(time) {
                return utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
            },
            convertStatus(status) {
                return utils.convertStatus(status);
            },
            init() {
                this.searchForm.assetCode = '';
                this.searchForm.detectId = '';
                this.datas.pageNum = 1;

                this.queryPage();
            },
            getDetectList() {
                list().then(res => {
                    this.detectList = res.content;
                })
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
                    detectId: this.searchForm.detectId
                };
                alarmPage(param).then(res => {
                    this.datas = res.content;
                })
            }
        }
    };
</script>
