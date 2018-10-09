<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="侦测器：">
                    <el-input v-model="searchForm.code" clearable></el-input>
                </el-form-item>
                <el-form-item label="主机编号：">
                    <el-input v-model="searchForm.name" clearable></el-input>
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
                    prop="crtCode"
                    label="用户编号"
                >
                </el-table-column>
                <el-table-column
                    prop="crtName"
                    label="用户名称"
                >
                </el-table-column>
                <el-table-column
                    prop="crtTime"
                    label="操作时间"
                >
                    <template slot-scope="scope">
                        {{dateFormat(scope.row.crtTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="message"
                    label="处理事项"
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
    import utils from '@/util/utils';

    import {
        page
    } from '@/api/log.js';

export default {
    name: 'index',
    components: {
        pagination
    },
    data() {
        return {
            searchForm: {
                name: "",
                code: "",
            },
            datas: {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                list: []
            }
        }
    },
    created(){
        this.init();
    },
    methods:{
        dateFormat(time) {
            return utils.dateFormat(time, 'yyyy-MM-dd hh:mm:ss');
        },
        init(){
            this.searchForm.name = '';
            this.searchForm.code = '';
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
                name: this.searchForm.name,
                code: this.searchForm.code
            };
            page(param).then(res => {
                this.datas = res.content;
            })
        },
    }
};
</script>
