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
