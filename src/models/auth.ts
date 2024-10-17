export type LoginRequest = {
  email: string
  password: string
  remember?: boolean
}

export type LoginResponse = {
  access_token: string
  expires_in: number
  refresh_token: string
}

export type ForgotPasswordRequest = {
  emailOrPhone: string
}

export type VerifyOtpRequest = {
  emailOrPhone: string
  otp: string
}

export type ResetPasswordRequest = {
  newPassword: string
  confirmPassWord: string
}