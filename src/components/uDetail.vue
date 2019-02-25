<template>
  <div class="detail">
    <div class="user">
      <div>
        <img :src="img" alt="">
      </div>
      <div>
        <p>{{uname}}</p>
      </div>
    </div>
    <div>
      <ul>
        <li v-if="gedan">
          <a href="">
            <img src="https://p1.music.126.net/EWC8bPR8WW9KvhaftdmsXQ==/3397490930543093.jpg?param=140y140" alt="">
            <p>我创建的歌单{{`(${gedan})`}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'uDetail',
    data () {
      return {
        uid: this.$route.params.id,
        url: 'http://ruidong.cloudno.de',
        // url: 'http://127.0.0.1:3000',
        gedan: 0
      }
    },
    computed: {
      ...mapState({
        img: state => state.userImg,
        uname: state => state.userName
      })
    },
    beforeMount () {
      let that = this
      this.$.get(`${this.url}/user/subcount`, {withCredentials: true}).then(function (res) {
        console.log(res)
        let data = res.data
        that.gedan = data.createdPlaylistCount
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  p {
    font-size: 0.3rem;
  }
  ul li img{
    width: 49%;
  }
  .detail{
    padding: 0.5rem;
  }
  .user>div{
    display: inline-block;
    width: 50%;
    vertical-align: top;
  }
  .user>div:first-child{
    padding: 0.1rem;
    border: 1px solid #999;
  }
  .user>div:last-child{
    padding-left: 0.2rem;
  }
  .user{
    margin-bottom: 1rem;
  }
  .user img{
    width: 100%;
  }
</style>
