export type LoginRequest = {
  email: string
  password: string
  remember?: boolean
}

export type LoginResponse = {
  accessToken: string
  expireTime: number
  refreshToken: string
}

export type ForgotPasswordRequest = {
  emailOrPhone: string
}

export type VerifyOtpRequest = {
  emailOrPhone: string
  otp: string
}
export type VerifyOtpResponse = {
  emailOrPhone: string
  otp: string

}
export type ResetPasswordRequest = {
  newPassword: string
  confirmPassWord: string
}