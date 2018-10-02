<template>
    <div class="sd-menu">
        <el-menu :default-active="activeIndex" :router="true" active-text-color="#004EA2" mode="horizontal"
                 @select="handleSelect">
            <template v-for="menu1 in menuTree">
                <el-menu-item :index="menu1.path" v-if="menu1.children.length==0">
                    <span>{{menu1.name}}</span>
                </el-menu-item>
                <el-submenu :index="menu1.path" v-if="menu1.children.length>0">
                    <template slot="title">
                        <span>{{menu1.name}}</span>
                    </template>
                    <template v-for="menu2 in menu1.children">
                        <el-menu-item :index="menu2.path" v-if="menu2.children.length==0">
                            <span>{{menu2.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="menu2.path" v-if="menu2.children.length>0">
                            <template slot="title">
                                <span>{{menu2.name}}</span>
                            </template>
                            <template v-for="menu3 in menu2.children">
                                <el-menu-item :index="menu3.path" v-if="menu3.children.length==0">
                                    <span>{{menu3.name}}</span>
                                </el-menu-item>
                                <el-submenu :index="menu3.path" v-if="menu3.children.length>0">
                                    <template slot="title">{{menu3.name}}</template>
                                    <template v-for="menu4 in menu3.children">
                                        <el-menu-item :index="menu4.path">
                                            <span>{{menu4.name}}</span>
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                            </template>
                        </el-submenu>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '',
                menuTree: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        watch: {
            "$route": function (to, from) {
                this.activeIndex = this.$route.path;
            }
        },
        methods: {
            handleSelect(key) {
                this.activeIndex = key;
            },
        },
        created() {
            this.menuTree = JSON.parse(sessionStorage.getItem('menuTree'));
            this.activeIndex = this.$route.path;
        }
    };
</script>

<style lang="css" scoped>
    .sd-menu {
        overflow-x: auto;
    }
    /*滚动条样式*/
    .sd-menu::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .sd-menu::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .sd-menu::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }

    .sd-menu .menu-icon {
        position: relative;
        left: -16px;
        -webkit-filter: drop-shadow(16px 0 #909399);
        filter: drop-shadow(16px 0 #909399);
        width: 16px;
        height: 16px;
    }

    .sd-menu .is-active .menu-icon {
        -webkit-filter: drop-shadow(16px 0 #409eff);
        filter: drop-shadow(16px 0 #409eff);
    }
</style>
