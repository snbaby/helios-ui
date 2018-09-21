<template>
    <el-tabs v-model="activeName" type="card" closable @tab-remove="removeTab" @tab-click="clickTab" v-if="tabs.length>0">
        <el-tab-pane
            :key="item.key"
            v-for="item in tabs"
            :label="item.title"
            :name="item.name"
        >
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    var _ = require('lodash');
    export default {
        data() {
            return {
                menus: [],
                tabs: [],
                activeName: '',
            }
        },
        watch:{
            "$route": function(to,from){
                let tag = false;
                this.tabs.forEach((item,index)=>{
                    if(item.name === this.$route.path){
                        this.activeName = item.name;
                        tag = true;
                    }
                })
                if(tag){
                    return;
                }
                this.menus.forEach((item,index)=>{
                    if(item.uri === this.$route.path){
                        const tab = {
                            key: item.id,
                            title: item.menu,
                            name: item.uri
                        };
                        this.tabs.push(tab);
                        this.activeName = item.uri;
                    }
                })
            }
        },
        methods: {
            removeTab(targetName) {
                if (this.activeName === targetName) {
                    this.tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = this.tabs[index + 1] || this.tabs[index - 1];
                            if (nextTab) {
                                this.activeName = nextTab.name;
                                this.$router.push({
                                    path: nextTab.name
                                });
                            }
                        }
                    });
                }
                this.tabs = this.tabs.filter(tab => tab.name !== targetName);
            },
            clickTab(targetTab) {
                this.activeName = targetTab.name;
                this.$router.push({
                    path: targetTab.name
                });
            }
        },
        created() {
            this.menus = this.getMenus();
            this.menus.forEach((item,index)=>{
                if(item.uri === this.$route.path){
                    const tab = {
                        key: item.id,
                        title: item.menu,
                        name: item.uri
                    };
                    this.tabs.push(tab);
                    this.activeName = item.uri;
                }
            })
        }
    };
</script>
