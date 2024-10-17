import { useState, useEffect } from 'react'
import { Flex, Card, Avatar, Typography, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants/routePath'
import { ForgotPasswordRequest, VerifyOtpRequest } from '~/models/auth'
import authService from '~/services/auth.service'
const { Title } = Typography

interface ForgotPasswordFormValues {
  emailOrPhone: string
  otp: string
}

function ForgotPasswordPage() {
  const [form] = Form.useForm<ForgotPasswordFormValues>()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])
  const handleSendOTP = async () => {
    try {
      const emailOrPhone = form.getFieldValue('emailOrPhone')
      if (!emailOrPhone) {
        message.error('Vui lòng nhập email hoặc số điện thoại!')
        return
      }

      setLoading(true)
      const forgotPasswordRequest: ForgotPasswordRequest = { emailOrPhone }
      await authService.forgotPassword(forgotPasswordRequest)
      setCountdown(30)
      setOtpSent(true)
      message.success('Mã xác thực đã được gửi!')
    } catch {
      message.error('Có lỗi xảy ra khi gửi mã xác thực. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values: ForgotPasswordFormValues) => {
    try {
      setLoading(true)
      const verifyOtpRequest: VerifyOtpRequest = {
        emailOrPhone: values.emailOrPhone,
        otp: values.otp
      }
      await authService.verifyResetOtp(verifyOtpRequest)
      message.success('Xác thực mã thành công!')
      navigate(ROUTE_PATH.RESET_PASSWORD, { state: { emailOrPhone: values.emailOrPhone, otp: values.otp } })
    } catch {
      message.error('Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex justify="center" align="middle" className="min-h-screen bg-gray-100">
      <Card className="w-[370px] shadow-lg">
        <div className="text-center">
          <Avatar size={64} icon={<UserOutlined />} className="bg-blue-500 mb-4" />
          <Title level={3}>Quên mật khẩu</Title>
        </div>
        <Form<ForgotPasswordFormValues> form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="emailOrPhone"
            rules={[
              { required: true, message: 'Vui lòng nhập email hoặc số điện thoại!' },
              { type: 'email', message: 'Email không hợp lệ!', validateTrigger: 'onBlur' }
            ]}
          >
            <Input placeholder="Nhập email hoặc số điện thoại" size="large" disabled={loading} />
          </Form.Item>
          <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
            <Input.Search
              placeholder="Nhập mã OTP"
              size="large"
              disabled={loading || !otpSent}
              enterButton={
                <Button 
                  type="primary" 
                  onClick={handleSendOTP} 
                  disabled={countdown > 0 || loading}
                  loading={loading && !otpSent}
                >
                  {countdown > 0 ? `Gửi OTP (${countdown}s)` : 'Gửi OTP'}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default ForgotPasswordPage