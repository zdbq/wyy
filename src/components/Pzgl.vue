<template>
    <div>
        <div class="box">
            <div class="zzc"></div>
            <div class="s-tp">
            </div>
            <div class="s-tb">
                更新日期：{{ dqsj }}
            </div>
        </div>

        <div class="item-box" v-if="(index<total)" v-for="(item,index) in rgb" :key="index" @click="djtg(item)">
            <div class="item-zb">
                {{index<9?'0'+(index+1):index+1}}
            </div>
            <div class="zxyy-item">
                <div class="item-dleft">
                    <div class="zxyy-item-top">
                        <div class="item-text">
                            <div class="item-l">{{item.name}}</div>
                        </div>
                    </div>
                    <div class="zxyy-item-buttom">
                        <div class="zxyy-item-buttom-img"></div>
                        {{item.ar[0].name}} - {{item.al.name}}
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
        <div class="db" @click="totalnum">
            <div class="db-text">查看完整榜单</div>
        </div>

    </div>

</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios';
export default {
    name: 'Pzgl',
    data() {
        return {
            rgb: {},
            dqsj: '',
            total:20
        }
    },
    methods: {
        xzsj() {
            let date = new Date()
            let xzsj = dayjs(date)
            this.dqsj = `${xzsj.$M + 1}月${xzsj.$D}日`
        },
        totalnum(){
            this.total += 5
            console.log(this.total);
        },
        djtg(item){
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
    mounted() {
        this.xzsj()
        axios({
            method: 'post',
            url: 'http://localhost:3000/playlist/detail?id=3778678',
        }).then((response) => {
            this.rgb = response.data.playlist.tracks
        });;
    }
}
</script>

<style scoped>
.box {
    width: 100%;
    height: 145px;
    box-sizing: border-box;
    padding: 20px;
    background: url('https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=');
    position: relative;
}

.el-tabs__header {
    margin-bottom: 0;
}

.zzc {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgb(0, 0, 0, .2);
}

.s-tp {
    position: absolute;
    left: 20px;
    top: calc(50% - 50px);
    width: 142px;
    height: 67px;
    background: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=') no-repeat;
    background-size: 166px 97px;
    background-position: -24px -30px;
    z-index: 1;
}

.s-tb {
    position: absolute;
    left: 20px;
    top: 65%;
    height: 26px;
    font-size: 12px;
    color: hsla(0, 0%, 100%, .8);
    z-index: 2;
}
.item-box{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.item-zb{
    flex: 1;
    color: #999;
    font-size: 17px;
}
.item-zb:nth-child(1){
    color: #df3436;
}
.item-zb:nth-child(2){
    color: #df3436;
}
.item-zb:nth-child(3){
    color: #df3436;
}
.zxyy-item {
    flex: 8;
    height: 60px;
    padding: 6px 0;
    display: flex;
    padding-right: 10px;
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
.db{
    height: 55px;
}
.db-text{
    width: 98px;
    height: 55px;
    font-size: 14px;
    color: #999;
    margin: 0 auto;
    text-align: center;
    line-height: 55px;
}
</style>