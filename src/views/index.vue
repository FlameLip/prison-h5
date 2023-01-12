<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: jianlvqi jianlvqi@jxcc.com
 * @Date: 2022-10-31 10:42:50
-->
<template>
  <div class="app-container">
    <!-- <van-sticky> -->
    <h1 class="page-title">食堂用餐人员满意度评测表</h1>
    <!-- </van-sticky> -->
    <div class="form-container">
      <van-form @submit="onSubmit" scroll-to-error :show-error="false">
        <van-field
          v-model="formData.phone"
          name="phone"
          type="tel"
          clearable
          label="手机号"
          placeholder="请输入手机号"
          @input="phoneInput"
          :rules="[{ pattern: phonePattern, message: '请输入正确的手机号' }]"
        />
        <van-field
          readonly
          clickable
          name="refectory"
          :value="formData.refectory"
          label="食堂名称"
          placeholder="点击选择食堂"
          @click-input="refectoryClick"
          :rules="[{ required: true, message: '请选择食堂' }]"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <div class="simulate-label">1. 您对食堂饭菜质量的满意度？</div>
        <van-field name="quality" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.quality" direction="horizontal">
              <van-radio :name="100">很满意</van-radio>
              <van-radio :name="85">满意</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">不满意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">2. 您认为食堂的饭菜种类如何？</div>
        <van-field name="kind" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.kind" direction="horizontal">
              <van-radio :name="100">十分丰富</van-radio>
              <van-radio :name="85">丰富</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">太少</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">3. 您觉得食堂的饭菜荤素搭配怎么样？</div>
        <van-field name="collocation" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.collocation" direction="horizontal">
              <van-radio :name="100">非常好</van-radio>
              <van-radio :name="85">很好</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">待改进</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">4. 您对食堂饭菜的分量？</div>
        <van-field name="weight" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.weight" direction="horizontal">
              <van-radio :name="100">很满意</van-radio>
              <van-radio :name="85">满意</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">不满意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">5. 您对食堂卫生状况的满意度？</div>
        <van-field name="hygiene" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.hygiene" direction="horizontal">
              <van-radio :name="100">很满意</van-radio>
              <van-radio :name="85">满意</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">不满意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">6. 您觉得食堂就餐环境怎么样？</div>
        <van-field name="environment" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.environment" direction="horizontal">
              <van-radio :name="100">很满意</van-radio>
              <van-radio :name="85">满意</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">不满意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">7. 您对食堂人员的服务态度？</div>
        <van-field name="service" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.service" direction="horizontal">
              <van-radio :name="100">很满意</van-radio>
              <van-radio :name="85">满意</van-radio>
              <van-radio :name="70">一般</van-radio>
              <van-radio :name="50">不满意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">8. 您认为现在食堂情况较以前有无进步？</div>
        <van-field name="progress" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.progress" direction="horizontal">
              <van-radio :name="100">进步很大</van-radio>
              <van-radio :name="85">有进步</van-radio>
              <van-radio :name="70">没进步</van-radio>
              <van-radio :name="50">退步</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">9. 您对目前食堂的满意度打几分？</div>
        <van-field name="fraction" label="" :rules="[{ required: true, message: '请勾选' }]">
          <template #input>
            <van-radio-group v-model="formData.fraction" direction="horizontal">
              <van-radio :name="95">90-100</van-radio>
              <van-radio :name="85">80-90</van-radio>
              <van-radio :name="75">70-80</van-radio>
              <van-radio :name="65">60-70</van-radio>
              <van-radio :name="50">60以下</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="simulate-label">10. 最不满意的地方</div>
        <van-field
          v-model="formData.content"
          name="content"
          rows="2"
          autosize
          type="textarea"
          maxlength="250"
          placeholder="请输入"
          show-word-limit
        />
        <div class="simulate-label">11. 除此之外，您还有什么意见和建议</div>
        <van-field
          name="propose"
          v-model="formData.propose"
          rows="2"
          autosize
          type="textarea"
          maxlength="250"
          placeholder="请输入"
          show-word-limit
        />
        <div class="submit-button">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'AppLayout',
  data() {
    return {
      formData: {
        // phone: '13698039651',
        phone: '',
        refectory: '',
        quality: '',
        kind: '',
        collocation: '',
        weight: '',
        hygiene: '',
        environment: '',
        service: '',
        progress: '',
        fraction: '',
        content: '',
        propose: '',
        name: ''
      },
      showPicker: false,
      columns: [],
      phonePattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    }
  },

  methods: {
    async onSubmit(values) {
      const res = await request({
        url: '/api/insert',
        method: 'post',
        data: { ...values, ...{ name: this.formData.name } }
      })
      if (res.msg === 'success') {
        // this.$notify({ type: 'success', message: '提交成功！谢谢您！' })
        this.$router.push('/finish')
      } else {
        this.$notify({ type: 'warning', message: '不好意思，提交失败！请稍后再试！' })
      }
    },
    onConfirm(value) {
      this.formData.refectory = value
      this.showPicker = false
    },
    async phoneInput() {
      if (!this.formData.phone || !this.phonePattern.test(this.formData.phone)) {
        this.columns = []
        this.formData.refectory = ''
        return
      }
      const res = await request({
        url: '/api/check',
        method: 'post',
        data: {
          phoneNumber: this.formData.phone
        }
      })
      if (res.refectory) {
        this.columns = res.refectory.split(',')
        this.formData.name = res.name
      } else {
        this.$notify({ type: 'warning', message: '手机号码输入有误，让联系数字化部门更改号码' })
      }
    },
    refectoryClick() {
      if (!this.columns.length) return this.$notify({ type: 'warning', message: '请先输入正确的手机号' })
      this.showPicker = true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .page-title {
    text-align: center;
    margin: 0;
    padding: 12px 0 12px 0;
    font-size: 24px;
    background-color: #fff;
  }
  .form-container {
    padding-bottom: 75px;
    .simulate-label {
      padding: 12px 16px 0;
      font-size: 14px;
      font-weight: bold;
    }
    .submit-button {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 12px 24px 12px 24px;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
}
</style>
