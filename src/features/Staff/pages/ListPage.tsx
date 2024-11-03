import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Flex,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tabs,
  TabsProps,
  Tag,
  Typography
} from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { BaseButton } from '~/components/ui'
import { ROUTE_PATH } from '~/constants/routePath'
import { QUERY_KEY } from '~/constants/query'
import { getRoleDisplayName } from '~/utils/staff'
import staffService from '~/services/staff.service'

const columns: TableColumnsType = [
  { title: 'Email', dataIndex: 'email' },
  { title: 'Tên', dataIndex: 'name' },
  {
    title: 'Ngày sinh',
    dataIndex: 'dob'
  },
  {
    title: 'Vị trí',
    dataIndex: 'role',
    render: (_, { role }) => getRoleDisplayName(role)
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (_, { status }) => (
      <Tag color={status === 'active' ? 'green' : 'yellow'} key={status}>
        {status.toUpperCase()}
      </Tag>
    )
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    render: () => (
      <Space>
        <BaseButton size="small" variant="outlined" icon={<EditOutlined />} />
        <BaseButton size="small" variant="outlined" color="red" icon={<DeleteOutlined />} />
        <BaseButton size="small" variant="outlined" color="green" icon={<MoreOutlined />} />
      </Space>
    )
  }
]

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tất cả'
  },
  {
    key: '2',
    label: 'Đang hoạt động'
  },
  {
    key: '3',
    label: 'Đã khoá'
  }
]

function ListPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const navigate = useNavigate()

  const { data: staffs, isLoading: isLoadingStaffs } = useQuery({
    queryKey: [QUERY_KEY.STAFF.LIST],
    queryFn: () => staffService.getList()
  })

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <>
      <Breadcrumb
        className="my-4"
        items={[
          {
            title: 'Nhân viên'
          },
          {
            title: 'Quản lý nhân viên'
          }
        ]}
      />
      <Flex gap="middle" vertical>
        <Flex align="center" justify="space-between" gap="middle">
          <Typography.Title level={3} className="!mb-0">
            Danh sách nhân viên
          </Typography.Title>
          <BaseButton onClick={() => navigate(ROUTE_PATH.STAFF.MANAGER.ADD)}>Thêm nhân viên</BaseButton>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} tabBarStyle={{ marginBottom: 0 }} />
        <Flex vertical gap="middle" className="bg-white px-2 py-4 rounded-lg">
          <Space size="middle">
            <Input.Search placeholder="Tìm kiếm" allowClear className="w-[340px]" />
            <Select
              showSearch
              placeholder="Chọn quyền người dùng"
              optionFilterProp="label"
              className="w-[240px]"
              options={[
                {
                  value: 'manager',
                  label: 'Quản lý'
                },
                {
                  value: 'Staff',
                  label: 'Nhân viên'
                },
                {
                  value: 'admin',
                  label: 'Admin'
                }
              ]}
            />
            <BaseButton color="gray">Đặt lại</BaseButton>
          </Space>
          <Space size="middle">
            <Typography.Text>{`Đang chọn ${selectedRowKeys.length} dòng`}</Typography.Text>
            <BaseButton color="green" disabled={!hasSelected}>
              Mở khoá
            </BaseButton>
            <BaseButton color="yellow" disabled={!hasSelected}>
              Khoá
            </BaseButton>
            <Popconfirm okType="danger" title="Bạn có muốn xoá những mục đã chọn?" okText="Xác nhận" cancelText="Huỷ">
              <BaseButton color="red" disabled={!hasSelected}>
                Xoá
              </BaseButton>
            </Popconfirm>
          </Space>
        </Flex>
        <Table loading={isLoadingStaffs} rowSelection={rowSelection} columns={columns} dataSource={staffs} />
      </Flex>
    </>
  )
}

export default ListPage
