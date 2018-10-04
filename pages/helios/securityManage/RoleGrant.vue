<template>
    <div class="framework-content">
        <div class="framework-left">
            <tableTree :data="roleList.rows" :columns="columns" @getValue="getRolePerson"></tableTree>
        </div>
        <div class="framework-right">
            <el-row style="height:100%;" v-if="showData" id="roleAllocate">
                <el-transfer
                    filterable
                    :titles="['待选', '已选']"
                    @change="handleChange"
                    v-model="chooseID"
                    :data="data2">
                </el-transfer>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {
        page,
        add,
        del
    } from '@/api/user.js';

    export default {
        components: {
        },
        data() {
            return {

            }
        },
        created(){
        },
        methods: {
            searchRole(){

            }
        }

    };
</script>
