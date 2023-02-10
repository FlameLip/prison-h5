<template>
  <div class="app-container">
    <div class="member-info">
      <img src="../assets/img/avator.png" />
      <h3>家属信息</h3>
    </div>
    <div class="cell-box">
      <van-cell title="家属姓名" :border="false" :value="fxData.fxName" />
      <van-cell title="家属关系" :border="false" :value="fxData.relation" />
      <van-cell title="所在单位" :border="false" :value="fxData.prisonName" />
    </div>
    <div class="submit-btn">
      <van-button block type="info" @click="handleBind" native-type="submit">绑定亲属</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fxData: {
        fxId: '', //囚号
        fxName: '', //囚犯姓名
        relation: '', // 关系
        prisonName: '' //单位名
      }
    }
  },
  mounted() {
    this.getPrisonerInfo()
  },
  methods: {
    async getPrisonerInfo() {
      const phoneCode = sessionStorage.getItem('phoneCode')
      const res = await this.$api.getPrisonerInfo({ phoneCode })
      this.fxData = res.result
    },
    async handleBind() {
      const res = await this.$api.bindPrisoner({
        phoneCode: sessionStorage.getItem('phoneCode'),
        vCode: sessionStorage.getItem('vCode'),
        fxId: this.fxData.fxId
      })
      if (res.code === 0) {
        this.$toast('绑定成功')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #fff;
  padding: 64px 50px;
  .member-info {
    border-bottom: 1px solid rgba(226, 226, 226, 1);
    display: flex;
    align-items: center;
    padding-bottom: 24px;
    img {
      width: 40px;
      height: 40px;
    }
    h3 {
      height: 40px;
      margin-left: 12px;
      font-size: 32px;
      color: #2587eb;
      line-height: 32px;
      font-weight: 600;
      margin-top: 6px;
    }
  }
  .cell-box {
    margin-top: 45px;
    border-bottom: 1px solid rgba(226, 226, 226, 1);
  }
}
</style>
