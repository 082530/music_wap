<template>
    <div class="section">
      <load v-show="banner===''&&gd_list===''&&new_m===''"></load>
      <ul class="ba">
        <li :class="key===state?'active':''" v-for="(item,key) in banner" @click="a(item,$event)">
          <router-link :to="{name:item.targetType==10?'album':item.targetType==1004?'play1':item.targetType==1000?'gd':'*',params:{id:item.encodeId}}">
            <img :src="item.imageUrl" alt="">
          </router-link>
        </li>
      </ul>
      <p class="instructions">
        <span :class="key===state?'active':''" v-for="(item,key) in banner.length"></span>
      </p>
      <!--推荐歌单-->
      <div CLASS="gd">
        <p><router-link to="/gdAll">推荐歌单>></router-link></p>
        <ul>
          <li v-for="item in gd_list">
            <router-link :to="{name:'gd',params: {id: item.id}}">
              <span class="playcount"><i></i>{{`${item.playCount}`}}</span>
              <img :src="`${item.picUrl}?param=170y170`" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!--推荐新音乐-->
      <div CLASS="gd">
        <p><a>推荐新音乐</a></p>
        <ul>
          <li v-for="item in new_m" @click="b(item)">
            <a href="javascript:">
              <img :src="`${item.song.album.picUrl}?param=170y170`" alt="">
              <p>
                {{item.name}}
              <span v-if="item.song.album.alias[0]">{{`---${item.song.album.alias[0]}`}}</span>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import loading from './loading'
export default {
  name: 'index_section',
  components: {
    load: loading
  },
  data () {
    return {
      url: 'http://ruidong.cloudno.de',
      // url: 'http://127.0.0.1:3000',
      banner: '',
      state: 0,
      gd_list: '',
      new_m: '',
      dt: ''
    }
  },
  beforeMount () {
    let that = this
    this.$.get(`${this.url}/banner`).then(function (res) {
      // console.log(res.data)
      that.banner = res.data.banners
      setInterval(function () {
        that.state++
        if (that.state >= that.banner.length) that.state = 0
      }, 5000)
    })
    this.$.get(`${this.url}/personalized?limit=6`).then(function (res) {
      console.log(res.data)
      that.gd_list = res.data.result
    })
    this.$.get(`${this.url}/personalized/newsong`).then(function (res) {
      // console.log(res.data)
      that.new_m = res.data.result
    })
  },
  methods: {
    ...mapMutations(['addSong']),
    a (item, e) {
      if (item.targetType === 1) {
        console.log(e)
        e.preventDefault()
        this.addSong({type: 1, info: {id: item.encodeId, name: item.name, img: item.imageUrl, autor: item.typeTitle}})
      }
    },
    b (item) {
      console.log(item)
      this.addSong({type: 1, info: {id: item.id, name: item.name, img: item.song.artists[0].picUrl, autor: item.song.artists[0].name}})
    }
}
}
</script>

<style scoped lang="scss">
.section .ba li img{
  width: 7.5rem;
}
.section{
  position: relative;
}
.section .ba{min-height: 3rem}
  .section .ba li{
    position: absolute;
    left: 0;
    transition: all 1s linear;
    opacity: 0;
  }
.section .ba li.active{
  opacity: 1;
  z-index: 99;
}
  .instructions{
    position: absolute;
    top: 2.3rem;
    text-align: center;
    width: 100%;
  }
  .instructions span{
    width: 0.1rem;
    height: 0.1rem;
    display: inline-block;
    border-radius: 50%;
    background: #ffffff;
    margin: 0 0.1rem;
    position: relative;
    z-index: 999;
  }
.instructions span.active{
  background: #6bff30;
}
.gd{
  background: rgba(0,0,0,0.5);
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
  >p>a{
    font-size: 0.3rem;
    font-weight: bold;
    color: #ffffff;
    margin-left: 0.15rem;
  }
  .playcount{
    font-size: 0.13rem;
    color: #999;
    position: absolute;
    margin-left: 0.2rem;
    i{
      display: inline-block;
      width: 20px;
      height: 10px;
      background: url("https://s2.music.126.net/style/web2/img/iconall.png?d5fe60673191e048c7777451bff8d422") no-repeat 0 -24px;
    }
  }
}
  .gd li{
    display: inline-block;
    width: 50%;
    vertical-align: top;
    padding: 0 0.1rem;
    margin: 0.15rem 0;
    img{
      border-radius: 0.1rem;
      overflow: hidden;
    }
    p{
      font-size: 0.25rem;
      color: #ffffff;
      margin-top: 0.15rem;
      span{
        font-size: 0.14rem;
        color: #ffffff;
      }
    }
  }
.gd li img{
  width: 100%;
}
</style>
