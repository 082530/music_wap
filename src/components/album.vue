<template>
  <div class="gd">
    <load v-show="list===''"></load>
    <h1>专辑</h1>
      <div class="info">
        <img :src="`${detail.picUrl}?param=140y140`" alt="">
        <p>
          <span>{{detail.name}}</span>
          <router-link :to="{name:'songer',params: {id:detail.artist&&detail.artist.id}}">
          <span>歌手：<img :src="`${detail.artist&&detail.artist.picUrl}?param=20y20`" alt="">{{detail.artist&&detail.artist.name}}</span>
          </router-link>
        </p>
      </div>
    <!--列表-->
    <div class="box">
      <p>
        <span @click="addSong({type:2,info:list})"><i></i>全部播放</span><a>(共{{list.length}}首)</a>
      </p>
      <table>
        <tbody>
        <tr v-for="(item,key) in list">
          <td>{{key+1}}</td>
          <td>
            <span @click="addSong({type:1,info:{id:item.id,name:item.name,img:item.al.picUrl,autor:item.ar[0].name}})">
              <p>{{item.name}}</p>
              <span v-if="item.alia[0]">{{`-(${item.alia[0]})`}}</span>
            </span>
          </td>
          <td>
            <router-link :to="{name:'play',params:{id:item.mv}}">
              <i v-if="item.mv"></i>
            </router-link>
          </td>
          <td @click.stop="more(item.id,item.al,item.ar[0],item.name)">
            <span>
              <svg class="icon" style="font-size:0.2rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2862"><path d="M512 512m-80.001676 0a80.001676 80.001676 0 1 0 160.003352 0 80.001676 80.001676 0 1 0-160.003352 0ZM512 240.002205m-80.001676 0a80.001676 80.001676 0 1 0 160.003352 0 80.001676 80.001676 0 1 0-160.003352 0ZM512 784.000617m-80.001676 0a80.001676 80.001676 0 1 0 160.003352 0 80.001676 80.001676 0 1 0-160.003352 0Z" p-id="2863"></path></svg>
            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--弹出窗-->
    <div @click.self="open_state=0" :class="open_state===0?'more':'more open'">
      <div>
        <p>歌曲：{{song_name}}</p>
        <ul>
          <li>
            <a :href="`https://music.163.com/song/media/outer/url?id=${song_id}.mp3`">
              <svg class="icon" style="font-size:0.3rem;width: 1.0712890625em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1097 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3178"><path d="M510.171429 635.721143V37.302857C510.171429 16.713143 527.177143 0 548.022857 0c20.845714 0 37.778286 16.713143 37.778286 37.302857v598.418286l344.32-233.252572a39.131429 39.131429 0 0 1 53.174857 14.08 38.4 38.4 0 0 1-14.262857 52.736l-400.457143 271.36a38.985143 38.985143 0 0 1-20.553143 5.12c-6.948571 0.219429-14.08-1.426286-20.589714-5.12l-400.457143-271.36a38.4 38.4 0 0 1-14.226286-52.736 39.131429 39.131429 0 0 1 53.174857-14.08l344.32 233.252572z m515.145142 80.384c0-19.456 16.018286-35.254857 35.766858-35.254857s35.766857 15.798857 35.766857 35.254857v123.501714c0 101.302857-83.163429 183.478857-185.819429 183.478857H185.782857C83.163429 1023.085714 0 940.982857 0 839.606857V716.068571c0-19.456 16.018286-35.254857 35.766857-35.254857s35.766857 15.798857 35.766857 35.254857v123.501715c0 62.390857 51.2 112.932571 114.285715 112.932571h725.211428c63.122286 0 114.285714-50.541714 114.285714-112.932571V716.068571z" fill="#000000" p-id="3179"></path></svg>
              <span>下载</span>
            </a>
          </li>
          <li>
            <a href="">
              <svg class="icon" style="font-size:0.3rem;width: 1.142578125em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6986"><path d="M469.577143 73.142857l83.382857 243.565714a73.142857 73.142857 0 0 0 69.485714 49.737143H1097.142857v512a73.142857 73.142857 0 0 1-73.142857 73.142857H146.285714a73.142857 73.142857 0 0 1-73.142857-73.142857V111.908571A39.497143 39.497143 0 0 1 111.908571 73.142857h357.668572m0-73.142857H111.908571A112.64 112.64 0 0 0 0 111.908571V877.714286a146.285714 146.285714 0 0 0 146.285714 146.285714h877.714286a146.285714 146.285714 0 0 0 146.285714-146.285714V347.428571a54.857143 54.857143 0 0 0-54.857143-54.857142H622.445714L539.062857 49.737143A73.142857 73.142857 0 0 0 469.577143 0zM919.405714 73.142857H512v73.142857h405.211429a33.645714 33.645714 0 0 1 33.645714 33.645715V365.714286h73.142857V177.737143A104.594286 104.594286 0 0 0 919.405714 73.142857zM365.714286 585.142857h365.714285v73.142857H365.714286zM512 438.857143h73.142857v365.714286H512z" p-id="6987"></path></svg>
              <span>加入收藏</span>
            </a>
          </li>
          <li>
            <router-link :to="{name:'songer',params: {id:ar.id}}">
              <svg class="icon" style="font-size:0.3rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7228"><path d="M679.444 148.275a204.8 204.8 0 1 0 34.08 81.224 20.48 20.48 0 0 0-40.305 7.373 163.84 163.84 0 1 1-27.239-64.922 20.48 20.48 0 0 0 33.464-23.634zM880.64 880.64a368.64 368.64 0 0 0-617.759-271.729 20.48 20.48 0 1 0 27.69 30.188A326.042 326.042 0 0 1 512 552.96a327.68 327.68 0 0 1 327.68 327.68 20.48 20.48 0 1 0 40.96 0zM229.376 643.891A367.165 367.165 0 0 0 143.36 880.64a20.48 20.48 0 1 0 40.96 0c0-78.07 27.361-151.839 76.472-210.412a20.48 20.48 0 0 0-31.375-26.337zM491.52 675.84v81.92c0 11.264 9.216 20.48 20.48 20.48 11.469 0 20.48-9.052 20.48-20.48v-81.92c0-11.264-9.216-20.48-20.48-20.48-11.469 0-20.48 9.052-20.48 20.48z m-40.96 0c0-33.915 27.28-61.44 61.44-61.44 33.915 0 61.44 27.607 61.44 61.44v81.92c0 33.915-27.28 61.44-61.44 61.44-33.915 0-61.44-27.607-61.44-61.44v-81.92zM491.52 798.72v81.92a20.48 20.48 0 1 0 40.96 0v-81.92a20.48 20.48 0 1 0-40.96 0z" p-id="7229"></path></svg>
              <span>歌手：{{ar.name}}</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'album',params: {id:al.id}}">
              <svg class="icon" style="font-size:0.3rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7860"><path d="M150.588 542.118a30.118 30.118 0 1 1 60.236 0 271.059 271.059 0 0 0 271.058 271.058 30.118 30.118 0 1 1 0 60.236c-182.964 0-331.294-148.33-331.294-331.294z m722.824-60.236a30.118 30.118 0 1 1-60.236 0 271.059 271.059 0 0 0-271.058-271.058 30.118 30.118 0 1 1 0-60.236c182.964 0 331.294 148.33 331.294 331.294zM512 1024C229.225 1024 0 794.775 0 512S229.225 0 512 0s512 229.225 512 512-229.225 512-512 512z m0-60.235c249.495 0 451.765-202.27 451.765-451.765 0-249.495-202.27-451.765-451.765-451.765-249.495 0-451.765 202.27-451.765 451.765 0 249.495 202.27 451.765 451.765 451.765z m0-331.294a120.47 120.47 0 1 1 0-240.942 120.47 120.47 0 0 1 0 240.942z m0-60.236a60.235 60.235 0 1 0 0-120.47 60.235 60.235 0 0 0 0 120.47z" p-id="7861"></path></svg>
              <span>专辑：{{al.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import loading from './loading'
export default {
  name: 'gd',
  components: {
    load: loading
  },
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      id: this.$route.params.id,
      detail: '',
      open_state: 0,
      song_id: '',
      al: '',
      ar: '',
      song_name: '',
      list: ''
    }
  },
  beforeMount () {
    this.get1()
  },
  methods: {
    more (id, al, ar, name) {
      this.open_state = 1
      this.song_id = id
      this.al = al
      this.ar = ar
      this.song_name = name
    },
    ...mapMutations(['addSong']),
    get1 () {
      let that = this
      this.$.get(`${this.url}/album?id=${this.id}`).then(function (res) {
        that.detail = res.data.album
        that.list = res.data.songs
      })
    }
  },
  watch: {
    $route () {
      this.get1()
    }
  }
}
</script>

<style scoped>
@import "../assets/css/gd.css";
</style>
