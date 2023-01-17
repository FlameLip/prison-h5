<template>
  <div class="page-container">
    <h2>请选择会见时间</h2>
    <div class="page-content">
      <div class="time-title">
        <div class="now-month">
          {{ applyDate.date.slice(0, 4) + '年' + applyDate.date.slice(5, 7) + '月' }}
        </div>
        <div class="status-desc">
          <div class="status-item">
            <span class="circle-success circle"></span>
            <span>可预约</span>
          </div>
          <div class="status-item">
            <span class="circle-fail circle"></span>
            <span>不可预约</span>
          </div>
        </div>
      </div>
      <div class="day-list">
        <ul class="float-box">
          <li
            v-for="(item, index) in timeList"
            :key="index"
            @click="clickDay(item, index)"
            :class="[{ 'can-apply': item.isCanApply === 1, 'now-day': activeIndex === index }]"
          >
            <div class="day-box">{{ item.date.split('.')[2] }}</div>
            <div class="week-box">{{ item.weekday }}</div>
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="circle"></div>
        <p>{{ `会见时间段为上午${startTime}至晚间${endTime}，预约成功后会根据当日预约情况为您安排具体会见时间。` }}</p>
      </div>
    </div>
    <div class="submit-btn">
      <van-button block type="info" native-type="submit" @click="submitApply">提交申请</van-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      startTime: '06:00',
      endTime: '23:00',
      timeList: [],
      activeIndex: -1,
      applyDate: {
        date: ''
      },
      className: ''
    }
  },
  mounted() {
    sessionStorage.removeItem('applyDate')
    this.getUsableDate()
  },
  methods: {
    dayjs,
    async getUsableDate() {
      const res = await this.$api.getUsableDate()
      this.timeList = res.result.list
      this.startTime = res.result.startTime
      this.endTime = res.result.endTime
      this.applyDate = this.timeList[0]
    },
    clickDay(item, index) {
      this.activeIndex = index
      this.applyDate = item
      sessionStorage.setItem('applyDate', item.date)
    },
    async submitApply() {
      const memberList = JSON.parse(sessionStorage.getItem('memberList')) || []
      const res = await this.$api.meetingApply({
        applyDate: this.applyDate.date,
        memberList
      })
      if (res.code === 0) {
        this.$router.push('/success')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #f8f8f8;
  h2 {
    font-size: 32px;
    color: #4a4a4a;
    line-height: 32px;
    font-weight: 600;
    padding: 24px 40px;
  }
  .page-content {
    padding: 40px 40px;
    background-color: #fff;
    .time-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .now-month {
        font-size: 32px;
        color: #141414;
        letter-spacing: 0;
        text-align: center;
        line-height: 32px;
        font-weight: 600;
      }
      .status-desc {
        display: flex;
        align-items: center;
        .status-item {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            margin-right: 30px;
          }
          span {
            font-size: 22px;
            color: #4a4a4a;
            letter-spacing: 0;
            line-height: 22px;
            font-weight: 400;
            display: block;
          }
          .circle {
            border: 2px solid rgba(11, 197, 129, 1);
            border-radius: 50%;
            width: 16px;
            height: 16px;
            margin-top: -4px;
            margin-right: 10px;
          }
          .circle-fail {
            border: 2px solid rgba(190, 190, 190, 1);
          }
        }
      }
    }
    .float-box {
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
      margin-top: 40px;
      margin-bottom: 50px;
      li {
        width: 84px;
        height: 130px;
        flex-basis: 84px;
        flex-shrink: 0;
        border: 1px solid rgba(175, 175, 175, 1);
        border-radius: 10px;
        text-align: center;
        font-size: 28px;
        color: #878787;
        line-height: 28px;
        font-weight: 600;
        margin-right: 20px;
        &.can-apply {
          border: 1px solid rgba(11, 197, 129, 1);
          color: #0cc683;
        }
        &.now-day {
          background-image: linear-gradient(-33deg, #06bf7c 0%, #32eda9 100%);
          color: #fff;
        }
        :nth-last-of-type(1) {
          margin-right: 0;
        }
        .day-box {
          margin: 24px 0;
        }
        .week-box {
          font-size: 24px;
        }
      }
    }
    .info {
      display: flex;
      .circle {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #878787;
        margin-right: 10px;
        margin-top: 12px;
      }
      p {
        font-size: 26px;
        flex: 1;
        color: #878787;
        letter-spacing: 0;
        font-weight: 400;
        margin: 0;
        padding: 0;
      }
    }
  }
  .submit-btn {
    padding: 0 50px;
    margin-top: 100px;
  }
}
</style>
