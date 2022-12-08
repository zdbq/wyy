<template>
    <div>
        <div class="top">
            <div class="top-left">
                <img width="25px" src="../../public/logo.jpg" alt="" />
                <span>网易云音乐</span>
            </div>
            <div class="top-right">
                <span>下载App</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Top",
};
</script>

<style scoped>
.top {
    height: 84px;
    background-color: #d43c33;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.top-left {
    width: 142px;
    height: 25px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
}

.top-left span {
    margin-left: 5px;
}

.top-right {
    width: 100px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    width: 100px;
    text-align: center;
    color: #d43c33;
    background-color: #fff;
    border-radius: 37.5%/100%;
    font-size: 16px;
}
</style>>