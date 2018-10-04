<template>
    <div class="framework-table">
        <div class="framework-table-search">
            <input placeholder="请输入关键字进行过滤" v-model="filterText"/>
        </div>
        <el-table :data="datas" @row-click="rowclick" highlight-current-row class="framework-table-style">
            <template v-for="item in columns">
                <el-table-column :prop="item.type" :label="item.label">
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script>
    export default {
        props: {
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
        },
        data() {
            return {
                filterText: "",
            }
        },
        methods: {
            rowclick(row) {
                this.$emit('getValue', row);
            },
        },
        computed: {
            // 计算属性的 getter
            datas: function () {
                return this.data.filter(item => {
                    for(const i in this.columns){
                        if(item[this.columns[i]['type']].indexOf(this.filterText)>=0){
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
    }

</script>
