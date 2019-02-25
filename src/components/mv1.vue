<template>
  <div class="play">
      <video id="video" :src="src" controls></video>
    <div class="description">
      <p>{{data.title}}--{{data.creator.nickname}}</p>
      <p>
        <span>发布时间：{{new Date(data.publishTime).toLocaleDateString()}}</span>
        <!--<span>播放：{{String(data.playCount).slice(0,-4)}}万</span>--><br>
        <span>{{data.description}}</span>
      </p>
    </div>
    <!--相关推荐-->
    <div class="other">
      <ul>
        <li v-for="item in otherlist1">
          <router-link :to="{name:parseInt(item.vid)==item.vid?'play':'play1',params:{id:item.vid}}">
            <div>
              <img :src="`${item.coverUrl}?param=140y90`" alt="">
            </div>
            <div>
              <p>{{item.title}}</p>
              <p>{{item.creator[0].userName}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'play',
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      // url: 'http://127.0.0.1:3000',
      id: this.$route.params.id,
      data: '',
      otherlist1: '',
      src: ''
    }
  },
  methods: {
    ...mapMutations(['settype']),
    load () {
      new Promise(resolve => {
        this.$.get(this.url + '/video/url?id=' + this.id).then(function (data) {
          resolve(data.data)
        })
      }).then(data => {
        this.data = data.data
        return data.urls[0].url
      }).then(src => {
        // var videoObject = {
        //   container: '#video', // “#”代表容器的ID，“.”或“”代表容器的class
        //   variable: 'player', // 该属性必需设置，值等于下面的new chplayer()的对象
        //   // flashplayer:true,// 如果强制使用flashplayer则设置成true
        //
        //   video: src// 视频地址
        // }
        // // console.log(videoObject)
        // let player = new ckplayer(videoObject)
        this.src = src
      })
      this.$.get(`${this.url}/related/allvideo?id=${this.id}`).then(res => {
        this.otherlist1 = res.data.data
      })
      this.$.get(`${this.url}/video/detail?id=${this.id}`).then(res => {
        this.data = res.data.data
      })
    }
  },
  mounted: function () {
    this.load()
    this.settype()
  },
  watch: {
    $route () {
      // this.$refs['video'].innerHTML = ''
      this.id = this.$route.params.id
      this.load()
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/mvplay.css";
</style>
