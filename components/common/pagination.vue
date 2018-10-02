<template>
    <div style="text-align: center;">
        <el-pagination
            v-if="option.total > option.pageSize"
            @current-change="handleCurrentChange"
            :current-page=option.pageNum
            :page-size=option.pageSize
            layout="prev, pager ,next , slot, jumper"
            :total=option.total
            prev-text="上一页"
            next-text="下一页"
        >
            <span slot>共 {{Math.ceil(option.total/option.pageSize)}} 页，{{option.total}} 条</span>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: ["option"],
        methods: {
            //翻页
            handleCurrentChange(val) {
                if (val != this.option.pageNum) {
                    this.$emit('pageChange', val);
                }
            }
        }
    }
</script>
