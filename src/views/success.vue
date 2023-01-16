<template>
  <div class="app-container">
    <div class="success-box">
      <img src="../assets/img/success.png" />
      <div class="success-text">提交成功</div>
      <div>您的申请已提交成功，请耐心等待审核</div>
    </div>
    <div class="cell-box">
      <van-cell title="家属姓名" :border="false" value="张向阳" />
      <van-cell title="家属关系" :border="false" value="父子" />
      <van-cell title="所在单位" :border="false" value="深圳监狱" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #fff;
  padding: 0 40px;
}
.success-box {
  width: 100%;
  text-align: center;
  img {
    width: 240px;
    height: 290px;
    margin-top: 70px;
  }
  div {
    margin-top: 36px;
    text-align: center;
    font-size: 40px;
    color: #0cc683;
    letter-spacing: 0;
    line-height: 40px;
    font-weight: 500;
    &:nth-of-type(2) {
      margin-top: 20px;
      margin-bottom: 50px;
      font-size: 26px;
      color: #9b9b9b;
      letter-spacing: 0;
      line-height: 26px;
      font-weight: 400;
    }
  }
}
.cell-box {
  padding: 50px 0 10px;
  border-top: 1px solid rgba(226, 226, 226, 1);
  border-bottom: 1px solid rgba(226, 226, 226, 1);
}
</style>
