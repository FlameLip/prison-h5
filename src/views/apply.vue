<template>
  <div class="page-container">
    <h2>请填写申请信息</h2>
    <div class="apply-info-container">
      <ul class="member-container">
        <li class="member-item" v-for="(item, index) in memberList" :key="index">
          <div class="avatar-box">
            <van-uploader :max-count="1" :after-read="file => afterRead(file, item, 'profilePhotoImg')">
              <div class="avartar-img" v-if="!item.profilePhotoImgUrl">
                <img class="no-img" src="../assets/img/member-avatar.png" />
                <div>上传照片</div>
                <div>(仅一人照片)</div>
              </div>
              <van-image v-else :src="item.profilePhotoImgUrl" />
            </van-uploader>
          </div>
          <div class="ralation-box">
            <van-field
              label-width="8em"
              v-model="item.pid"
              label="身份证号"
              input-align="right"
              @input="value => handleInput(value, item)"
            />
            <van-cell title="姓名" :value="item.name" />
            <van-cell title="家属关系" :value="item.relationLv2" />
          </div>
          <div class="card-box">
            <div class="imgF-card card-item">
              <van-uploader :max-count="1" :after-read="file => afterRead(file, item, 'pidZImg')">
                <div class="card-img" v-if="!item.pidZImgUrl">
                  <img class="no-img" src="../assets/img/card-F.png" />
                  <div>上传居民身份证正面</div>
                </div>
                <van-image v-else :src="item.pidZImgUrl" />
              </van-uploader>
            </div>
            <div class="imgB-card card-item">
              <van-uploader :max-count="1" :after-read="file => afterRead(file, item, 'pidBImg')">
                <div class="card-img" v-if="!item.pidBImgUrl">
                  <img class="no-img" src="../assets/img/card-B.png" />
                  <div>上传居民身份证背面</div>
                </div>
                <van-image v-else :src="item.pidBImgUrl" />
              </van-uploader>
            </div>
          </div>
        </li>
      </ul>
      <div class="add-member-btn" @click="addMember">
        <van-icon name="add" />
        <span>继续添加其他家属</span>
      </div>
      <div class="submit-btn">
        <van-button block type="info" native-type="submit" @click="goTime">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberList: [
        {
          pid: '', // 身份证号
          name: '',
          relationLv2: '',
          profilePhotoImgId: '', //头像图片ID /upload/upload-image上传后的imgId
          profilePhotoImgUrl: '', //头像图片ID /upload/upload-image上传后的imgId
          pidZImgId: '', // 身份证正面
          pidZImgUrl: '', // 身份证正面
          pidBImgId: '', // 身份证背面
          pidBImgUrl: '', // 身份证背面
          assistImgId: '' // 辅助资料证明图片
        }
      ]
    }
  },
  mounted() {
    sessionStorage.removeItem('memberList')
  },
  methods: {
    async handleInput(value, item) {
      // 13为联调身份证长度
      if (value.length === 15 || value.length === 18 || value.length === 13) {
        const res = await this.$api.memberCheck({ pid: value })
        item.name = res.result.name
        item.relationLv2 = res.result.relationLv2
      }
    },
    async afterRead(file, item, type) {
      const formData = new FormData()
      formData.append('img', file.file)
      const res = await this.$api.uploadImage(formData)
      item[type + 'Id'] = res.result.imgId
      item[type + 'Url'] = res.result.imgUrl
    },
    addMember() {
      this.memberList.push({
        pid: '', // 身份证号
        name: '',
        relationLv2: '',
        profilePhotoImgId: '', //头像图片ID /upload/upload-image上传后的imgId
        profilePhotoImgUrl: '', //头像图片ID /upload/upload-image上传后的imgId
        pidZImgId: '', // 身份证正面
        pidZImgUrl: '', // 身份证正面
        pidBImgId: '', // 身份证背面
        pidBImgUrl: '', // 身份证背面
        assistImgId: '' // 辅助资料证明图片
      })
    },
    goTime() {
      const arr = this.memberList.map(item => {
        return {
          pid: item.pid,
          profilePhotoImgId: item.profilePhotoImgId,
          pidZImgId: item.pidZImgId,
          pidBImgId: item.pidBImgId
        }
      })
      sessionStorage.setItem('memberList', JSON.stringify(arr))
      this.$router.push('/time')
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
      max-height: 1000px;
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
          ::v-deep .van-image {
            width: 196px;
            height: 274px;
            img {
              width: 196px;
              height: 274px;
            }
          }
          .avartar-img {
            width: 196px;
            height: 274px;
            background-color: #f0f0f0;
            text-align: center;
            .no-img {
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
          .van-cell {
            position: relative;
            display: flex;
            box-sizing: border-box;
            width: 100%;
            padding: 10px 40px;
            overflow: hidden;
            color: #323233;
            font-size: 14px;
            line-height: 68px;
            height: 68px;
            background-color: #fff;
            margin-bottom: 0;
            ::v-deep .van-cell__title {
              height: 48px;
              line-height: 48px;
            }
            ::v-deep .van-cell__value {
              height: 48px;
              line-height: 48px;
            }
          }
        }
        .card-box {
          display: flex;
          padding: 50px 40px;
          ::v-deep .van-image {
            width: 330px;
            height: 200px;
            img {
              width: 330px;
              height: 200px;
            }
          }
          .card-item {
            .card-img {
              width: 330px;
              height: 200px;
              background-color: #f0f0f0;
              text-align: center;
              .no-img {
                width: 64px;
                height: 48px;
                margin-top: 50px;
              }
              img {
                width: 330px;
                height: 200px;
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
