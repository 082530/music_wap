<template>
  <div class="hello">
    <div :style="isopen?'left:4rem':'left:0'">
      <header>
        <i @click="isopen=true" class="iconfont icon-caidan"></i>
        <router-link to="/indexSection">推荐</router-link>
        <router-link to="/newMv">最新MV</router-link>
        <router-link to="/phb">MV排行榜</router-link>
        <a>电台</a>
      </header>
      <div class="search_ico">
          <router-link to="/search">
            <p><i class="icon-sousuo iconfont"></i>搜索</p>
          </router-link>
      </div>
      <router-view></router-view>
    </div>
    <aside :style="isopen?op1:op2" @click.self="isopen=false">
      <ul :style="isopen?'left: 0':'left: -4rem'">
        <li class="user">
          <router-link :to="uid==null?'/login':{name:'uDetail',params:{id:uid}}">
            <img v-if="uid==null" src="../assets/user.png" alt="">
            <img v-else :src="uimg" alt="">
            <span>{{uid===null?'登录':uname}}</span>
          </router-link>
        </li>
        <li>
          <a href="">标题</a>
        </li>
        <li>
          <a href="">标题</a>
        </li>
        <li>
          <a href="">标题</a>
        </li>
        <li>
          <a href="">标题</a>
        </li>
        <li>
          <a @click="out()">退出登录</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      isopen: false,
      op1: {
        background: 'rgba(0,0,0,0.5)',
        zIndex: 999
      },
      op2: {
        background: 'rgba(0,0,0,0)',
        zIndex: -1
      },
      url: 'http://ruidong.cloudno.de',
      // url: 'http://127.0.0.1:3000',
    }
  },
  computed: {
    ...mapState({
      uid: state => state.userId,
      uimg: state => state.userImg,
      uname: state => state.userName
    })
  },
  methods: {
    ...mapMutations(['setUser']),
    out: function () {
      this.$.get(`${this.url}/logout`)
      this.setUser([null, null, null])
    }
  },
  beforeCreate () {
    this.$router.push('/indexSection')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/index.css";
</style>
