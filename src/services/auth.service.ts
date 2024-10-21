import { ForgotPasswordRequest, LoginRequest, LoginResponse, VerifyOtpRequest, ResetPasswordRequest, VerifyOtpResponse } from '../models/auth'
import api from './api'

const END_POINT = {
  LOGIN: 'api/account/login',
  FORGOT_PASSWORD: '/api/account/forgot-password',
  VERYFI_OTP: '/api/account/verify-reset-otp',
  RESET_PASSWORD: '/api/account/reset-password'
}

const authService = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return api.post(END_POINT.LOGIN, data)
  },
  forgotPassword: (data: ForgotPasswordRequest): Promise<{ otp: string }> => {
    return api.post(END_POINT.FORGOT_PASSWORD, data)
  },
  verifyResetOtp: (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    return api.post(END_POINT.VERYFI_OTP, data)
  },
  resetPassword: (data: ResetPasswordRequest, otp: string): Promise<any> => {
    return api.post(`${END_POINT.RESET_PASSWORD}?otp=${otp}`, data)
  }
}

export default authService
