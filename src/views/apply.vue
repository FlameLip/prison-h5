<template>
  <div class="page-container">
    <h2>请填写申请信息</h2>
    <div class="apply-info-container">
      <ul class="member-container">
        <li class="member-item" v-for="item in 2" :key="item">
          <div class="avatar-box">
            <van-uploader :max-count="1" v-model="avatarList" :after-read="afterRead">
              <div class="avartar-img">
                <img src="../assets/img/member-avatar.png" />
                <div>上传照片</div>
                <div>(仅一人照片)</div>
              </div>
            </van-uploader>
          </div>
          <div class="ralation-box">
            <van-cell title="单元格" is-link value="内容" />
          </div>
          <div class="card-box">
            <div class="imgF-card card-item">
              <van-uploader :max-count="1" v-model="imgFCardList" :after-read="afterRead">
                <div class="card-img">
                  <img src="../assets/img/card-F.png" />
                  <div>上传居民身份证正面</div>
                </div>
              </van-uploader>
            </div>
            <div class="imgB-card card-item">
              <van-uploader :max-count="1" v-model="imgBCardList" :after-read="afterRead">
                <div class="card-img">
                  <img src="../assets/img/card-B.png" />
                  <div>上传居民身份证背面</div>
                </div>
              </van-uploader>
            </div>
          </div>
        </li>
      </ul>
      <div class="add-member-btn">
        <van-icon name="add" />
        <span>继续添加其他家属</span>
      </div>
      <div class="submit-btn">
        <van-button block type="info" native-type="submit">申请会见</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarList: [],
      imgFCardList: [],
      imgBCardList: []
    }
  },
  methods: {
    afterRead(file) {
      console.log(file)
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
  .apply-info-container {
    .member-container {
      max-height: 780px;
      overflow-y: auto;
      .member-item {
        background-color: #fff;
        margin-bottom: 20px;
        .avatar-box {
          width: 100%;
          height: 368px;
          display: flex;
          justify-content: center;
          align-items: center;
          .avartar-img {
            width: 196px;
            height: 274px;
            background-color: #f0f0f0;
            text-align: center;
            img {
              width: 80px;
              height: 80px;
              margin-top: 64px;
            }
            div {
              margin-top: 24px;
              text-align: center;
              font-size: 24px;
              color: #afafaf;
              letter-spacing: 0;
              line-height: 24px;
              &:nth-of-type(2) {
                margin-top: 16px;
              }
            }
          }
          ::v-deep .van-uploader__upload {
            width: 196px;
            height: 274px;
          }
        }
        .ralation-box {
          border-top: 1px solid rgba(238, 238, 238, 1);
          border-bottom: 1px solid rgba(238, 238, 238, 1);
          padding: 24px 40px;
          .van-cell {
            margin-bottom: 0;
          }
        }
        .card-box {
          display: flex;
          padding: 50px 40px;
          .card-item {
            .card-img {
              width: 330px;
              height: 200px;
              background-color: #f0f0f0;
              text-align: center;
              img {
                width: 64px;
                height: 48px;
                margin-top: 50px;
              }
              div {
                margin-top: 20px;
                text-align: center;
                font-size: 24px;
                color: #afafaf;
                letter-spacing: 0;
                line-height: 24px;
              }
            }
            ::v-deep .van-uploader__upload {
              width: 330px;
              height: 200px;
            }
            &:nth-of-type(1) {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .submit-btn {
      padding: 0 50px;
      margin-top: 75px;
    }
    .add-member-btn {
      margin-top: 55px;
      font-size: 30px;
      color: #2587eb;
      letter-spacing: 0;
      line-height: 30px;
      font-weight: 400;
      height: 30px;
      text-align: center;
      display: flex;
      justify-content: center;
      span {
        margin-left: 12px;
      }
    }
  }
}
</style>
