import { LoginRequest, LoginResponse } from '../models/auth'
import api from './api'

const END_POINT = {
  LOGIN: '/v1/api/login'
}

const authService = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return api.post(END_POINT.LOGIN, data)
  }
}

export default authService
