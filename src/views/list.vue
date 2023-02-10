<template>
  <div class="apply-list-container">
    <div class="list-box" v-if="list.length">
      <van-list v-model="loading" :finished="finished" finished-text="" @load="getList">
        <ul>
          <li v-for="(item, index) in list" :key="index" class="list-item">
            <div class="apply-title">
              <div class="apply-day">
                {{ item.applyDate }}
                <span>的申请</span>
              </div>
              <div
                class="status"
                :class="item.status === -1 || item.status === -2 ? 'reject' : item.status === 1 ? 'pass' : ''"
              >
                {{ item.statusMsg }}
              </div>
            </div>
            <div class="apply-info">
              <div>
                <span>亲人姓名：</span>
                <span>{{ item.fxName }}</span>
              </div>
              <div>
                <span>申请人数：</span>
                <span>{{ item.memberCount }}人</span>
              </div>
              <div>
                <span>会见日期：</span>
                <span>{{ item.meetingDate }}</span>
              </div>
              <div v-if="item.timeRange">
                <span>会见时段：</span>
                <span class="meeting-date">{{ item.timeRange }}</span>
              </div>
              <div v-if="item.rejectReason">
                <span>驳回理由：</span>
                <span class="reject-reason">{{ item.rejectReason }}</span>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
    <div class="no-data" v-if="list.length === 0 && noDataFlag">
      <img src="../assets/img/no-data.png" />
      <div class="nodata-text">暂无申请记录</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      noDataFlag: false,
      pageOption: {
        page: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // todo  u
    getList() {
      this.$api
        .getMeetingList(this.pageOption)
        .then(res => {
          this.loading = false
          this.list = [...this.list, ...res.result.list]
          this.noDataFlag = !!this.list.length
          let total = res.result.total
          if (this.list.length >= total) {
            this.finished = true
          } else {
            this.pageOption.page++
          }
        })
        .catch(() => {
          this.noDataFlag = true
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-list-container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #f8f8f8;
  padding: 30px;
  .list-item {
    background-color: #fff;
    margin-bottom: 24px;
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
    .apply-title {
      display: flex;
      justify-content: space-between;
      padding: 32px 30px;
      border-bottom: 1px solid rgba(226, 226, 226, 1);
      .apply-day {
        font-size: 28px;
        color: #4a4a4a;
        letter-spacing: 0;
        line-height: 28px;
        font-weight: 600;
        span {
          font-size: 28px;
          color: #4a4a4a;
          letter-spacing: 0;
          line-height: 28px;
          font-weight: 400;
        }
      }
      .status {
        font-size: 28px;
        color: #2587eb;
        letter-spacing: 0;
        line-height: 28px;
        font-weight: 600;
      }
      .pass {
        color: #0cc683;
      }
      .reject {
        color: #ff2a2a;
      }
    }
    .apply-info {
      padding: 32px 30px 40px;
      & > div {
        display: flex;
        margin-bottom: 24px;
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        span {
          font-size: 28px;
          color: #878787;
          letter-spacing: 0;
          line-height: 28px;
          font-weight: 400;
          &:nth-of-type(2) {
            font-size: 28px;
            color: #000000;
            letter-spacing: 0;
            line-height: 28px;
            font-weight: 400;
          }
        }
        .reject-reason {
          color: #ff2a2a !important;
        }
        .meeting-date {
          color: #2587eb !important;
        }
      }
    }
  }
  .no-data {
    text-align: center;
    img {
      width: 320px;
      height: 160px;
      margin-top: 150px;
    }
    .nodata-text {
      font-size: 26px;
      color: #9b9b9b;
      letter-spacing: 0;
      line-height: 26px;
      font-weight: 400;
      text-align: center;
      margin-top: 36px;
    }
  }
}
</style>
