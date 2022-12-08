<template>
    <div>
        <div class="sousuo">
            <el-input v-model="input" ref="inp" @keyup.enter.native="hcsj" placeholder="搜索歌曲、歌手、专辑"></el-input>
        </div>
        <router-view v-show="(tzym == true)"></router-view>
        <div class="gjym" v-show="tzym == false">
            <div class="rmss">
                <div class="rmss-t">热门搜索</div>
                <div class="rmss-b">
                    <div class="item" @click="djss(item.first)" v-for="(item, index) in rb" :key="index">{{ item.first
                    }}
                    </div>
                </div>
            </div>

            <div class="lsjl" v-for="(bq, i) in lsjl" :key="i + 'a'">
                <div class="lsjl-l">
                    <svg t="1670110320174" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2808" width="18" height="18">
                        <path
                            d="M511.914 63.99c-247.012 0-447.925 200.912-447.925 447.924s200.913 447.925 447.925 447.925 447.925-200.913 447.925-447.925S758.926 63.989 511.914 63.989z m0 831.687c-211.577 0-383.763-172.186-383.763-383.763 0-211.577 172.014-383.763 383.763-383.763s383.763 172.014 383.763 383.763-172.186 383.763-383.763 383.763z"
                            fill="#bfbfbf" p-id="2809"></path>
                        <path
                            d="M672.06 511.914H512.085v-223.79c0-17.718-14.277-32.167-31.995-32.167-17.717 0-31.994 14.45-31.994 32.167V544.08c0 17.717 14.277 31.994 31.994 31.994H672.06c17.718 0 32.167-14.277 32.167-31.994-0.172-17.89-14.621-32.167-32.167-32.167z"
                            fill="#bfbfbf" p-id="2810"></path>
                    </svg>
                </div>
                <div class="lsjl-zj" @click="djss(bq)">
                    {{ bq }}
                </div>
                <div class="lsjl-r">
                    <svg @click="sclsjl(i)" t="1670110365353" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4336" width="18" height="18">
                        <path
                            d="M558.096874 509.244236l278.304494-276.863678c13.159718-13.094226 13.226233-34.31248 0.132006-47.472198-13.123902-13.189394-34.305317-13.226233-47.465035-0.132006L510.692215 461.669708 234.740302 184.877661c-13.062504-13.093203-34.310434-13.159718-47.470151-0.066515-13.129019 13.093203-13.160741 34.342156-0.066515 47.501874l275.885398 276.725532L184.918593 785.733385c-13.160741 13.094226-13.226233 34.310434-0.134053 47.472198 6.54609 6.581905 15.172561 9.900487 23.799032 9.900487 8.56098 0 17.125029-3.252067 23.672142-9.768481l278.236955-276.761348 278.473339 279.31245c6.54609 6.582929 15.142885 9.871835 23.768333 9.871835 8.594749 0 17.155728-3.288906 23.701818-9.80532 13.123902-13.093203 13.159718-34.305317 0.066515-47.465035L558.096874 509.244236 558.096874 509.244236zM558.096874 509.244236"
                            p-id="4337" fill="#bfbfbf"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    name: 'Jsgl',
    data() {
        return {
            input: '',
            rb: {},
            lsjl: [],
            tzym: false
        }
    },
    methods: {
        hcsj() {
            if (this.input == '') return this.$refs.inp.blur()
            this.tzym = true
            this.lsjl.push(this.input)
            let newArr = [...new Set(this.lsjl)]
            this.lsjl = [...newArr]
            let jg = JSON.stringify(this.lsjl)
            localStorage.setItem('sslsjl', jg)

            axios({
                method: 'post',
                url: `http://localhost:3000/search?keywords=${this.input}`,
            }).then((response) => {
                let { result } = response.data
                this.$router.replace({
                    path: '/top/navigation/jsgl/ssym', name: 'Ssym', params: {
                        result
                    }
                }, () => { })
            });


        },
        djss(text) {
            if (text == '') return
            // 去重
            this.lsjl.push(text)
            let newArr = [...new Set(this.lsjl)]
            this.lsjl = [...newArr]
            let jg = JSON.stringify(this.lsjl)
            localStorage.setItem('sslsjl', jg)
            this.input = text
            this.hcsj()
        },
        sclsjl(i) {

            this.lsjl = this.lsjl.filter((e, key) => {
                if (key != i) {
                    return e
                }
            })
            let jg = JSON.stringify(this.lsjl)
            localStorage.setItem('sslsjl', jg)
        }
    },
    mounted() {
        if (localStorage.getItem('sslsjl')) {
            this.lsjl = JSON.parse(localStorage.getItem('sslsjl'))
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/search/hot',
        }).then((response) => {
            this.rb = response.data.result.hots
        });
    },
}
</script>

<style scoped>
.sousuo {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(202, 200, 200);
}

.rmss {
    box-sizing: border-box;
    padding: 15px 10px 0;
}

.rmss-t {
    font-size: 12px;
    color: #666;
}

.rmss-b {
    margin: 10px 0 7px;
    display: flex;
    flex-wrap: wrap;
}

.item {
    font-size: 14px;
    color: #333;
    text-align: center;
    line-height: 32px;
    height: 32px;
    border: 1px solid rgb(232, 233, 236);
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    padding: 0 10px;
}

.lsjl {
    height: 45px;
    display: flex;
}

.lsjl-l {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lsjl-zj {
    flex: 8;
    border-bottom: 1px solid rgb(232, 233, 236);
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
}

.lsjl-r {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(232, 233, 236);
}
</style>