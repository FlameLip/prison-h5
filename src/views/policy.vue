<template>
  <div class="page-container">
    <h2>会见须知</h2>
    <div class="policy-content">
      <div class="policy-item">
        <h3>一、团体开放时间</h3>
        <div>每周二至周五(法定节假日除外) 10:00-17:00 馆前30分钟停止入场</div>
      </div>
      <div class="policy-item">
        <h3>二、团体开放范围</h3>
        <div>免费向团体开放，团体预约总人数下限为7人，上限为50人，预约请选择团体通道。</div>
      </div>
      <div class="policy-item">
        <h3>三、预约须知</h3>
        <div>
          1.团体参观需提前至少1个工作日预约。<br />
          2.需填写真实信息。参观当日凭预约记录通过验证后入馆参观。<br />
          3.请按预约时段准时入馆参观，超过预约时段需重新预约。<br />
          4.如需讲解或其他服务，请提前电话联系展馆工作人员。<br />
          5.如遇重大活动或重要设备设施维修时，展馆可能进行临时闭馆，我馆将及时发布信息，敬请留意。
        </div>
      </div>
    </div>
    <div class="warning-info">
      <van-checkbox v-model="checked">我已阅读会见须知，并将严格遵守相关规定</van-checkbox>
    </div>
    <div class="submit-btn">
      <van-button block type="info" native-type="submit" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: ''
    }
  },
  methods: {
    nextStep() {
      if (!this.checked) return this.$toast('请先勾选会见须知')
      localStorage.setItem('firstTime', 1)
      this.$router.push('/apply')
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 32px;
  color: #4a4a4a;
  line-height: 32px;
  font-weight: 600;
  padding: 24px 40px;
}
.policy-content {
  background: #fff;
  padding: 46px 40px;
  .policy-item {
    margin-bottom: 50px;
    &:last-of-type {
      margin-bottom: 0px;
    }
    h3 {
      font-size: 32px;
      color: #4a4a4a;
      line-height: 32px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    div {
      font-size: 26px;
      color: #4a4a4a;
      text-align: justify;
      line-height: 46px;
      font-weight: 400;
      padding-left: 65px;
    }
  }
}
.submit-btn {
  padding: 0 50px;
  margin-top: 100px;
}
.warning-info {
  margin-top: 48px;
  padding-left: 50px;
  display: flex;
  align-items: center;
  ::v-deep .van-checkbox__icon {
    font-size: 28px;
    margin-top: -4px;
  }
  ::v-deep .van-checkbox__label {
    font-size: 28px;
    color: #ff2a2a;
    letter-spacing: 0;
    text-align: justify;
    line-height: 32px;
    height: 32px;
    font-weight: 400;
  }
}
</style>
