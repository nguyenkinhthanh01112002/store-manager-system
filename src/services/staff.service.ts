import { Staff } from '~/models/staff'
import api from './api'

const END_POINT = {
  LIST: '/v1/users'
}

const staffService = {
  getList: (): Promise<Staff[]> => {
    return api.get(END_POINT.LIST)
  }
}

export default staffService
