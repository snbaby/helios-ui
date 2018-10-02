<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="角色名称：">
                    <el-input v-model="searchForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色编码：">
                    <el-input v-model="searchForm.code" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search()" type="primary">查询</el-button>
                    <el-button @click="add()">新建</el-button>
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
                    prop="code"
                    label="用户编号"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名称"
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
    } from '@/api/role.js';

    export default {
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
        computed: {

        },
        created(){
            this.queryPage();
        },
        methods: {
            search() {

            },
            add() {

            },
            pageChange(page) {
                this.datas.pageNum = page;
                this.queryPage();
            },
            queryPage() {
                const parqam = {
                    pageNum: this.datas.pageNum,
                    pageSize: this.datas.pageSize,
                }
                page(parqam).then(res => {
                    this.datas = res.content;
                })
            }
        }

    };
</script>
