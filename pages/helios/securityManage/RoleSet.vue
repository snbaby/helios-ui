<template>
    <div class="framework-content">
        <div class="framework-left">
            <tableTree :data="roleList" :columns="columns" @getValue="getRolePerson"></tableTree>
        </div>
        <div class="framework-right">
            <el-row style="height:100%;" v-if="roleId != '' " id="roleAllocate">
                <el-transfer
                    filterable
                    :titles="['待选', '已选']"
                    @change="handleChange"
                    v-model="chooseUsers"
                    :data="userList">
                </el-transfer>
            </el-row>
        </div>
    </div>
</template>

<script>

    import tableTree from '@/components/common/tableTree.vue';
    import {
        listRole
    } from '@/api/role.js';
    import {
        listUser
    } from '@/api/user.js';
    import {
        add,
        del,
        listRoleResource
    } from '@/api/roleResource.js';

    export default {
        components: {
            tableTree,
        },
        data() {
            return {
                roleList: [],
                userList: [],
                chooseUsers: [],

                roleId: "", //角色code
                columns: [{
                    label: '角色编码',
                    type: 'code',
                }, {
                    label: '角色名称',
                    type: 'name',
                }],
            }
        },
        created(){
            this.init();
        },
        methods: {
            getRolePerson(val) {
                this.roleId = val.id;
                const param = {
                    roleId: this.roleId,
                    userId: ''
                }
                listRoleResource(param).then(res=>{
                    this.chooseUsers = [];
                    for (let i in res.content) {
                        this.chooseUsers.push(res.content[i].userId);
                    }
                })

            },
            handleChange(value, direction, movedKeys) {
                if (direction == "right") {
                    const param = {
                        roleId : this.roleId,
                        users : movedKeys,
                    }
                    add(param).then(res=>{
                        this.$notify.success({
                            title: '成功',
                            message: '添加人员成功'
                        });
                    })
                } else if (direction == "left") {
                    const param = {
                        roleId : this.roleId,
                        users : movedKeys,
                    }
                    del(param).then(res=>{
                        this.$notify.success({
                            title: '成功',
                            message: '删除人员成功'
                        });
                    })
                }
            },
            init(){
                listRole().then(res=>{
                    this.roleList = res.content;
                });
                listUser().then(res=>{
                    this.userList = [];
                    for (let i in res.content) {
                        this.userList.push({
                            key: res.content[i].id,
                            label: res.content[i].name + '-' + res.content[i].code
                        })
                    }
                });
            }

        }

    };
</script>
