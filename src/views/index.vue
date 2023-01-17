<template>
  <div class="page-container">
    <div class="member-base-info">
      <div class="upload-box">
        <van-uploader :preview-full-image="false" :max-count="1" :after-read="afterRead">
          <van-image :src="profilePhotoImgUrl" />
        </van-uploader>
      </div>
      <div class="base-box">
        <div>
          <div class="info-item">
            <span>姓名</span>
            <span>{{ userInfo.name }}</span>
          </div>
          <div class="info-item">
            <span>手机</span>
            <span>{{ userInfo.phoneCode }}</span>
          </div>
          <!-- <div class="info-item">
            <span>身份证号</span>
            <span>{{ userInfo.pid }}</span>
          </div> -->
        </div>
        <!-- <div class="edit-box">
          <van-icon name="edit" />
          <span>编辑信息</span>
        </div> -->
      </div>
    </div>
    <div class="fx-info">
      <div class="title-box">
        <img src="../assets/img/avator.png" />
        <h3>家属信息</h3>
      </div>
      <div class="cell-box">
        <van-cell title="家属姓名" :border="false" :value="userInfo.fxName" />
        <van-cell title="家属关系" :border="false" :value="userInfo.relation" />
        <van-cell title="所在单位" :border="false" :value="userInfo.prisonName" />
      </div>
    </div>
    <div class="submit-btn">
      <van-button block type="info" native-type="submit" @click="goApply">申请会见</van-button>
    </div>
    <div class="apply-list-box" @click="$router.push('/list')">
      <span>查看我的申请记录</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      profilePhotoImgUrl: ''
    }
  },
  mounted() {
    this.getUserInfo()
    sessionStorage.removeItem('userInfo')
  },
  methods: {
    // todo 第一绑定状态，显示policy页面逻辑
    async afterRead(file) {
      const formData = new FormData()
      formData.append('img', file.file)
      const res = await this.$api.uploadImage(formData)
      let imgId = res.result.imgId
      this.profilePhotoImgUrl = res.result.imgUrl
      await this.$api.modifyPhoto({ imgId })
    },
    async getUserInfo() {
      const res = await this.$api.getUserInfo()
      this.userInfo = res.result
      sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      if (res.result.profilePhotoUrl) this.profilePhotoImgUrl = res.result.profilePhotoUrl
    },
    goApply() {
      if (!localStorage.getItem('firstTime')) {
        this.$router.push('/policy')
      } else {
        this.$router.push('/apply')
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

  .member-base-info {
    padding: 52px 40px;
    display: flex;
    background-color: #fff;
    .upload-box {
      margin-right: 36px;
      ::v-deep .van-uploader__upload {
        width: 196px;
        height: 274px;
      }
      ::v-deep .van-image {
        width: 196px;
        height: 274px;
        img {
          width: 196px;
          height: 274px;
        }
      }
    }
    .base-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 58%;
      .info-item {
        align-self: flex-start;
        display: flex;
        align-items: center;
        margin-bottom: 28px;
        span {
          display: block;
          &:nth-of-type(1) {
            background: #deeeff;
            border-radius: 8px;
            text-align: center;
            line-height: 42px;
            width: 92px;
            margin-right: 24px;
            font-size: 24px;
            color: #2587eb;
          }
          &:nth-of-type(2) {
            font-size: 34px;
            color: #4a4a4a;
            font-weight: 600;
          }
        }
      }
      .edit-box {
        align-self: flex-end;
        font-size: 28px;
        color: #2587eb;
        line-height: 32px;
        height: 32px;
        span {
          margin-left: 14px;
        }
      }
    }
  }
  .fx-info {
    background: #fff;
    padding: 38px 40px 12px 40px;
    margin-top: 16px;
    .title-box {
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
    }
  }
  .submit-btn {
    padding: 0 50px;
  }
  .apply-list-box {
    margin-top: 50px;
    font-size: 28px;
    color: #2587eb;
    line-height: 28px;
    height: 28px;
    font-weight: 400;
    text-align: center;
    display: flex;
    justify-content: center;
    span {
      margin-right: 6px;
    }
  }
}
</style>
