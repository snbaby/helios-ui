<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="名称：">
                    <el-input v-model="searchForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="编码：">
                    <el-input v-model="searchForm.code" clearable></el-input>
                </el-form-item>
                <el-form-item label="IP：">
                    <el-input v-model="searchForm.ip" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search" type="primary">查询</el-button>
                    <el-button @click="openDialog">新建</el-button>
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
                    prop="name"
                    label="名称"
                >
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="编码"
                >
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                >
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="del(scope.row)"
                            type="text"
                            size="small">
                            删除
                        </el-button>
                        <el-button
                            @click.native.prevent="edit(scope.row)"
                            type="text"
                            size="small">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <pagination :option="datas" @pageChange="pageChange"></pagination>
            </div>
        </div>
        <el-dialog title="新建侦测器" :visible.sync="newDialog">
            <el-form :model="formInline" :rules="rules" ref="formInline">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formInline.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model="formInline.code" placeholder="编码"></el-input>
                </el-form-item>
                <el-form-item label="IP" prop="ip">
                    <el-input v-model="formInline.ip" placeholder="IP"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改侦测器" :visible.sync="editDialog">
            <el-form :model="editFormInline" :rules="rules" ref="editFormInline">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editFormInline.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="IP" prop="ip">
                    <el-input v-model="editFormInline.ip" placeholder="IP"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import pagination from '@/components/common/pagination.vue';
    import {
        page,
        add,
        del,
        edit
    } from '@/api/detect.js';

    export default {
        components: {
            pagination
        },
        data() {
            return {
                searchForm: {
                    name: "",
                    code: "",
                    ip: ""
                },
                datas: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    list: []
                },

                newDialog: false,
                editDialog: false,
                formInline: {
                    code: "",
                    name: "",
                    ip: ""
                },
                editFormInline: {
                    id:"",
                    name: "",
                    ip: "",
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                            trigger: "blur"
                        }
                    ],
                    code: [{
                        required: true,
                        message: "编码不能为空",
                        trigger: "blur"
                    }],
                    ip: [{
                        required: true,
                        message: "IP不能为空",
                        trigger: "blur"
                    }],
                },
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.searchForm.name = '';
                this.searchForm.code = '';
                this.searchForm.ip = '';
                this.datas.pageNum = 1;

                this.queryPage();
            },
            search() {
                this.datas.pageNum = 1;
                this.queryPage();
            },
            confirm() {
                this.$refs['formInline'].validate((valid) => {
                    if (!valid) {
                        return;
                    }
                });
                const param = {
                    name: this.formInline.name,
                    code: this.formInline.code,
                    ip: this.formInline.ip
                };
                add(param).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: '新建探测器成功'
                    });
                    this.init();
                    this.newDialog = false;
                })
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
                    code: this.searchForm.code,
                    ip: this.searchForm.ip
                };
                page(param).then(res => {
                    this.datas = res.content;
                })
            },
            openDialog() {
                this.formInline.code = '';
                this.formInline.name = '';
                this.formInline.ip = '';

                this.newDialog = true;

            },
            del(row) {
                const param = {
                    id: row.id,
                };
                del(param).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: '删除侦测器成功'
                    });
                    this.init();
                })
            },
            edit(row) {
                this.editFormInline.name = row.name;
                this.editFormInline.ip = row.ip;
                this.editFormInline.id = row.id;

                this.editDialog = true;
            },
            editConfirm() {
                this.$refs['editFormInline'].validate((valid) => {
                    if (!valid) {
                        return;
                    }
                });
                const param = {
                    name: this.editFormInline.name,
                    id: this.editFormInline.id,
                    ip: this.editFormInline.ip
                };
                edit(param).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: '修改侦测器成功'
                    });
                    this.init();
                    this.editDialog = false;
                })
            },
        }

    };
</script>
