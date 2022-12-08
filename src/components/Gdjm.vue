<template>
    <div>
        <div class="top">
            <div class="zzc" :style="img"></div>
            <div class="zj-l">
                <img width="126" height="126" :src="fmdz" alt="">
            </div>
            <div class="zj-r">
                <div class="zj-text">{{ bt }}</div>
                <div class="tx">
                    <div class="tx-l">
                        <img :src="avatarUrl" alt="">
                    </div>
                    <div class="tx-r">{{ nickname }}</div>
                </div>
            </div>
        </div>

        <div class="gqlb">
            歌曲列表
        </div>
        <div class="item" v-for="(item, index) in songs" :key="index" @click="djtzym(item)">
            <div class="item-zb">
                {{ (index + 1) }}
            </div>
            <div class="zxyy-item">
                <div class="item-dleft">
                    <div class="zxyy-item-top">
                        <div class="item-text">
                            <div class="item-l">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="zxyy-item-buttom">
                        {{ item.ar[0].name }} - {{ item.al.name }}
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

        <div class="gqlb">
            精彩评论
        </div>
        <!-- 两个循环都用索引index作为key，key值重复报错，加个字符串 -->
        <div class="plq-item" v-for="(item, index) in hotComments" :key="index + 'a'">
            <div class="plq-l">
                <img width="30" height="30" :src="item.user.avatarUrl" alt="">
            </div>
            <div class="plq-r">
                <div class="plqr-t">
                    <div class="plqr-tl">
                        <div class="plqr-tlt">{{ item.user.nickname }}</div>
                        <div class="plqr-tlb">{{ item.time }}</div>
                    </div>
                    <div class="plqr-tr">
                        <div class="plqr-trdz">
                            {{ item.likedCount }}
                            <svg t="1670085671115" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2677" width="16" height="16">
                                <path
                                    d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                    p-id="2678" fill="#bfbfbf"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="plqr-b">{{ item.content }}</div>
            </div>
        </div>

        <div class="gqlb">
            最新评论({{ total }})
        </div>

        <div class="plq-item" v-for="(item, index) in comments" :key="index + 'b'">
            <div class="plq-l">
                <img width="30" height="30" :src="item.user.avatarUrl" alt="">
            </div>
            <div class="plq-r">
                <div class="plqr-t">
                    <div class="plqr-tl">
                        <div class="plqr-tlt">{{ item.user.nickname }}</div>
                        <div class="plqr-tlb">{{ item.time }}</div>
                    </div>
                    <div class="plqr-tr">
                        <div class="plqr-trdz">
                            {{ item.likedCount }}
                            <svg t="1670085671115" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2677" width="16" height="16">
                                <path
                                    d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                    p-id="2678" fill="#bfbfbf"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="plqr-b">{{ item.content }}</div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs'
export default {
    name: 'Gdjm',
    data() {
        return {
            img: {
                backgroundImage: '',
                backgroundPosition: '0 0',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                filter: 'blur(10px)'
            },
            fmdz: '',
            bt: '',
            // 头像和id
            avatarUrl: '',
            nickname: '',
            songs: {},
            comments: {},
            hotComments: {},
            total: ''
        }
    },
    methods: {
        // 把评论时间的时间戳转换为年月日
        plsjhs() {
            return this.comments.filter(element => {
                let date = dayjs(element.time)
                return element.time = `${date.$y}年${date.$M + 1}月${date.$D}日` || {}
            });
        },
        plsjhs2() {
            return this.hotComments.filter(element => {
                let date = dayjs(element.time)
                return element.time = `${date.$y}年${date.$M + 1}月${date.$D}日` || {}
            });
        },
        djtzym(item) {
            axios({
                method: 'post',
                url: `http://localhost:3000/song/url?id=${item.id}`,
            }).then((response) => {
                let url = response.data.data[0].url
                this.$router.push({
                    path: '/bfym', name: 'Bfym', params: {
                        url, item
                    }
                }, () => { })
            });;
        }
    },
    activated() {
        if (this.$route.params.item.picUrl) {
            this.$nextTick(() => {
                this.img.backgroundImage = `url(${this.$route.params.item.picUrl})`
                this.fmdz = this.$route.params.item.picUrl
                this.bt = this.$route.params.item.name
                this.avatarUrl = this.$route.params.avatarUrl
                this.nickname = this.$route.params.nickname
                this.songs = this.$route.params.songs
                // 专辑热门评论和最新评论
                this.comments = this.$route.params.comments
                this.hotComments = this.$route.params.hotComments
                this.total = this.$route.params.total
                this.plsjhs()
                this.plsjhs2()
            })
        }
    },
}
</script>

<style scoped>
.top {
    width: 100%;
    height: 186px;
    box-sizing: border-box;
    padding: 30px 10px 30px 15px;
    display: flex;
    position: relative;
}

.zzc {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}

.zj-l {
    width: 126px;
    height: 126px;
}

.zj-r {
    flex: 2;
    margin-left: 20px;
    filter: none;
}

.zj-text {
    color: #fefefe;
    font-size: 17px;
}

.tx {
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: 5px;
}

.tx-l img {
    width: 30px;
    height: 30px;
    border-radius: 20px;
}

.tx-r {
    margin-left: 5px;
    font-size: 15px;
    color: #333;
}

.gqlb {
    padding: 0 10px;
    height: 23px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
    line-height: 23px;
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.zxyy-item {
    height: 60px;
    padding: 6px 0;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(202, 200, 200);
    flex: 9;
}

.item-zb {
    text-align: center;
    flex: 1;
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
}

.zxyy-item-buttom-img {
    width: 12px;
    height: 8px;
    background: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=');
    background-size: 165px;
    background-position: 0 0;
}

.item-text {
    display: 8;
    display: flex;
}

.item-zb,
.item-bf {
    display: 1;
}

.item-bf {
    margin-right: 10px;
}

.item-l {
    color: #333;
}

.plq-item {
    box-sizing: border-box;
    padding: 10px;
    display: flex;
}

.plq-l {
    flex: 1;
}

.plq-l img {
    border-radius: 20px;
}

.plq-r {
    flex: 7;
    border-bottom: 1px solid rgb(202, 200, 200);
    display: flex;
    flex-direction: column;
}

.plqr-t {
    flex: 1;
    display: flex;
}

.plqr-b {
    flex: 1;
    color: #333;
    font-size: 15px;
    padding: 5px 0;
}

.plqr-tl {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.plqr-tr {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.plqr-tlt {
    flex: 1;
    color: #666;
    font-size: 14px;
}

.plqr-tlb {
    flex: 1;
    color: #999;
    font-size: 12px;
}

.plqr-trdz {
    width: 45px;
    height: 22px;
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>