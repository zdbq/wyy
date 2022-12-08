<template>
    <div class="cdl">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane class="cdl" label="推荐音乐" name="first" ref="yonhu">
                <router-view></router-view>
            </el-tab-pane>
            <el-tab-pane class="cdl" label="热歌榜" name="second">
                <router-view></router-view>
            </el-tab-pane>
            <el-tab-pane class="cdl" label="搜索" name="third">
                <router-view></router-view>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

export default {
    name: "Navigation",
    data() {
        return {
            activeName: 'first',
        };
    },
    methods: {
        djw() {
            alert(666)
            
        },
        handleClick(tab) {
            if (tab.label == '推荐音乐') {
                this.$refs.yonhu.$router.push({path:'/top/navigation/yhgl'},() => {})
            }
            if (tab.label == '热歌榜') {
                this.$refs.yonhu.$router.push({path:'/top/navigation/pzgl'},() => {})
            }
            if (tab.label == '搜索') {
                this.$refs.yonhu.$router.push({path:'/top/navigation/jsgl'},() => {})
            }
        },
    },
}
</script>

<style scoped>

</style>