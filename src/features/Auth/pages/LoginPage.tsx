import { UserOutlined } from '@ant-design/icons'
import { Checkbox, Flex, Form, Input, message, Typography } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { BaseButton } from '~/components/ui'
import { ROUTE_PATH } from '~/constants/routePath'
import { LoginRequest, LoginResponse } from '~/models/auth'
import authService from '~/services/auth.service'

function LoginPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { mutate: login, isPending: isPendingLogin } = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response: LoginResponse) => {
      console.log(response)
      localStorage.setItem('AccessToken', response.accessToken)
      localStorage.setItem('RefreshToken', response.refreshToken)
      messageApi.open({
        type: 'success',
        content: 'Đăng nhập thành công'
      })
      navigate(ROUTE_PATH.HOME)
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        messageApi.open({
          type: 'error',
          content: 'Sai tài khoản hoặc mật khẩu'
        })
      } else {
        messageApi.open({
          type: 'error',
          content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
        })
      }
    }
  })

  const [messageApi, contextHolder] = message.useMessage()

  const defaultValues = {
    emailOrPhone: '',
    password: '',
    remember: false
  }

  const handleForgotPassword = () => {
    navigate(ROUTE_PATH.FORGOT_PASSWORD);
  }

  const onFinish = (values: LoginRequest) => {
    login(values)
  }

  return (
    <Form form={form} onFinish={onFinish} initialValues={defaultValues}>
      {contextHolder}
      <Flex align="center" justify="center" className="bg-[#f7f8fc] w-screen h-screen bg-opacity-60">
        <Flex
          align="center"
          justify="center"
          vertical
          className="w-[370px] h-[512px] bg-white rounded-[10px] px-12 shadow-[0px_10px_34px_-15px_rgba(0,0,0,0.3)]"
        >
          <Flex align="center" justify="center" className="bg-primary w-[80px] h-[80px] rounded-full">
            <UserOutlined className="text-white text-[30px]" />
          </Flex>
          <Typography.Title level={3} className="mt-6">
            Đăng nhập
          </Typography.Title>
          <Form.Item
            name="emailOrPhone"
            className="w-full mt-4"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input size="large" placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item name="password" className="w-full" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>
          <BaseButton size="large" className="w-full" htmlType="submit" loading={isPendingLogin}>
            Đăng nhập
          </BaseButton>
          <Form.Item name="remember" valuePropName="checked">
            <Flex align="center" justify="space-between" className="mt-6">
              <Checkbox className="text-primary">Lưu đăng nhập</Checkbox>
              <BaseButton type="link" onClick={handleForgotPassword}>
                Quên mật khẩu?
              </BaseButton>
            </Flex>
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  )
}

export default LoginPage
