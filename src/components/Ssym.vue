<template>
    <div v-if="ssjg.length > 0">
        <div class="item-box" v-for="(item, index) in ssjg" :key="index" @click="bfyy(item.id, item)">
            <div class="zxyy-item">
                <div class="item-dleft">
                    <div class="zxyy-item-top">
                        <div class="item-text">
                            <div class="item-l">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="zxyy-item-buttom">
                        <div class="zxyy-item-buttom-img"></div>
                        {{ item.ar[0].name }}{{ item.ar.length == '2' ? ` / ${item.ar[1].name}` : '' }}{{
    item.al.name ==
        '' ? '' : ` - ${item.al.name}`
                        }}
                    </div>
                </div>
                <div class="item-bf">
                    <svg t="1670005918384" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2670" width="22" height="22">
                        <path
                            d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                            p-id="2671" fill="#8a8a8a"></path>
                        <path
                            d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                            p-id="2672" fill="#8a8a8a"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Ssym',
    data() {
        return {
            ssjg: {}
        }
    },
    methods: {
        bfyy(id, item) {
            axios({
                method: 'post',
                url: `http://localhost:3000/song/url?id=${id}`,
            }).then((response) => {

                axios({
                    method: 'post',
                    url: `http://localhost:3000/lyric?id=${id}`,
                }).then((gcjg) => {
                    let gc = gcjg.data.lrc.lyric

                    let url = response.data.data[0].url
                    this.$router.push({
                        path: '/bfym', name: 'Bfym', params: {
                            url, item, gc
                        }
                    }, () => { })
                });
            });
        }
    },
    mounted() {
        this.ssjg = JSON.parse(localStorage.getItem('songsaa'))
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', () => {
            history.pushState(null, null, document.URL)
        })

    },
}
</script>

<style scoped>
.item-box {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.zxyy-item {
    flex: 8;
    height: 60px;
    padding: 6px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(202, 200, 200);
}

.zxyy-item-top {
    font-size: 15px;
    height: 25px;
    display: flex;
}

.zxyy-item-buttom {
    font-size: 12px;
    height: 18px;
    color: #888;
    display: flex;
    align-items: center;
}

.zxyy-item-buttom-img {
    width: 12px;
    height: 8px;
    background: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=');
    background-size: 165px;
    background-position: 0 0;
    margin-right: 5px;
}

.item-text {
    display: 8;
    display: flex;
}

.item-bf {
    display: 1;
}

.item-l {
    color: #333;
}

.item-r {
    color: #888;
    margin-left: 4px;
}
</style>