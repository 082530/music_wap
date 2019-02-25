import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  userId: null,
  userImg: null,
  userName: null,
  songs: [],
  type: 0, // 1代表直接播放选中歌曲，2代表播放所有歌曲并从头播放,0代表隐藏播放器
  t: false
}
const mutations = {
  setUser (state, data) {
    state.userId = data[0]
    state.userImg = data[1]
    state.userName = data[2]
    console.log(data[0], data[1], data[2])
  },
  search (state, id) {
    let t = false
    for (let i = 0; i < state.songs.length; i++) {
      if (state.songs[i].id === id) {
        t = true
        break
      }
    }
    state.t = t
  },
  settype (state) {
    state.type = 0
    console.log(state.type)
  },
  addSong (state, val) { // 添加歌曲
    // console.log(state.songs)
    state.type = val.type
    if (val.type === 1) {
      for (let i = 0; i < state.songs.length; i++) {
        if (state.songs[i].id === val.info.id) {
          state.songs.splice(i, 1)
          break
        }
      }
      state.songs.push(val.info)
    } else if (val.type === 2) {
      for (let i = 0; i < val.info.length; i++) {
        let v = {id: '', name: '', img: '', autor: ''}
        v['id'] = val.info[i].id
        v['name'] = val.info[i].name
        v['img'] = val.info[i].al.picUrl
        v['autor'] = val.info[i].ar[0].name
        this.commit('search', val.info[i].id)
        if (state.t) continue
        state.songs.push(v)
      }
    }
  },
  dele (state, id) {
    if (id === 0) state.songs.splice(0, state.songs.length)
    else {
      for (let i = 0; i < state.songs.length; i++) {
        if (state.songs[i].id === id) {
          state.songs.splice(i, 1)
          break
        }
      }
    }
  }
}
export default new Vuex.Store({
  state, mutations
})
