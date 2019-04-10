<template>
  <div class="play">
    <div id="video" ref="video">
      <video controls :poster="data.cover" :src="data.brs&&data.brs['480']"></video>
    </div>
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
          <li v-for="item in otherlist" :key=item.title>
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
      otherlist: '',
      data: '123'
    }
  },
  methods: {
    ...mapMutations(['settype']),
    load () {
      this.$.get(this.url + '/mv/detail?mvid=' + this.id).then(data => {
        this.data = data.data.data
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
  #video video{
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
</style>
