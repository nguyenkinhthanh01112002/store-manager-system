import { UserOutlined } from '@ant-design/icons'
import { Checkbox, Flex, Form, Input, message, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BaseButton } from '~/components/ui'
import { ROUTE_PATH } from '~/constants/routePath'

type LoginForm = {
  username: string
  password: string
  remember?: boolean
}

function LoginPage() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage()

  const defaultValues = {
    username: '',
    password: '',
    remember: false
  }

  const onFinish = (values: LoginForm) => {
    console.log('Success:', values)
    if (values.username === 'username' && values.password === 'password') {
      navigate(ROUTE_PATH.HOME)
    } else {
      messageApi.open({
        type: 'error',
        content: 'Sai tài khoản hoặc mật khẩu'
      })
    }
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
            name="username"
            className="w-full mt-4"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input size="large" placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item name="password" className="w-full" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password size="large" placeholder="Mật khẩu" />
          </Form.Item>
          <BaseButton size="large" className="w-full" htmlType="submit">
            Đăng nhập
          </BaseButton>
          <Form.Item name="remember" valuePropName="checked">
            <Flex align="center" justify="space-between" className="mt-6">
              <Checkbox className="text-primary">Lưu đăng nhập</Checkbox>
              <BaseButton type="link">Quên mật khẩu?</BaseButton>
            </Flex>
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  )
}

export default LoginPage
