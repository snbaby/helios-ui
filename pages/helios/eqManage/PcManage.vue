<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="设备编号：">
                    <el-input v-model="searchForm.assetCode" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search()" type="primary">查询</el-button>
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
                    prop="assetCode"
                    label="设备编号"
                >
                </el-table-column>
                <el-table-column
                    prop="assetName"
                    label="设备名称"
                >
                </el-table-column>
                <el-table-column
                    prop="orgName"
                    label="责任部门"
                >
                </el-table-column>
                <el-table-column
                    prop="assetDutyCode"
                    label="责任人工号"
                >
                </el-table-column>
                <el-table-column
                    prop="assetDutyName"
                    label="责任人姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="assetType"
                    label="服务器类型"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="设备状态"
                >
                    <template slot-scope="scope">
                        {{convertStatus(scope.row.status)}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            :disabled="scope.row.status != '3'"
                            @click.native.prevent="rebackConfirm(scope.row.assetCode)"
                            type="text"
                            size="small">
                            确认返回
                        </el-button>
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
    import {
        page,
        rebackConfirm
    } from '@/api/pc.js';
    import utils from '@/util/utils';

    export default {
        components: {
            pagination
        },
        data() {
            return {
                searchForm: {
                    assetCode: "",
                },
                datas: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    list: []
                },

                newUserDialog: false
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.searchForm.assetCode = '';
                this.datas.pageNum = 1;
                this.queryPage();
            },
            convertStatus(status) {
                return utils.convertStatus(status);
            },
            rebackConfirm(assetCode) {
                const param = {
                    assetCode: assetCode,
                };
                rebackConfirm(param).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: '确认返回成功'
                    });
                    this.init();
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
                };
                page(param).then(res => {
                    this.datas = res.content;
                })
            }
        }

    };
</script>
