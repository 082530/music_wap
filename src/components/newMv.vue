<template>
    <div class="mv">
        <ul>
          <li v-for="item in list">
            <router-link :to="{name:'play',params:{id:item.id}}">
              <img :src="`${item.cover}?param=170y170`" alt="">
              <p><span>{{item.name}}</span><b>--{{item.briefDesc}}</b></p>
            </router-link>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'newMv',
  data () {
    return {
      // url: 'http://127.0.0.1:3000',
      url: 'http://ruidong.cloudno.de',
      list: ''
    }
  },
  beforeMount () {
    this.$.get(`${this.url}/mv/first?limit=500`).then(res => {
      this.list = res.data.data
    })
  }
}
</script>

<style scoped lang="scss">
  .mv{
    background: rgba(0,0,0,0.3);
    li{
      display: inline-block;
      width: 50%;
      margin: 0.15rem 0;
      padding: 0 0.1rem;
      vertical-align: top;
      img{
        width: 100%;
        margin-bottom: 0.1rem;
      }
      p{
        span{
          font-size: 0.3rem;
          color: #ffffff;
        }
        b{
          font-size: 0.27rem;
          color: #ccc;
        }
      }
    }
  }
</style>
