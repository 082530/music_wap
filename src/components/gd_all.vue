<template>
    <div class="gd">
        <p>
          <a @click="open=true">{{tag}}>></a>
          <span>
            <span :style="{color:order==='new'?'#b7443e':''}" @click="order='new';page=0;list=[];g_list()">最新</span>|
            <span :style="{color:order==='hot'?'#b7443e':''}" @click="order='hot';page=0;list=[];g_list()">最热</span>
          </span>
        </p>
      <div class="item">
        <ul>
          <li v-for="item in list">
            <router-link :to="{name:'gd',params: {id: item.id}}">
              <img :src="`${item.coverImgUrl}?param=200y200`" alt="">
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
        <button @click="g_list()" v-show="more" class="more">加载更多</button>
      </div>
      <!--歌单分类-->
      <div class="cat" v-show="open">
        <h1>
          <span @click="open=false">←</span>
          选择分类
        </h1>
        <div>
          <ul>
            <li class="all">全部歌单</li>
            <li v-for="(item,key) in catlist">
              <b>{{item}}</b>
              <p>
                <span @click="tag=itemlist.name;list=[];g_list();open=false" v-for="itemlist in sub[key]">{{itemlist.name}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {

  name: 'gd_all',
  data () {
    return {
      tag: '全部',
      url: 'http://ruidong.cloudno.de',
      // url: 'http://127.0.0.1:3000',
      page: 0,
      list: [],
      more: true,
      order: 'new',
      catlist: '',
      sub: '',
      open: false
    }
  },
  methods: {
    g_list () {
      this.$.get(`${this.url}/top/playlist?offset=${10 * this.page++}&cat=${this.tag}&limit=10&order=${this.order}`).then((res) => {
        this.list = this.list.concat(res.data.playlists)
        this.more = res.data.more
      })
    }
  },
  beforeMount () {
    this.g_list()
    // 分类
    this.$.get(`${this.url}/playlist/catlist`).then(res => {
      this.catlist = res.data.categories
      let sub = [[], [], [], [], []]
      res.data.sub.forEach(val => {
        switch (val.category) {
          case 0:
            sub[0].push(val)
            break
          case 1:
            sub[1].push(val)
            break
          case 2:
            sub[2].push(val)
            break
          case 3:
            sub[3].push(val)
            break
          case 4:
            sub[4].push(val)
            break
        }
      })
      this.sub = sub
    })
  }

}
</script>

<style scoped>
@import "../assets/css/gd_all.css";
</style>
