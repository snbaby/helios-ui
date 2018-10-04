<template>
    <div class="framework-content">
        <div class="framework-left">
            <tableTree :data="roleList" :columns="columns" @getValue="getAuthorityMenu"></tableTree>
        </div>
        <div class="framework-right">
            <el-row class="sd-bts-line" v-if="roleId != ''">
                <el-col :span="24" v-for="item,index in authMenusList" :key="index" class="sd-bbs-line">
                    <el-checkbox v-model="item.auth" @change="setRoleAuthorization($event,item.id)">
                        {{item.name}}
                    </el-checkbox>
                    <template v-if="item.children.length>0">
                        <el-row class="sd-pl">
                            <el-col :span="24" v-for="item1,index in item.children" :key="index">
                                <el-checkbox v-model="item1.auth" @change="setRoleAuthorization($event,item1.id)">
                                    {{item1.name}}
                                </el-checkbox>
                                <el-row class="sd-pl">
                                    <el-col :span="6" v-for="item2,index in item1.children" :key="index">
                                        <el-checkbox v-model="item2.auth"
                                                     @change="setRoleAuthorization($event,item2.id)">
                                            {{item2.name}}
                                        </el-checkbox>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-else>
                        <el-row class="sd-pl">
                            <el-col :span="6" v-for="item1,index in item.childs" :key="index">
                                <el-checkbox v-model="item1.auth">
                                    {{item1.name}}
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </template>
                </el-col>
            </el-row>
            <div v-else class="sd-ta-center">
                <div>暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script>
    import tableTree from '@/components/common/tableTree.vue';
    import {
        listRole
    } from '@/api/role.js';
    import {
        authTree
    } from '@/api/menu.js';

    import {
        add,
        del
    } from '@/api/menuResource.js';

    export default {
        components: {
            tableTree,
        },
        data() {
            return {
                roleList: [],
                roleId: "", //角色code
                columns: [{
                    label: '角色编码',
                    type: 'code',
                }, {
                    label: '角色名称',
                    type: 'name',
                }],

                authMenusList: [],
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                listRole().then(res => {
                    this.roleList = res.content;
                });
            },
            getAuthorityMenu(val) {
                this.roleId = val.id;
                const param = {
                    roleId: this.roleId
                }
                authTree(param).then(res => {
                    this.authMenusList = res.content;
                })
            },
            //修改当前角色授权
            setRoleAuthorization(e, id) {
                const param = {
                    menuId: id,
                    roleId: this.roleId,
                }
                if (e) {
                    add(param).then(res=>{
                        this.$notify.success({
                            title: '成功',
                            message: '新增授权成功'
                        });
                    })
                } else {
                    del(param).then(res=>{
                        this.$notify.success({
                            title: '成功',
                            message: '删除授权成功'
                        });
                    })
                }
            },

        }

    };
</script>
