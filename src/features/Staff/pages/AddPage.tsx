import { Breadcrumb, Col, Flex, Form, Input, Row, Typography } from 'antd'
import { BaseButton } from '~/components/ui'

function AddPage() {
  const [form] = Form.useForm()

  return (
    <>
      <Breadcrumb
        className="my-4"
        items={[
          {
            title: 'Nhân viên'
          },
          {
            title: 'Thêm nhân viên mới'
          }
        ]}
      />
      <Flex gap="middle" vertical>
        <Typography.Title level={3} className="!mb-0">
          Thêm nhân viên mới
        </Typography.Title>
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Họ và tên" required>
                <Input placeholder="Nhập tên nhân viên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" required>
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Flex justify="center">
            <BaseButton>Thêm mới</BaseButton>
          </Flex>
        </Form>
      </Flex>
    </>
  )
}

export default AddPage
