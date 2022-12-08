<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import Top from './components/Top.vue'


export default {
    name: 'App',
    mounted() {
        this.$router.push({ path: '/top/navigation/yhgl' }, () => { })
    },
    components: {
        Top,
    }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
}

.jg {
    width: 300px;
    height: 300px;
    background-color: green;
}
</style>
