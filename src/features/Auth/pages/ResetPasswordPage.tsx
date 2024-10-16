import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Flex, Form, Input, Typography, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BaseButton } from '~/components/ui'
import { ROUTE_PATH } from '~/constants/routePath'
import { useMutation } from '@tanstack/react-query'
import authService from '~/services/auth.service'
type ResetPasswordForm = {
  newPassword: string
  confirmPassword: string
}

function ResetPasswordPage() {
  const [form] = Form.useForm<ResetPasswordForm>()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  // Lấy code từ URL
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  console.log('Code from URL:', code)
 
  const resetPasswordMutation = useMutation({
    mutationFn: (values: { newPassword: string; confirmPassword: string }) => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (!code) {
        throw new Error('Missing reset code');
      }
      return authService.resetPassword(values, code);
    },
    onSuccess: (data) => {
      message.success(data.message || 'Đặt lại mật khẩu thành công!');
      navigate(ROUTE_PATH.LOGIN);
    },
    onError: (error: any) => {
      console.error('Reset password mutation error:', error);
      switch (error.message) {
        case 'Verification code is required.':
          message.error('Mã xác thực là bắt buộc.');
          navigate(ROUTE_PATH.FORGOT_PASSWORD);
          break;
        case 'Invalid verification code.':
          message.error('Mã xác thực không hợp lệ.');
          navigate(ROUTE_PATH.FORGOT_PASSWORD);
          break;
        case 'Verification code has expired.':
          message.error('Mã xác thực đã hết hạn.');
          navigate(ROUTE_PATH.FORGOT_PASSWORD);
          break;
        default:
          message.error(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.');
      }
    }
  });
  const onFinish = async (values: ResetPasswordForm) => {
    resetPasswordMutation.mutate(values)
    console.log('Submitted:', values)
    // Implement your logic here
    await messageApi.success('Mật khẩu đã được đặt lại thành công.')
    navigate(ROUTE_PATH.LOGIN)
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
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" placeholder="Mật khẩu mới" />
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
                }
              })
            ]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <BaseButton size="large" className="w-full mt-4" htmlType="submit">
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
