import { useState, useEffect } from 'react'
import { Flex, Card, Avatar, Typography, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants/routePath'
import { useMutation } from '@tanstack/react-query'
import authService from '~/services/auth.service'
import { VerifyOTPResponse } from '~/models/auth'
const { Title } = Typography

interface ForgotPasswordFormValues {
  emailOrPhone: string
  code: string  // Changed from 'otp' to 'code' to match API expectations
}

// function ForgotPasswordPage() {
//   const [form] = Form.useForm<ForgotPasswordFormValues>()
//   const navigate = useNavigate()
//   const [countdown, setCountdown] = useState(0)

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
//       return () => clearTimeout(timer)
//     }
//   }, [countdown])

//   const sendOTPMutation = useMutation({
//     mutationFn: (emailOrPhone: string) => authService.sendOTP(emailOrPhone),
//     onSuccess: () => {
//       message.success('Mã xác nhận đã được gửi!')
//       setCountdown(30)
//     },
//     onError: (error: any) => {
//       const errorMessage = error.response?.data?.errors?.EmailOrPhone?.[0] || 'Không thể gửi mã xác nhận. Vui lòng thử lại.'
//       message.error(errorMessage)
//     }
//   })

//   const verifyOTPMutation = useMutation({
//     mutationFn: (values: ForgotPasswordFormValues) => authService.verifyOTP(values),
//     onSuccess: (response) => {
//       console.log('Full response:', response)
//       if (response && typeof response === 'object') {
//         console.log('Response type:', typeof response)
//         console.log('Response keys:', Object.keys(response))
//         if ('verificationCode' in response) {
//           console.log('Verification code:', response.verificationCode)
//           message.success('Xác thực mã thành công!')
//           navigate(`${ROUTE_PATH.RESET_PASSWORD}?code=${response.verificationCode}`)
//         } else {
//           console.error('Missing verification code in response')
//           message.error('Không nhận được mã xác thực. Vui lòng thử lại.')
//         }
//       } else {
//         console.error('Response is not an object:', response)
//         message.error('Có lỗi xảy ra. Vui lòng thử lại.')
//       }
//     },
//     onError: (error: any) => {
//       console.error('Verify OTP Error:', error) // Log lỗi chi tiết
//       const errors = error.response?.data?.errors
//       if (errors) {
//         if (errors.Code) {
//           message.error(errors.Code[0])
//         } else {
//           Object.values(errors).forEach((err: any) => {
//             message.error(err[0])
//           })
//         }
//       } else {
//         message.error('Xác thực mã không thành công. Vui lòng thử lại.')
//       }
//     }
//   })

//   const handleSendOTP = () => {
//     const emailOrPhone = form.getFieldValue('emailOrPhone')
//     if (emailOrPhone) {
//       sendOTPMutation.mutate(emailOrPhone)
//     } else {
//       message.error('Vui lòng nhập email hoặc số điện thoại.')
//     }
//   }

//   const onFinish = (values: ForgotPasswordFormValues) => {
//     if (!values.emailOrPhone || !values.code) {
//       message.error('Vui lòng điền đầy đủ thông tin.')
//       return
//     }
//     verifyOTPMutation.mutate(values)
//   }

//   return (
//     <Flex justify="center" align="middle" className="min-h-screen bg-gray-100">
//       <Card className="w-[370px] shadow-lg">
//         <div className="text-center">
//           <Avatar size={64} icon={<UserOutlined />} className="bg-blue-500 mb-4" />
//           <Title level={3}>Quên mật khẩu</Title>
//         </div>
//         <Form<ForgotPasswordFormValues> form={form} onFinish={onFinish} layout="vertical">
//           <Form.Item
//             name="emailOrPhone"
//             rules={[
//               { required: true, message: 'Vui lòng nhập email hoặc số điện thoại!' },
//               { type: 'email', message: 'Email không hợp lệ!' }
//             ]}
//           >
//             <Input placeholder="Nhập email hoặc số điện thoại của bạn" size="large" />
//           </Form.Item>
//           <Form.Item name="code" rules={[{ required: true, message: 'Vui lòng nhập mã xác nhận!' }]}>
//             <Input.Search
//               placeholder="Nhập mã xác nhận"
//               size="large"
//               enterButton={
//                 <Button type="primary" onClick={handleSendOTP} disabled={countdown > 0 || sendOTPMutation.isPending}>
//                   {countdown > 0 ? `Gửi mã (${countdown}s)` : 'Gửi mã'}
//                 </Button>
//               }
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" size="large" block loading={verifyOTPMutation.isPending}>
//               Xác nhận
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </Flex>
//   )
// }

// export default ForgotPasswordPage


function ForgotPasswordPage() {
  const [form] = Form.useForm<ForgotPasswordFormValues>()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(0)
  const [isOtpSent, setIsOtpSent] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const sendOTPMutation = useMutation({
    mutationFn: (emailOrPhone: string) => authService.sendOTP(emailOrPhone),
    onSuccess: () => {
      message.success('Mã xác nhận đã được gửi!')
      setCountdown(30)
      setIsOtpSent(true)
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.errors?.EmailOrPhone?.[0] || 'Không thể gửi mã xác nhận. Vui lòng thử lại.'
      message.error(errorMessage)
    }
  })

  const verifyOTPMutation = useMutation({
    mutationFn: (values: ForgotPasswordFormValues) => authService.verifyOTP(values),
    onSuccess: (response: VerifyOTPResponse) => {
      console.log('Mutation onSuccess response:', response);
      if (response && response.code) {
        message.success('Xác thực mã thành công!')
        navigate(`${ROUTE_PATH.RESET_PASSWORD}?code=${response.code}`)
      } else {
        console.error('Response or code is undefined:', response);
        message.error('Có lỗi xảy ra. Vui lòng thử lại.')
      }
    },
    onError: (error: any) => {
      if (error.message === 'Invalid response format') {
        console.error('Invalid response format:', error);
        message.error('Định dạng phản hồi không hợp lệ. Vui lòng thử lại.');
      } else {
        const errors = error.response?.data?.errors
        if (errors) {
          Object.values(errors).forEach((err: any) => message.error(err[0]))
        } else {
          message.error('Xác thực mã không thành công. Vui lòng thử lại.')
        }
      }
    }
  })
  const handleSendOTP = () => {
    form.validateFields(['emailOrPhone']).then(values => {
      if (values.emailOrPhone) {
        sendOTPMutation.mutate(values.emailOrPhone)
      }
    }).catch(() => {
      message.error('Vui lòng nhập email hoặc số điện thoại hợp lệ.')
    })
  }

  const onFinish = (values: ForgotPasswordFormValues) => {
    if (isOtpSent) {
      if (!values.code) {
        message.error('Vui lòng nhập mã xác nhận.')
        return
      }
      verifyOTPMutation.mutate(values)
    } else {
      handleSendOTP()
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
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email hoặc số điện thoại của bạn" size="large" />
          </Form.Item>
          <Form.Item name="code" rules={[{ required: isOtpSent, message: 'Vui lòng nhập mã xác nhận!' }]}>
            <Input.Search
              placeholder="Nhập mã xác nhận"
              size="large"
              enterButton={
                <Button 
                  type="primary" 
                  onClick={handleSendOTP} 
                  disabled={countdown > 0 || sendOTPMutation.isPending}
                >
                  {countdown > 0 ? `Gửi mã (${countdown}s)` : 'Gửi mã'}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              block 
              loading={verifyOTPMutation.isPending || sendOTPMutation.isPending}
            >
              {isOtpSent ? 'Xác nhận' : 'Gửi mã xác nhận'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default ForgotPasswordPage

