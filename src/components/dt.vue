<template>
  <div class="gd">
    <load v-show="list===''&&detail===''"></load>
    <h1>电台</h1>
      <div class="info">
        <img :src="`${detail.picUrl}?param=140y140`" alt="">
        <p>
          <span>{{detail.name}}</span>
          <span>{{detail.rcmdText}}</span><br>
          <span>{{detail.desc}}</span>
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
            <span @click="addSong({type:1,info:{id:item.mainSong.id,name:item.name,img:item.blurCoverUrl,autor:item.dj.nickname}})">
              <p>{{item.name}}</p>
            </span>
          </td>
          <td>
          </td>
          <td>
            <span></span>
          </td>
        </tr>
        </tbody>
      </table>
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
      // url: 'http://127.0.0.1:3000',
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
    let that = this
    this.$.get(`${this.url}/dj/detail?rid=${this.id}`).then(function (res) {
      that.detail = res.data.djRadio
    })
    this.$.get(`${this.url}/dj/program?rid=${this.id}&offset=0`).then(function (res) {
      that.list = res.data.programs
    })
  },
  methods: {
    more (id, al, ar, name) {
      this.open_state = 1
      this.song_id = id
      this.al = al
      this.ar = ar
      this.song_name = name
    },
    ...mapMutations(['addSong'])
  }
}
</script>

<style scoped>
@import "../assets/css/gd.css";
</style>
