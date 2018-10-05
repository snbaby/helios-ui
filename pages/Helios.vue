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

    import pageHeader from '@/components/framework/pageHeader';
    import pageSystemMenu from '@/components/framework/pageSystemMenu';
    import pageSystemTabs from '@/components/framework/pageSystemTabs';

    export default {
        name: 'helios',
        components: {
            pageHeader,
            pageSystemMenu,
            pageSystemTabs
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
