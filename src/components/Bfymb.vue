<template>
    <div>
            <div class="box">
                <img :src="item.picUrl" alt="">
                <div class="zzc"></div>

                <div class="fmxz" :style="{ 'transform': xz }" @click="xzdh">
                    <div class="fmxz2">
                        <img :src="item.picUrl" alt="">
                    </div>
                </div>
                <div class="gm">
                    <div class="gm-l">{{ item.name }}</div>
                    <div class="gm-r">
                        {{ item.song.artists[0].name }}{{ item.song.artists.length == '2' ? ` / ${item.song.artists[1].name}` : '' }}
                    </div>
                </div>
                <div class="mp3">
                    <audio controls ref="bfyp" @play="bfs" @pause="zts">
                        <source :src="jg.url" type="audio/mpeg">
                    </audio>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Bfymb',
    data() {
        return {
            ms: 0,
            xz: '',
            timer: '',
            flag: false,
            jg: {
                url: '',
                item: {}
            }
        }
    },
    methods: {
        xzdh() {
            clearInterval(this.timer)
            this.flag = !this.flag
        },
        bfs() {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.ms += 0.1
                this.xz = `rotate(${this.ms}deg)`
            }, 1);
        },
        zts() {
            clearInterval(this.timer)
        }
    },
    computed:{
        item(){
            return this.jg.item
        }
    },
    watch: {
        flag() {
            if (this.flag) {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.ms += 0.1
                    this.xz = `rotate(${this.ms}deg)`
                }, 1);
                this.$refs.bfyp.play()
            } else {
                clearInterval(this.timer)
                this.$refs.bfyp.pause()
            }
        }
    },
    activated() {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', () => {
            history.pushState(null, null, document.URL)
        })
        this.$router.push({
            name: 'Bfymb',
        }, () => { })
        this.jg.url = this.$route.params.url
        this.jg.item = this.$route.params.item
        console.log(this.jg);
    },
}
</script>

<style>
.box {
    width: 100%;
    height: 512px;
    position: relative;
}

.box>img {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(10px);
}

.zzc {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, .6);
    position: absolute;
}

.fmxz {
    width: 257px;
    height: 257px;
    background-color: rgb(255, 255, 255, .1);
    position: absolute;
    left: calc(50% - 123.5px);
    top: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fmxz2 {
    width: 93%;
    height: 93%;
    background-color: rgb(0, 0, 0);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fmxz img {
    width: 70%;
    height: 70%;
    border-radius: 50%;
}

.gm {
    padding: 0 10px;
    width: 100%;
    height: 20px;
    position: absolute;
    top: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.gm-l {
    font-size: 18px;
    color: #fefefe;
    margin-right: 10px;
}

.gm-r {
    font-size: 16px;
    color: hsla(0, 0%, 100%, .6);
}

.mp3 {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 370px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mp3 audio {
    width: 350px;
    height: 30px;
}
</style>