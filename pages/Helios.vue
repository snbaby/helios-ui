<template>
    <div>
        <div>
            <page-header></page-header>
        </div>
        <div>
            <page-system-menu></page-system-menu>
        </div>
        <div class="framework-skeleton-content">
            <div class="framework-skeleton-inner-tabs">
                <page-system-tabs></page-system-tabs>
            </div>
            <div class="framework-skeleton-inner-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
function setState(store) {}

export default {
    name: 'index',
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    async asyncData({store, route}) {
        setState(store);
    }
};
</script>

<style lang="stylus" scoped>

.page-index
    display flex
    justify-content center
    align-items center
    flex-direction column

    h2
        font-size 46px
        font-weight 500
        margin-bottom 0

</style>
