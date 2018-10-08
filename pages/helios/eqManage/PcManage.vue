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
                    prop="assetType"
                    label="服务器类型"
                >
                </el-table-column>
                <el-table-column
                    prop="assetCode"
                    label="设备编号"
                >
                </el-table-column>
                <el-table-column
                    prop="orgName"
                    label="责任部门"
                >
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
        page
    } from '@/api/pc.js';

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
        created(){
            this.init();
        },
        methods: {
            init(){
                this.searchForm.assetCode = '';
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
                    assetType: ''
                };
                page(param).then(res => {
                    this.datas = res.content;
                })
            }
        }

    };
</script>
