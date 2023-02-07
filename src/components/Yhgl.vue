<template>

    <div>
        <div class="bj"><span>编辑推荐</span></div>

        <div class="zwc">
            <div class="zj" v-for="(item, index) in yhglsj" :key="index" @click="gdjm(item)">
                <img :src="item.picUrl" alt="">
                <span>{{ item.name }}</span>
            </div>
        </div>

        <div class="bj"><span>最新音乐</span></div>

        <div class="zxyy-item" v-for="(item, index) in yhglsj2" :key="index" @click="tzyyjm(item)">
            <div class="item-dleft">
                <div class="zxyy-item-top">
                    <div class="item-text">
                        <div class="item-l">{{ item.song.name }}</div>
                        <div class="item-r">{{ item.song.alias == '' ? '' : `(${item.song.alias[0]})` }}</div>
                    </div>
                </div>
                <div class="zxyy-item-buttom">
                    <div v-if="(item.song.sqMusic != null)" class="zxyy-item-buttom-img"></div>
                    {{ item.song.artists[0].name }} - {{ item.song.name }}
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


</template>

<script>
import axios from 'axios';
export default {
    name: 'Yhgl',
    data() {
        return {
            yhglsj: {},
            yhglsj2: {}
        }
    },
    methods: {
        gdjm(item) {
            localStorage.setItem('gdjmpicUrl',JSON.stringify(item))
            
            axios({
                method: 'post',
                url: `http://localhost:3000/playlist/track/all?id=${item.id}&limit=10&offset=1`,
            }).then((response) => {
                let { songs } = response.data
                localStorage.setItem('songsaa',JSON.stringify(songs))
                axios({
                    method: 'post',
                    url: `http://localhost:3000/playlist/detail?id=${item.id}`,
                }).then((response) => {
                    let { avatarUrl } = response.data.playlist.creator
                    let { nickname } = response.data.playlist.creator
                    // 获取专辑评论
                    axios({
                        method: 'post',
                        url: `http://localhost:3000/comment/playlist?id=${item.id}`,
                    }).then((response) => {
                        let { comments } = response.data
                        let { hotComments } = response.data
                        localStorage.setItem('hotComments',JSON.stringify(hotComments))
                        localStorage.setItem('comments',JSON.stringify(comments))
                        let { total } = response.data
                        this.$router.push({
                            name: 'Gdjm',
                            params: {
                                item,
                                songs,
                                avatarUrl,
                                nickname,
                                comments,
                                hotComments,
                                total
                            },
                        })
                    });;
                });;
            });;
        },
        tzyyjm(item) {
            axios({
                method: 'post',
                url: `http://localhost:3000/song/url?id=${item.id}`,
            }).then((response) => {
                axios({
                    method: 'post',
                    url: `http://localhost:3000/lyric?id=${item.id}`,
                }).then((gcjg) => {
                    let gc = gcjg.data.lrc.lyric

                    let url = response.data.data[0].url
                    this.$router.push({
                        path: '/bfymb', name: 'Bfymb', params: {
                            url, item, gc
                        }
                    }, () => { })
                });



            });;

        }
    },
    mounted() {
        // 发起一个post请求
        axios({
            method: 'post',
            url: 'http://localhost:3000/personalized?limit=6',
        }).then((response) => {
            this.yhglsj = response.data.result
        });;

        axios({
            method: 'post',
            url: 'http://localhost:3000/personalized/newsong',
        }).then((response) => {
            this.yhglsj2 = response.data.result
        });;


    }
}
</script>

<style scoped>
.bj {
    font-size: 15px;
    border-left: 2px solid red;
    margin-top: 15px;
    margin-bottom: 15px;
}

.bj span {
    padding-left: 9px;
}

.zwc {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
    justify-content: space-between;
}

.zj {
    width: 116px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
}

.zj img {
    width: 116px;
}

.zj span {
    font-size: 13px;
    padding: 6px 2px 0 6px;
}

.zxyy-item {
    height: 60px;
    padding: 6px 0;
    margin: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgb(202, 200, 200);
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    display: flex;
}

.item-l {
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-r {
    color: #888;
    margin-left: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>