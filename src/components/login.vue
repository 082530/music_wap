<template>
    <div class="login">
        <div class="box">
          <label for="user">用户名</label>
          <input type="text" v-model.lazy="user" placeholder="请输入注册手机号或邮箱地址" id="user"><br>
          <label for="pwd">密码</label>
          <input type="password" placeholder="请输入密码" v-model.lazy="pwd" id="pwd">
          <button @click="get()">登录</button>
        </div>
    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: '',
      pwd: '',
      url: 'http://ruidong.cloudno.de',
      // url: 'http://127.0.0.1:3000',
    }
  },
  computed: {
    ...mapState({
      uId: state => state.userId
    })
  },
  beforeMount () {
    if (this.uId !== null) this.$router.push('/')
  },
  methods: {
    ...mapMutations(['setUser']),
    set1: function (data) {
      this.setUser([data.profile.userId, data.profile.avatarUrl, data.profile.nickname])
      this.$router.push('/')
    },
    get: function () {
      let that = this
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.user)) {
        this.$.get(`${this.url}/login/cellphone?phone=${this.user}&password=${this.pwd}`, {withCredentials: true}).then(function (res) {
          console.log(res)
          that.set1(res.data)

        }).catch(function (err) {
          alert('账号或密码错误')
        })
      } else if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.user)) {
        this.$.get(`${this.url}/login?email=${this.user}&password=${this.pwd}`, {withCredentials: true}).then(function (res) {
          // console.log(res)
          that.set1(res.data)
        }).catch(function (err) {
          alert('账号或密码错误')
        })
      } else alert('请输入正确的手机号码或邮箱地址')
    }
  }
}
</script>

<style scoped>
  .login{
    width: 100%;
    height: 100%;
    background: url("./../assets/login.jpg") no-repeat center top;
    background-size: cover;
  }
  label{
    font-size: 0.3rem;
    color: #ffffff;
    display: inline-block;
    width: 30%;
    vertical-align: middle;
    margin-bottom: 0.5rem;
  }
  input{
    width: 70%;
    font-size: 0.3rem;
    border: none;
    height: 0.5rem;
    vertical-align: middle;
    margin-bottom: 0.5rem;
    background: rgba(90,118,224,0.5);
    border-radius: 0.5rem;
    padding-left: 0.1rem;
  }
  input:focus,button:focus{outline: none}
  .box{
    width: 6rem;
    padding: 1rem 0.5rem;
    border-radius: 0.2rem;
    background: rgba(255,255,255,0.5);
    margin: 0 auto;
    height: 4.6rem;
    position: relative;
    top: 30%;
  }
  input::placeholder{
    color: #333;
    font-size: 0.2rem;
    line-height: 0.5rem;
  }
  button{
    display: block;
    font-size: 0.3rem;
    border: none;
    width:1.5rem;
    height: 0.6rem;
    margin: 0 auto;
    background: rgba(90,118,224,0.5);
    border-radius: 0.5rem;
    color: #fff;
  }
</style>
