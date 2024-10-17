export type LoginRequest = {
  email: string
  password: string
  remember?: boolean
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  expireTime: number
}
