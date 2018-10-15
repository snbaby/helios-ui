<template>
    <div class="skeleton-wrapper">
        <img src="/static/default/img/logo.png">
        <div class="toplight"></div>
    </div>
</template>

<script>

export default {
    name: 'skeleton'
};
</script>

<style lang="stylus" scoped>

@keyframes toplight-frame
    0%
        transform skew(-20deg) translateX(-70px)

    100%
        transform skew(-20deg) translateX(70px)

.skeleton-wrapper
    img
        width 96px
        height 96px
        position absolute
        top 50%
        left 50%
        margin -48px 0 0 -48px

    .toplight
        width 20px
        height 100px
        position absolute
        left 50%
        top 50%
        margin -50px 0 0 -10px
        background-color rgba(255,255,255,.5)
        animation 1s toplight-frame infinite

</style>
