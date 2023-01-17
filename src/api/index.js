import { post, get } from '@/utils/request'

export default {
  devAuthorize: data => get('/wx/account-token-dev-gen', data), // 开发时拿token
  wxAuthorize: data => get('/wx/authorize', data), // 微信用户授权
  webAuthorize: data => post('/wx/account-token', data), // 通过微信用户授权，获取web页面token
  getUserInfo: data => post('/wx/bind-user-info', data),
  getVcode: data => post('/wx/vcode-req', data),
  validVcode: data => post('/wx/vcode-validation', data),
  getPrisonerInfo: data => post('/wx/prisoner-info', data),
  bindPrisoner: data => post('/wx/bind-prisoner', data),
  uploadImage: data => post('/upload/upload-image', data),
  modifyPhoto: data => post('/wx/member-profile-photo-modify', data),
  getMeetingList: data => post('/wx/meeting-list', data),
  getUsableDate: data => post('/wx/usable-date-info', data),
  getRelationList: data => post('/wx/relation-list', data),
  memberCheck: data => post('/wx/member-check', data),
  meetingApply: data => post('/wx/meeting-apply', data)
}
