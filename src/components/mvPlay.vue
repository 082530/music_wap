<template>
  <div class="play">
    <div id="video" ref="video"></div>
    <div class="description">
      <p>{{data.name}}<span>--{{data.artistName}}</span></p>
      <p>
        <span>发布时间：{{data.publishTime}}</span>
        <span>播放：{{String(data.playCount).slice(0,-4)}}万</span><br>
        <span>{{data.desc}}</span>
      </p>
    </div>
    <!--相关推荐-->
    <div class="other">
        <ul>
          <li v-for="item in otherlist">
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
      otherlist: ''
    }
  },
  methods: {
    ...mapMutations(['settype']),
    load () {
      new Promise(resolve => {
        this.$.get(this.url + '/mv/detail?mvid=' + this.id).then(function (data) {
          resolve(data.data)
        })
      }).then(data => {
        let src = []
        for (let key in data.data.brs) {
          let arr = []
          arr.push(data.data.brs[key])
          arr.push('video/mp4')
          arr.push(key)
          arr.push(0)
          src.push(arr)
        }
        this.data = data.data
        return src
      }).then(src => {
        var videoObject = {
          container: '#video', // “#”代表容器的ID，“.”或“”代表容器的class
          variable: 'player', // 该属性必需设置，值等于下面的new chplayer()的对象
          // flashplayer:true,// 如果强制使用flashplayer则设置成true

          video: src// 视频地址
        }
        // console.log(videoObject)
        let player = new ckplayer(videoObject)
      })
      this.$.get(`${this.url}/related/allvideo?id=${this.id}`).then(res => {
        this.otherlist = res.data.data
      })
    }
  },
  mounted: function () {
    this.load()
    this.settype()
  },
  watch: {
    $route () {
      this.$refs['video'].innerHTML = ''
      this.id = this.$route.params.id
      this.load()
    }
  }
}
</script>

<style scoped>
@import "../assets/css/mvplay.css";
</style>
