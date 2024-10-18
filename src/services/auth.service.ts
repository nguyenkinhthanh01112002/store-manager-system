import { ForgotPasswordRequest, LoginRequest, LoginResponse, VerifyOtpRequest, ResetPasswordRequest } from '../models/auth'
import api from './api'

const END_POINT = {
  LOGIN: '/v1/api/login',
  FORGOT_PASSWORD: '/api/Account/forgot-password',
  VERYFI_OTP: '/api/Account/verify-reset-otp',
  RESET_PASSWORD: '/api/Account/reset-password'
}

const authService = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return api.post(END_POINT.LOGIN, data)
  },
  forgotPassword: (data: ForgotPasswordRequest): Promise<{ otp: string }> => {
    return api.post(END_POINT.FORGOT_PASSWORD, data)
  },
  verifyResetOtp: (data: VerifyOtpRequest): Promise<{ emailOrPhone: string, otp: string }> => {
    return api.post(END_POINT.VERYFI_OTP, data)
  },
  resetPassword: (data: ResetPasswordRequest, otp: string): Promise<any> => {
    return api.post(`${END_POINT.RESET_PASSWORD}?otp=${otp}`, data)
  }
}

export default authService
