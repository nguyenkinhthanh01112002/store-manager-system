import { useState, useEffect } from 'react'
import { Card, Avatar, Typography, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../constants/routePath'

const { Title } = Typography

interface ForgotPasswordFormValues {
  email: string
  otp: string
}

function ForgotPasswordPage() {
  const [form] = Form.useForm<ForgotPasswordFormValues>()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOTP = () => {
    setCountdown(30)
    message.success('Mã OTP đã được gửi.')
  }

  const onFinish = (values: ForgotPasswordFormValues) => {
    console.log('Received values:', values)
    navigate(ROUTE_PATH.RESET_PASSWORD)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg">
        <div className="text-center">
          <Avatar size={64} icon={<UserOutlined />} className="bg-blue-500 mb-4" />
          <Title level={3}>Quên mật khẩu</Title>
        </div>
        <Form<ForgotPasswordFormValues> form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email của bạn" size="large" />
          </Form.Item>
          <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
            <Input.Search
              placeholder="Nhập mã OTP"
              size="large"
              enterButton={
                <Button type="primary" onClick={handleSendOTP} disabled={countdown > 0}>
                  {countdown > 0 ? `Gửi OTP (${countdown}s)` : 'Gửi OTP'}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage