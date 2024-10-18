import React, { useEffect, useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Flex, Form, Input, Typography, message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { BaseButton } from '~/components/ui'
import { ROUTE_PATH } from '~/constants/routePath'
import authService from '~/services/auth.service'
type ResetPasswordForm = {
  newPassword: string
  confirmPassword: string
}

function ResetPasswordPage() {
  const [form] = Form.useForm<ResetPasswordForm>()
  const navigate = useNavigate()
  const location = useLocation()
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)

  const [otp, setOtp] = useState('')

  useEffect(() => {
    const state = location.state as { emailOrPhone: string; otp: string } | undefined
    if ( state?.otp) {
      setOtp(state.otp)
    } else {
      messageApi.error('Thông tin xác thực không hợp lệ.')
      navigate(ROUTE_PATH.FORGOT_PASSWORD)
    }
  }, [location, messageApi, navigate])
  
  const onFinish = async (values: ResetPasswordForm) => {
    setIsLoading(true)
    try {
      await authService.resetPassword(
        { 
          newPassword: values.newPassword,
          confirmPassWord: values.confirmPassword
        }, 
        otp
      )
      await messageApi.success('Mật khẩu đã được đặt lại thành công.')
      navigate(ROUTE_PATH.LOGIN)
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.')
      } else {
        messageApi.error('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form} onFinish={onFinish}>
      {contextHolder}
      <Flex align="center" justify="center" className="bg-[#f7f8fc] w-screen h-screen bg-opacity-60">
        <Flex
          align="center"
          justify="center"
          vertical
          className="w-[370px] bg-white rounded-[10px] px-12 py-8 shadow-[0px_10px_34px_-15px_rgba(0,0,0,0.3)]"
        >
          <Flex align="center" justify="center" className="bg-primary w-[80px] h-[80px] rounded-full">
            <UserOutlined className="text-white text-[30px]" />
          </Flex>
          <Typography.Title level={3} className="mt-6 mb-8">
            Đặt lại mật khẩu
          </Typography.Title>
          <Form.Item
            name="newPassword"
            className="w-full"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              size="large" 
              placeholder="Mật khẩu mới" 
              aria-label="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            className="w-full"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <BaseButton size="large" className="w-full mt-4" htmlType="submit" loading={isLoading}>
            Đặt lại mật khẩu
          </BaseButton>
          <BaseButton type="link" className="mt-4" onClick={() => navigate(ROUTE_PATH.LOGIN)}>
            Quay lại đăng nhập
          </BaseButton>
        </Flex>
      </Flex>
    </Form>
  )
}

export default ResetPasswordPage