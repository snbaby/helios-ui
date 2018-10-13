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
                <el-table-column
                    type="index"
                    width="50">
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
                    prop="portName"
                    label="端口名"
                >
                </el-table-column>
                <el-table-column
                    prop="portCode"
                    label="端口编号"
                >
                </el-table-column>
                <el-table-column
                    prop="portPort"
                    label="端口"
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
                    prop="alarmStatus"
                    label="状态"
                >
                    <template slot-scope="scope">
                        {{convertStatus(scope.row.alarmStatus)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="alarmMessage"
                    label="处理结果"
                >
                </el-table-column>
                <el-table-column
                    prop="crtTIme"
                    label="发生时间"
                >
                    <template slot-scope="scope">
                        {{dateFormat(scope.row.crtTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="uptTIme"
                    label="修复时间"
                >
                    <template slot-scope="scope">
                        {{scope.row.uptTime ? dateFormat(scope.row.uptTime):''}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.alarmStatus == '1' "
                            @click.native.prevent="fixed(scope.row.alarmId)"
                            type="text"
                            size="small">
                            人工修复
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <pagination :option="datas" @pageChange="pageChange"></pagination>
            </div>
        </div>
        <el-dialog title="人工修复" :visible.sync="newDialog">
            <el-form :model="formInline" :rules="rules" ref="formInline">
                <el-form-item label="原因" prop="message">
                    <el-input type="textarea" v-model="formInline.message" placeholder="原因"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue';
    import utils from '@/util/utils';

    import {
        page,
        fixed
    } from '@/api/alarm.js';

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
                page(param).then(res => {
                    this.datas = res.content;
                })
            },
            fixed(alarmId) {
                this.formInline.alarmId = alarmId;
                this.formInline.message = "";
                this.newDialog = true;
            },
            confirm() {
                const params = {
                    alarmId: this.formInline.alarmId,
                    message: this.formInline.message
                }

                fixed(params).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: '修复异常成功'
                    });
                    this.newDialog = false;
                    this.init();
                })
            }
        }
    };
</script>
