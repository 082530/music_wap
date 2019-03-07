<template>
  <div class="play">
      <video preload="none" :poster="data.coverUrl" id="video" :src="vUrl" controls></video>
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
    <!--<load v-show="data===''&&src===''&&vUrl"></load>-->
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import loading from './loading'
export default {
  name: 'play',
  // components: {
  //   load: loading
  // },
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      // url: 'http://127.0.0.1:3000',
      id: this.$route.params.id,
      data: '',
      otherlist1: '',
      src: '',
      vUrl: ''
    }
  },
  methods: {
    ...mapMutations(['settype']),
    load () {
      this.$.get(this.url + '/video/url?id=' + this.id).then(data => {
        this.vUrl = data.data.urls[0].url
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
