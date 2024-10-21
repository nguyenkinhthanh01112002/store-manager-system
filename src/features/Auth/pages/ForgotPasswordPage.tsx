import { useState, useEffect } from 'react'
import { Flex, Card, Avatar, Typography, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
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
  const [otpSent, setOtpSent] = useState(false)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const { mutate: sendOtp, isPending: isSendingOtp } = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
    onSuccess: () => {
      setCountdown(30)
      setOtpSent(true)
      message.success('Mã xác thực đã được gửi!')
    },
    onError: () => {
      message.error('Có lỗi xảy ra khi gửi mã xác thực. Vui lòng thử lại!')
    },
  })

  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.verifyResetOtp(data),
    onSuccess: (_, variables) => {
      message.success('Xác thực mã thành công!')
      navigate(ROUTE_PATH.RESET_PASSWORD, { 
        state: { 
          emailOrPhone: variables.emailOrPhone, 
          otp: variables.otp 
        } 
      })
    },
    onError: () => {
      message.error('Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng thử lại!')
    },
  })
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOTP = async () => {
    const emailOrPhone = form.getFieldValue('emailOrPhone')
    if (!emailOrPhone) {
      message.error('Vui lòng nhập email hoặc số điện thoại!')
      return
    }
    sendOtp({ emailOrPhone })
  }

  const onFinish = (values: ForgotPasswordFormValues) => {
    verifyOtp({
      emailOrPhone: values.emailOrPhone,
      otp: values.otp
    })
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
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email hoặc số điện thoại của bạn" size="large" />
          </Form.Item>
          <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
            <Input.Search
              placeholder="Nhập mã OTP"
              size="large"
              enterButton={
                <Button
                  type="primary"
                  onClick={handleSendOTP}
                  disabled={countdown > 0 || isSendingOtp}
                  loading={isSendingOtp && !otpSent}
                >
                  {countdown > 0 ? `Gửi OTP (${countdown}s)` : 'Gửi OTP'}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={isVerifyingOtp}>
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
export default ForgotPasswordPage
