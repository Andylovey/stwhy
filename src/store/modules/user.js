import { LoginbyUser, Logout, GetUserInfo } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import * as types from '../mutaion-types'

const user = {
  state: {
    token: '',
    //roles: [],
    name: '',
    avatar: '',
    introduction: ''
  },
  mutations: {
    [types.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    /*[types.SET_ROLES]: (state, roles) => {
      state.roles = roles
    },
    [types.SET_INTRODUCTION]: (state, introduction) => {
      state.introduction = introduction
    },
    [types.SET_AVATAR]: (state, avatar) => {
      state.avatar = avatar
    }*/
    [types.SET_NAME]: (state, name) => {
      state.name = name
    },
  },
  actions: {
    loginbyUser({ commit }, { username, password, token }) {
      return new Promise(async (resolve, reject) => {
        try {
          //const response = await loginbyUser(username, password)
          //if (response.data) {
            //debugger;
            commit(types.SET_TOKEN, token)
            setToken(token)
            Cookies.set('user', username)
          //}
          //resolve(response)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    logout({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          await Logout(state.token)
          //commit(types.SET_ROLES, '')
          //commit(types.SET_ROLES, [])
          Cookies.remove('user')
          removeToken()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    felogout({ commit }) {
      return new Promise(resolve => {
        commit(types.SET_TOKEN, '')
        removeToken()
        resolve()
      })
    },
    getUserInfo({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          //debugger;
          //const response = await GetUserInfo(state.token)
          //const { admin_phone, username, admin_lastlogintime, admin_type } = response.data.content;
          //console.log(response)
          //commit(types.SET_ROLES, roles)
          //commit(types.SET_NAME, 'admin')
          //commit(types.SET_AVATAR, avatar)
          //commit(types.SET_INTRODUCTION, introduction)

          //resolve(response)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default user
