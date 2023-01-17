<template>
  <div class="app-container">
    <div class="form-container">
      <van-form @submit="onSubmit" :show-error="false">
        <van-field
          v-model="formData.phoneCode"
          name="phone"
          left-icon="manager"
          type="tel"
          placeholder="请输入家属手机号码"
          :rules="[{ pattern: phonePattern, message: '请输入正确的手机号' }]"
        />
        <van-field
          v-model="formData.vCode"
          name="phone"
          type="number"
          left-icon="phone"
          placeholder="请输入手机校验码"
          :rules="[{ required: true, message: '请填写手机校验码' }]"
        >
          <template #button>
            <van-button @click="handleCode" :disabled="codeBtnFlag" type="info">{{
              codeBtnFlag ? count + 's' : '获取验证码'
            }}</van-button>
          </template>
        </van-field>
        <div class="submit-btn">
          <van-button block :disabled="!formData.phoneCode || !formData.vCode" type="info" native-type="submit"
            >下一步</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      formData: {
        phoneCode: '13800138001',
        vCode: ''
      },
      timer: null,
      count: 0,
      codeBtnFlag: false,
      phonePattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    async onSubmit() {
      const res = await this.$api.validVcode(this.formData)
      if (res.code === 0) {
        this.$router.push('/bind')
        sessionStorage.setItem('phoneCode', this.formData.phoneCode)
        sessionStorage.setItem('vCode', this.formData.vCode)
      }
    },
    handleCode() {
      this.getVCode()
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.codeBtnFlag = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.codeBtnFlag = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    async getVCode() {
      const res = await this.$api.getVcode({ phoneCode: this.formData.phoneCode })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #fff;
  padding: 68px 50px;
  .form-container {
    padding-bottom: 75px;
    .van-cell {
      padding: 0;
      margin-bottom: 30px;
      position: relative;
      height: 100px;
      ::v-deep .van-field__left-icon {
        z-index: 999;
        position: absolute;
        line-height: 100px;
        left: 30px;
        i {
          font-size: 34px;
          color: #2587eb;
        }
      }
      ::v-deep .van-field__error-message {
        padding-left: 86px;
        margin-top: 12px;
      }
      ::v-deep .van-field__body {
        background: #f8f8f8;
        .van-field__control {
          height: 100px;
          padding-left: 86px;
        }
        .van-field__button {
          margin-right: 24px;
          button {
            height: 56px;
            width: 170px;
            border-radius: 8px;
          }
        }
      }
    }
  }
}
</style>
