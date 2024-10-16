export type LoginRequest = {
  emailOrPhone: string
  password: string
  remember?: boolean
}
export type ForgotPasswordRequest = {
  emailOrPhone: string
}
export type LoginResponse = {
  access_token: string
  expires_in: number
  refresh_token: string
}
export type VerifyOTPResponse = {
  code: string,
  emailOrPhone: string
  // Thêm các trường khác nếu có
}
// export type SendOTPRequest = {
//   emailOrPhone: string
// }
// export type SendOTPResponse = {
//   code: string
// }
