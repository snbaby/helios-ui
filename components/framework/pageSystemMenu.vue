<template>
    <div class="sd-menu">
        <el-menu :default-active="activeIndex" :router="true" active-text-color="#004EA2" mode="horizontal"
                 @select="handleSelect" :style="'width: '+menuWidth+'px;'" style="">
            <template v-for="menu1 in menuTree">
                <el-menu-item :index="menu1.uri" v-if="!menu1.hasOwnProperty('children')">
                    <img :src="menu1.icon" class="menu-icon" v-if="menu1.icon.length > 0">
                    <span>{{menu1.menu}}</span>
                </el-menu-item>
                <el-submenu :index="menu1.uri" v-if="menu1.hasOwnProperty('children')">
                    <template slot="title">
                        <img :src="menu1.icon" class="menu-icon" v-if="menu1.icon.length > 0">
                        <span>{{menu1.menu}}</span>
                    </template>
                    <template v-for="menu2 in menu1.children">
                        <el-menu-item :index="menu2.uri" v-if="!menu2.hasOwnProperty('children')">
                            <span>{{menu2.menu}}</span>
                        </el-menu-item>
                        <el-submenu :index="menu2.uri" v-if="menu2.hasOwnProperty('children')">
                            <template slot="title">
                                <span>{{menu2.menu}}</span>
                            </template>
                            <template v-for="menu3 in menu2.children">
                                <el-menu-item :index="menu3.uri" v-if="!menu3.hasOwnProperty('children')">
                                    <span>{{menu3.menu}}</span>
                                </el-menu-item>
                                <el-submenu :index="menu3.uri" v-if="menu3.hasOwnProperty('children')">
                                    <template slot="title">{{menu3.menu}}</template>
                                    <template v-for="menu4 in menu3.children">
                                        <el-menu-item :index="menu4.uri">
                                            <span>{{menu4.menu}}</span>
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
                menuWidth: 0
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
        computed: {},
        methods: {
            handleSelect(key) {
                this.activeIndex = key;
            },
        },
        created() {
            this.menuTree = JSON.parse(sessionStorage.getItem('info')).menuTree.filter(item => {
                return item.id > 10000 && item.appCode == 'soc'
            });
            for (let i = 0; i < this.menuTree.length; i++) {
                if (this.menuTree[i].hasOwnProperty("children")) {
                    this.menuWidth += this.menuTree[i].menu.length * 14 + 60;
                } else {
                    this.menuWidth += this.menuTree[i].menu.length * 14 + 40;
                }
            }
            this.menuWidth += this.menuTree.length * 2;

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
