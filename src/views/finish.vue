<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: jianlvqi jianlvqi@jxcc.com
 * @Date: 2022-11-01 13:21:19
-->
<template>
  <div class="finish-container">
    <van-icon name="checked" color="#34e154" />
    <p>您的答卷已经提交，感谢您的参与！</p>
  </div>
</template>

<style lang="scss" scoped>
.finish-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  i {
    font-size: 32px;
    margin-top: 80px;
  }
  p {
    margin: 0;
    margin-top: 12px;
    font-size: 18px;
  }
}
</style>
