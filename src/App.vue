<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    <keep-alive include="search">
      <router-view/>
    </keep-alive>
    </transition>
    <!--播放器mini-->
    <div @click.self="play_big_open=true" :style="type!=0&&big_box==false?'bottom:0':'bottom:-1.5rem'" class="play_mini">
      <img @click.self="play_big_open=true" :src="`${nowSong.img}?param=50y50`" alt="">
      <span @click.self="play_big_open=true">{{nowSong.name}}</span>
      <span @click.self="play_big_open=true" class="autor">--{{nowSong.autor}}</span>
      <div class="controls">
        <canvas @click.self="pl()" id="button" width="40" height="40"></canvas>
        <div>
          <!--播放-->
          <svg :class="play_state===1?'act':''" class="icon" style="font-size:0.3rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3357"><path d="M151.345001 79.501682c0-5.514597 2.932916-10.876722 8.097754-13.743002 5.186328-2.867304 11.271156-2.494821 15.953997 0.437975l689.903444 432.480922c4.420864 2.7793 7.35378 7.703449 7.35378 13.305027 0 5.624091-2.931892 10.54824-7.35378 13.32754L175.397776 957.812555c-4.683864 2.931772-10.767669 3.281743-15.953997 0.437975-5.164838-2.888793-8.097754-8.229428-8.097754-13.788028L151.346025 79.501682 151.345001 79.501682z" p-id="3358"></path></svg>
          <!--暂停-->
          <svg :class="play_state===0?'act':''" class="icon" style="font-size:0.3rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3646"><path d="M735.9 64.9c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V160.7c0-51.1-44.8-95.8-96-95.8z m-447.8 0c-51.2 0-96 44.7-96 95.8v702.6c0 51.1 44.8 95.8 96 95.8s96-44.7 96-95.8V160.7c-0.1-51.1-44.9-95.8-96-95.8z" p-id="3647"></path></svg>
        </div>
        <span @click="list_open=true">
          <svg  class="icon" style="color:#333333;font-size:0.6rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2947"><path d="M927.9 543.6H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h575.9c17.7 0 32 14.3 32 32s-14.3 32-32 32z m0-255.9H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h575.9c17.7 0 32 14.3 32 32 0 17.6-14.3 32-32 32zM128 831.6c-35.3 0-64-28.6-64-64 0-35.3 28.7-64 64-64s64 28.6 64 64c0 35.3-28.7 64-64 64z m0-256c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.6 64 64c0 35.3-28.7 64-64 64z m0-256c-35.3 0-64-28.6-64-64 0-35.3 28.7-64 64-64s64 28.6 64 64-28.7 64-64 64z m224 416h575.9c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-17.7 0-32-14.3-32-32s14.3-32 32-32z m0 0" p-id="2948"></path></svg>
        </span>
      </div>
    </div>
    <!--播放器big-->
    <div class="play_big" v-show="play_big_open">
      <!--背景-->
      <div class="bg" :style="{backgroundImage: `url(${nowSong.img}?param=400y800)`}"></div>
      <div class="p">
        <!--标题栏-->
        <p>
          <span @click="play_big_open=false">←</span>
          <span>{{nowSong.name}}</span>
        </p>
        <!--歌词显示-->
        <div class="content">
          <div :style="{top:top}">
            <p :class="key==t?'active':''" v-for="(item,key) in lrc" :time="key">{{item}}</p>
          </div>
        </div>
        <!--底部控制-->
        <div class="play_footer">
          <div class="progress">
            <span>{{nTime}}</span>
            <div class="bar" ref="left">
              <p :style="{width:jd}">
                <span @touchmove="tmove($event)"></span>
              </p>
            </div>
            <span>{{tTime}}</span>
          </div>
          <div class="button">
            <a :href="`https://music.163.com/song/media/outer/url?id=${nowSong.id}.mp3 `">
              <i class="iconfont icon-xiazai"></i>
            </a>
            <i @click.self="pre()" class="iconfont icon-shangyiqu"></i>
            <i @click.self="pl()" :style="{display:play_state?'inline-block':'none'}" class="iconfont icon-bof"></i>
            <i @click.self="pl()" :style="{display:!play_state?'inline-block':'none'}" class="iconfont icon-step"></i>
            <i @click.self="next()" class="iconfont icon-xiayiqu"></i>
            <i @click="list_open=true" class="iconfont icon-bofangliebiao"></i>
          </div>
        </div>
      </div>
    </div>
    <!--播放列表-->
    <div @click.self="list_open=false" :class="list_open?'active p_list':'p_list'">
      <div>
        <div>
          <span>播放列表({{playList.length}})</span>
          <div>
            <span>收藏全部</span>
            <span @click.stop="dele(0)">
              <svg class="icon" style="color:#666;font-size:0.45rem;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4593"><path d="M731.918 180.534H293.285c-40.383 0-73.106 32.72-73.106 73.103v24.368h584.844v-24.368c0.001-40.383-32.72-73.103-73.105-73.103m-127.696-48.735l10.756 76.91H410.225l10.756-76.91h183.24m5.855-48.735H415.128c-20.108 0-38.813 16.277-41.621 36.218L359.252 221.25c-2.784 19.917 11.4 36.194 31.508 36.194h243.685c20.108 0 34.293-16.276 31.484-36.217l-14.255-101.969c-2.786-19.917-21.49-36.194-41.598-36.194m134.026 243.675H281.1c-26.795 0-46.761 21.845-44.334 48.544l39.933 438.996c2.403 26.7 26.344 48.544 53.14 48.544h365.527c26.795 0 50.736-21.845 53.14-48.544l39.932-438.996c2.426-26.699-17.54-48.544-44.336-48.544M415.128 765.353h-73.106L317.653 424.21h97.474v341.144z m146.211 0h-97.474V424.21h97.474v341.144z m121.842 0h-73.106V424.21h97.474l-24.368 341.144z" fill="" p-id="4594"></path></svg>
            </span>
          </div>
        </div>
        <ul>
          <li :class="index===key?'active':''" v-for="(item,key) in playList" @click="nowSong=playList[key];list_open=false">
            <span>{{item.name}}--</span>
            <span class="autor">{{item.autor}}</span>
            <b @click.stop="dele(item.id)">×</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      // url: 'http://127.0.0.1:3000',
      url: 'http://ruidong.cloudno.de',
      nowSong: '',
      play_state: 1, // 当前播放状态，1当前暂停，0当前播放
      audio: '',
      big_box: false,
      n: '',
      list_open: false,
      play_big_open: false,
      tTime: '', // 总时长
      nTime: '', // 当前时长
      jd: 0, // 进度
      index: 0, // 当前歌曲位置
      lrc: [],
      nowtime: 0,
      t: 0,
      top: 0
    }
  },
  computed: {
    ...mapState({
      playList: state => state.songs,
      type: state => state.type
    })
  },
  methods: {
    ...mapMutations(['dele']),
    tmove (e) { // 触摸移动进度条
      const a = e.changedTouches[0].pageX
      const b = this.$refs['left'].getBoundingClientRect()
      const left = b.x // 进度条到左边的距离
      const width = b.width // 进度条的长度
      let widthMove = ((a - left) / width) * 100
      widthMove < 0 ? widthMove = 0 : widthMove > 100 ? widthMove = 100 : ''
      // console.log(widthMove)
      this.jd = widthMove + '%'
      let setTime = this.audio.duration * widthMove / 100
      this.audio.currentTime = setTime
      // console.log(setTime)
    },
    tend () {
      const p = document.querySelectorAll('.content>div>p')
      for (let i = 0, n = p.length; i < n; i++) {
        if (p[i].className === 'active') return i++
      }
    },
    pre () {
      let n
      for (let i = 0, s = this.playList.length; i < s; i++) {
        if (this.playList[i].id === this.nowSong.id) {
          n = i - 1
          if (i === 0) n = this.playList.length - 1
          break
        }
      }
      this.nowSong = this.playList[n]
    },
    next () {
      let n
      for (let i = 0, s = this.playList.length; i < s; i++) {
        if (this.playList[i].id === this.nowSong.id) {
          n = i + 1
          if (i === this.playList.length - 1) n = 0
          break
        }
      }
      this.nowSong = this.playList[n]
    },
    lyr (lrc) { // 歌词处理
      let lyrics = lrc.split('\n')
      let lrcObj = {}
      for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i])
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        let timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        let clause = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          let t = timeRegExpArr[k]
          let min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1))
          let time = min * 60 + sec
          lrcObj[time] = clause
        }
      }
      return lrcObj
    },
    play () {
      let c = document.getElementById('button').getContext('2d')
      c.clearRect(0, 0, 50, 50)
      this.addp()
      if (document.getElementsByTagName('audio')[0]) document.getElementById('app').removeChild(document.getElementsByTagName('audio')[0])
      let audio = new Audio(`https://music.163.com/song/media/outer/url?id=${this.nowSong.id}.mp3`)
      audio.autoplay = true
      document.getElementById('app').appendChild(audio)
      this.controls(audio)
      this.audio = audio
      // 监听歌曲获取出错
      audio.addEventListener('error', function () {
        alert('播放失败！！！')
      }, true)
      // 获取歌词
      this.$.get(`${this.url}/lyric?id=${this.nowSong.id}`).then((res) => {
        this.lrc = this.lyr(res.data.lrc.lyric)
      })
    },
    addp () {
      let c = document.getElementById('button').getContext('2d')
      c.strokeStyle = '#CCCCCC'
      c.beginPath()
      c.arc(20, 20, 15, 0, 2 * Math.PI)
      c.stroke()
    },
    current (c, now, old) { // 进度控制
      // console.log(old * 2 - 0.5, now * 2 - 0.5)
      c.beginPath()
      c.arc(20, 20, 15, (old * 2 - 0.5) * Math.PI, (now * 2 - 0.5) * Math.PI)
      c.stroke()
    },
    time1 (nowTime) {
      let min = parseInt(nowTime / 60)
      let s = parseInt(nowTime % 60)
      min < 10 ? min = '0' + min : ''
      s < 10 ? s = '0' + s : ''
      return `${min}:${s}`
    },
    controls (audio) {
      let c = document.getElementById('button').getContext('2d')
      c.strokeStyle = '#D33B32'
      let old = 0
      clearInterval(this.n)
      this.n = setInterval(() => {
        if (audio.ended) this.next()
        if (!audio.paused) {
          this.play_state = 0
          let totalTime = audio.duration // 音频长度
          let nowTime = this.nowtime = audio.currentTime // 当前音频播放位置
          this.tTime = this.time1(totalTime)
          this.nTime = this.time1(nowTime)
          let c1 = parseFloat(nowTime / totalTime)
          this.jd = nowTime / totalTime * 100 + '%'
          this.current(c, c1, old)
          old = c1
        } else this.play_state = 1
      }, 1000)
    },
    pl () {
      if (this.play_state === 1) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    }
  },
  watch: {
    playList () {
      if (this.playList.length === 0) return false
      if (this.type === 1) {
        this.nowSong = this.playList[this.playList.length - 1]
        this.index = this.playList.length - 1
      } else if (this.type === 2) {
        this.nowSong = this.playList[0]
        this.index = 0
      }
      if (this.type !== 0) this.play()
    },
    nowSong () {
      if (this.type !== 0) {
        this.play()
        for (let i = 0; i < this.playList.length; i++) {
          if (this.playList[i].id === this.nowSong.id) {
            this.index = i
            break
          }
        }
      }
    },
    nowtime (val) {
      let i
      let n = 0
      for (i in this.lrc) {
        if (i > parseInt(val)) {
          this.t = n
          break
        }
        n = i
      }
      setTimeout(() => {
        let t = this.tend()
        this.top = 0
        if (t > 10) { // 计算歌词移动距离
          this.top = (10 - t) * 0.5 + 'rem'
        }
      }, 100)
    },
    type (val) {
      // console.log(val)
      if (val == 0) if (document.getElementsByTagName('audio')[0]) document.getElementById('app').removeChild(document.getElementsByTagName('audio')[0])
    }
  },
  beforeCreate () {
    if (parseInt(document.body.clientWidth) > 768) {
      alert('请使用手机访问！！！')
      location.href = '/'
    }
    getRem(720, 100)
    window.onresize = function () {
      getRem(750, 100)
    }
    function getRem (pwidth, prem) {
      const html = document.getElementsByTagName('html')[0]
      let oWidth = document.body.clientWidth || document.documentElement.clientWidth
      html.style.fontSize = oWidth / pwidth * prem + 'px'
    }
  }
}
</script>
<style scoped>
  @import "assets/css/play.css";
</style>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
*{
  font-size: 0;
  font-family: 微软雅黑;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
  html,body,#app{width: 100%;height: 100%;overflow-x: hidden}
  #app{
    background: url("./assets/bg.jpg") no-repeat center top;
  }
.play_mini > span:last-of-type{
  width: 2rem;
}
</style>
