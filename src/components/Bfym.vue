<template>
    <div>
        <div class="box" v-if="item">
            <img v-if="item.al" :src="item.al.picUrl" alt="">
            <div class="zzc"></div>

            <div class="fmxz" :style="{ 'transform': xz }" @click="xzdh">
                <div class="fmxz2">
                    <img v-if="item.al" :src="item.al.picUrl" alt="">
                </div>
            </div>
            <div class="gm">
                <div class="gm-l">{{ item.name }}</div>
                <div class="gm-r" v-if="item.ar">
                    {{ item.ar[0].name }}{{ item.ar.length == '2' ? ` / ${item.ar[1].name}` : '' }}
                </div>
            </div>


            <!-- 歌词 -->
            <div class="gc" ref="gcgd">
                <div ref="gcgdref" class="jcitem" v-for="(gcjg, index) in jg.gc" :key="index">
                    {{ gcjg }}
                </div>
            </div>
            <div class="mp3">
                <audio autoplay controls ref="bfyp" @play="bfs" @pause="zts" @timeupdate="hdgb">
                    <source :src="jg.url" type="audio/mpeg">
                </audio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bfym',
    data() {
        return {
            ms: 0,
            xz: '',
            timer: '',
            flag: false,
            jg: {
                url: '',
                item: {},
                gc: [],
                gcsjsj: [],
                i: 0
            },
            timer2: '',
            scrollTop: 0,
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
            this.gcsj()
        },
        zts() {
            clearInterval(this.timer)
            clearInterval(this.timer2)
        },
        gcsj() {
            this.timer2 = setInterval(() => {
                if (this.$refs.bfyp) {
                    let num = this.$refs.bfyp.currentTime + ''
                    num = num.split('.')[0] - 0
                    this.jg.gcsjsj.forEach((e, k) => {
                        if (num == e) {
                            for (let i = 0; i < this.$refs.gcgdref.length; i++) {
                                this.$refs.gcgdref[i].style.color = 'black'
                                this.$refs.gcgdref[i].style.fontSize = '14px'
                            }
                            this.$refs.gcgdref[k].style.color = 'white'
                            this.$refs.gcgdref[k].style.fontSize = '16px'
                            this.$refs.gcgd.scrollTop = this.$refs.gcgdref[k].offsetTop - 50
                        }
                    })
                }

            }, 1000);
        },
        hdgb() {
            this.gcsj()
        }
    },
    computed: {
        item() {
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
            name: 'Bfym',
        }, () => { })
        this.jg.url = this.$route.params.url
        this.jg.item = this.$route.params.item

        if (this.$route.params.gc) {
            let item = this.$route.params.gc.split('\n')
            let gc = []
            let sj = []
            let newSj = []
            item.forEach((e) => {
                gc.push(e.split(']')[1])
                sj.push(e.split(']')[0].split('[')[1])
            })
            sj = sj.slice(0, sj.length - 1)
            this.jg.gc = gc.slice(0, gc.length - 1)
            sj.forEach((e) => {

                let item = e.split(':')
                newSj.push(((item[0] - 0) * 60) + (item[1].split('.')[0] - 0))
            })
            this.jg.gcsjsj = newSj
            console.log(this.jg.gcsjsj);

        }

    },
}
</script>

<style>
.box {
    width: 100%;
    height: 600px;
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

.gc {
    width: 100%;
    height: 130px;
    position: absolute;
    top: 364px;
    left: 0;
    overflow-y: scroll;
}

.mp3 {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 520px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mp3 audio {
    width: 350px;
    height: 30px;
}

.jcitem {
    width: 100%;
    padding: 3px 0;
    text-align: center;
    font-size: 14px;
}
</style>