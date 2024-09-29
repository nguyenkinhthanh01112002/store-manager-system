import api from './api'

const END_POINT = {
  LOGIN: '/v1/api/login'
}

const authService = {
  login: (data: any): Promise<any> => {
    // TODO: change any type
    return api.post(END_POINT.LOGIN, data)
  }
}

export default authService
