<template>
    <div class="framework-content">
        <div class="framework-search-form">
            <el-form :inline="true">
                <el-form-item label="主机编号：">
                    <el-input v-model="searchForm.assetCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="侦测器编号：">
                    <el-input v-model="searchForm.detectCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="端口编号：">
                    <el-input v-model="searchForm.portCode" clearable></el-input>
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
                    prop="assetCode"
                    label="主机编号"
                >
                </el-table-column>
                <el-table-column
                    prop="assetName"
                    label="主机名称"
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
                    prop="detectCode"
                    label="侦测器编号"
                >
                </el-table-column>
                <el-table-column
                    prop="detectName"
                    label="侦测器名称"
                >
                </el-table-column>
                <el-table-column
                    prop="portName"
                    label="端口名称"
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
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <pagination :option="datas" @pageChange="pageChange"></pagination>
            </div>
        </div>
        <el-dialog title="新建设备关联" :visible.sync="newDialog">
            <el-form :model="formInline" :rules="rules" ref="formInline">
                <el-form-item label="侦测器" prop="detectId">
                    <el-select v-model="formInline.detectId" @change="detectIdChnage" filterable placeholder="请选择" clearable>
                        <el-option
                            v-for="item in detectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="端口" prop="portId">
                    <el-select :disabled="formInline.detectId==''" v-model="formInline.portId" filterable placeholder="请选择" clearable>
                        <el-option
                            v-for="item in portList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主机" prop="assetCode">
                    <el-select v-model="formInline.assetCode" filterable placeholder="请选择" clearable>
                        <el-option
                            v-for="item in assetList"
                            :key="item.assetCode"
                            :label="item.assetName"
                            :value="item.assetCode">
                        </el-option>
                    </el-select>
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
    import * as detect from '@/api/detect.js';
    import * as port from '@/api/port.js';
    import * as pc from '@/api/pc.js';
    import * as detectPc from '@/api/detectPc.js';

    export default {
        components: {
            pagination
        },
        data() {
            return {
                searchForm: {
                    assetCode: "",
                    detectCode: "",
                    portCode: ""
                },
                datas: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    list: []
                },

                newDialog: false,
                formInline: {
                    detectId: "",
                    portId: "",
                    assetCode: ""
                },
                rules: {
                    detectId: [{
                        required: true,
                        message: "侦测器不能为空",
                        trigger: "blur"
                    }],
                    portId: [{
                        required: true,
                        message: "端口不能为空",
                        trigger: "blur"
                    }],
                    assetCode: [{
                        required: true,
                        message: "主机不能为空",
                        trigger: "blur"
                    }],
                },

                detectList: [],
                portList: [],
                assetList: [],
            }
        },
        created() {
            this.init();
            this.getDetectList();
        },
        methods: {
            getDetectList() {
                detect.list().then(res => {
                    this.detectList = res.content;
                })
            },
            detectIdChnage(val){
                this.portList=[];
                this.assetList=[];
                this.formInline.portId='';
                if(val !==''){
                    const param = {
                       detectId:val
                    }
                    port.useableList(param).then(res=>{
                        this.portList = res.content;
                    })
                    pc.useableList().then(res => {
                        this.assetList = res.content;
                    })
                }
            },
            init() {
                this.searchForm.assetCode = '';
                this.searchForm.detectCode = '';
                this.searchForm.portCode = '';
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
                    const param = {
                        portId: this.formInline.portId,
                        assetCode: this.formInline.assetCode
                    };
                    detectPc.add(param).then(res => {
                        this.$notify.success({
                            title: '成功',
                            message: '新建设备关联成功'
                        });
                        this.init();
                        this.newDialog = false;
                    })
                })
            },
            pageChange(page){
                this.datas.pageNum = page;
                this.queryPage();
            },
            queryPage() {
                const param = {
                    pageNum: this.datas.pageNum,
                    pageSize: this.datas.pageSize,
                    assetCode: this.searchForm.assetCode,
                    detectCode: this.searchForm.detectCode,
                    portCode: this.searchForm.portCode
                };
                detectPc.page(param).then(res => {
                    this.datas = res.content;
                })
            },
            openDialog() {
                this.formInline.detectId = '';
                this.formInline.portId = '';
                this.formInline.assetCode = '';

                this.newDialog = true;

            },
            del(row) {
                const self = this;
                self.$confirm(`此操作将永久删除关联"${row.detectName}-${row.portName}/${row.assetCode}", 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const param = {
                        id: row.id,
                    };
                    detectPc.del(param).then(res => {
                        this.$notify.success({
                            title: '成功',
                            message: '删除探测器成功'
                        });
                        this.init();
                    })
                });
            }
        }

    };
</script>
