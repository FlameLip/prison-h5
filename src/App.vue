<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import defaultSettings from '@/settting'
const { appId, redirectUri, scope } = defaultSettings
import { setToken } from '@/utils/auth'

export default {
  name: 'App',
  data() {
    return {
      state: ''
    }
  },
  async mounted() {
    // await this.wxAuthorize()
    this.devAuthorize()
    // this.wxRedirect()
    // this.getCodeAndState()
    // this.webAuthorize()
  },
  methods: {
    /*
      todo 1、/wx/authorize 接口拿到state，2、调用微信授权接口 https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect { appid, REDIRECT_URI, SCOPE }  3、 /wx/account-token 拿到项目token
    */
    async wxAuthorize() {
      const res = await this.$api.wxAuthorize()
      this.state = res.state
    },
    wxRedirect() {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${this.state}#wechat_redirect`
    },
    getCodeAndState() {
      console.log(this.$route.query)
      const query = this.$route.query
      if (!query.code) return
      this.code = query.code
      this.state = query.state
    },
    // 此处获取的是后端接口的token，微信的access_token 后端实现
    async webAuthorize() {
      if (!this.code) return
      const res = await this.$api.webAuthorize({
        code: this.code,
        state: this.state
      })
      let token = res.token
      setToken(token)
      let bindStatus = res.bindStatus
      sessionStorage.setItem('bindStatus', bindStatus)
      // if (bindStatus === 1) {
      //   this.$router.push('/')
      // } else {
      //   this.$router.push('/login')
      // }
    },
    async devAuthorize() {
      const res = await this.$api.devAuthorize()
      let token = res.result.token
      setToken(token)
      let bindStatus = res.result.bindStatus
      sessionStorage.setItem('bindStatus', bindStatus)
      if (bindStatus === 1) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss"></style>
