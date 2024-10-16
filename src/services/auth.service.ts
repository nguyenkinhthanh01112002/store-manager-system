import { LoginRequest, LoginResponse, VerifyOTPResponse } from '../models/auth'
import api from './api'

const END_POINT = {
  LOGIN: '/api/Account/login',
  SEND_OTP: '/api/Account/forgot-password',
  VERIFY_OTP: '/api/Account/verify-reset-code',
  RESET_PASSWORD: '/api/Account/reset-password'
}

const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    //return api.post(END_POINT.LOGIN, data)
    console.log('Login request:', data)
    try {
      const response = await api.post(END_POINT.LOGIN, data)
      console.log('Login response:', response)
      return response.data
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
      throw error
    }
  },
  sendOTP: async (emailOrPhone: string) => {
    try {
      const response = await api.post(END_POINT.SEND_OTP, { emailOrPhone })
      console.log('Send OTP response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Send OTP error:', error.response?.data || error.message)
      if (error.response) {
        // Lỗi từ server với status code
        switch (error.response.status) {
          case 400:
            throw new Error('Email hoặc số điện thoại không hợp lệ')
          case 429:
            throw new Error('Quá nhiều yêu cầu. Vui lòng thử lại sau')
          default:
            throw new Error('Lỗi khi gửi OTP. Vui lòng thử lại')
        }
      } else if (error.request) {
        // Yêu cầu được gửi nhưng không nhận được phản hồi
        throw new Error('Không nhận được phản hồi từ server')
      } else {
        // Lỗi khi thiết lập request
        throw new Error('Lỗi khi gửi yêu cầu')
      }
    }
  },
  // verifyOTP: async (emailOrPhone: string, otp: string) => {
  //   try {
  //     const response = await api.post(END_POINT.VERIFY_OTP, { emailOrPhone, Code: otp })
  //     console.log('Verify OTP response:', response)
  //     return response
  //   } catch (error: any) {
  //     console.error('Verify OTP error:', error.response?.data)
  //     if (error.response) {
  //       const responseData = error.response.data
  //       if (responseData.errors) {
  //         // Xử lý lỗi validation
  //         const errorMessages = Object.values(responseData.errors).flat()
  //         throw new Error(errorMessages.join(', '))
  //       } else if (responseData.title) {
  //         // Xử lý lỗi chung từ API
  //         throw new Error(responseData.title)
  //       }

  //       switch (error.response.status) {
  //         case 400:
  //           if (responseData.errors?.Code) {
  //             throw new Error(responseData.errors.Code[0])
  //           }
  //           throw new Error('Dữ liệu không hợp lệ')
  //         case 401:
  //           throw new Error('OTP không chính xác')
  //         case 404:
  //           throw new Error('Không tìm thấy yêu cầu OTP cho email/số điện thoại này')
  //         case 410:
  //           throw new Error('OTP đã hết hạn')
  //         default:
  //           throw new Error('Lỗi khi xác thực OTP. Vui lòng thử lại')
  //       }
  //     } else if (error.request) {
  //       throw new Error('Không nhận được phản hồi từ server')
  //     } else {
  //       throw new Error('Lỗi khi gửi yêu cầu')
  //     }
  //   }
  // },
  verifyOTP: async (data: { emailOrPhone: string; code: string }): Promise<VerifyOTPResponse> => {
    console.log('Verify OTP request:', data)
    try {
      const response = await api.post(END_POINT.VERIFY_OTP, data)
      console.log('Full Verify OTP response:', response)
      // Response đã là dữ liệu chúng ta cần, không cần truy cập .data
      const responseData = response

      if (
        responseData &&
        typeof responseData === 'object' &&
        'code' in responseData &&
        'emailOrPhone' in responseData
      ) {
        return responseData as VerifyOTPResponse
      } else {
        console.error('Invalid response format:', responseData)
        throw new Error('Invalid response format')
      }
    } catch (error: any) {
      console.error('Verify OTP error:', error.response?.data || error.message)
      throw error
    }
  },
  resetPassword: async (data: { newPassword: string; confirmPassword: string }, code: string): Promise<any> => {
    try {
      console.log('Reset password request data:', { ...data, code })
      const response = await api.post(`${END_POINT.RESET_PASSWORD}?code=${encodeURIComponent(code)}`, {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      })
      console.log('Reset password response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message)
      if (error.response && error.response.data) {
        throw new Error(
          typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data)
        )
      }
      throw error
    }
  }
}
export default authService
