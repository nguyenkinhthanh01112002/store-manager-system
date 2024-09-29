export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/dang-nhap',
  FORGOT_PASSWORD: '/quen-mat-khau',
  RESET_PASSWORD: '/dat-lai-mat-khau',
  NOT_FOUND: '/404',
  NOT_AUTHORIZED: '/403',
  STAFF: {
    DEFAULT: '/nhan-vien',
    MANAGER: {
      LIST: '/nhan-vien/quan-ly-nhan-vien',
      DETAIL: '/nhan-vien/chi-tiet/:id',
      ADD: '/nhan-vien/them-moi'
    },
    SHIFT_SCHEDULE: {
      LIST: '/nhan-vien/phan-ca'
    }
  },
  PRODUCT: {
    DEFAULT: '/san-pham',
    MANAGER: {
      LIST: '/san-pham/danh-sach'
    },
    CATEGORY: {
      LIST: '/san-pham/danh-muc'
    }
  }
}
