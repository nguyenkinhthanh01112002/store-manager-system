import { BellOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Badge, Dropdown, Flex, Layout, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants/routePath'

const { Header } = Layout

const ACCOUNT_MENUS: MenuProps['items'] = [
  {
    label: <AccountInfo />,
    key: 'account-info',
    disabled: true
  },
  {
    type: 'divider'
  },
  {
    label: 'Thông tin cá nhân',
    key: '0',
    icon: <UserOutlined />
  },
  {
    label: 'Thay đổi mật khẩu',
    key: '1',
    icon: <KeyOutlined />
  },
  {
    type: 'divider'
  },
  {
    label: 'Đăng xuất',
    key: '3',
    icon: <LogoutOutlined />
  }
]

const DUMMY_NOTI: MenuProps['items'] = [
  {
    label: <NotiItem />,
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: <NotiItem />,
    key: '2'
  },
  {
    type: 'divider'
  }
]

function NotiItem() {
  return (
    <Flex vertical className="w-[220px]">
      <Typography.Text className="font-openSans700 text-sm">Thông báo mới</Typography.Text>
      <Typography.Text className="font-openSans400 text-xs mt-1">Nội dung thông báo mới</Typography.Text>
    </Flex>
  )
}

function AccountInfo() {
  return (
    <Flex align="center" justify="center" vertical className="pt-4 w-[240px] cursor-default">
      <Avatar className="bg-secondary mb-4 h-[80px] w-[80px] text-2xl" size="large">
        NN
      </Avatar>
      <Typography.Title level={5} className="!font-openSans700">
        Nguyễn Trọng Nhân
      </Typography.Title>
      <Typography.Text className="font-normal font-openSans400">admin@example.com</Typography.Text>
    </Flex>
  )
}

export function BaseHeader() {
  return (
    <Header className="flex items-center justify-between bg-white shadow-lg fixed z-10 w-full px-8">
      <Link to={ROUTE_PATH.HOME}>
        <div className="text-red text-3xl font-bold tracking-wide ml-8">SMS</div>
      </Link>
      <Flex align="center" justify="center">
        <Dropdown arrow menu={{ items: DUMMY_NOTI }} trigger={['click']} placement="bottomRight">
          <div className="pt-2 cursor-pointer mr-4 px-2">
            <Badge size="small" count={5} offset={[-2, 2]}>
              <BellOutlined className="text-[24px] text-primary" />
            </Badge>
          </div>
        </Dropdown>
        <Dropdown arrow menu={{ items: ACCOUNT_MENUS }} trigger={['click']} placement="bottomRight">
          <a onClick={(e) => e.preventDefault()} className="text-white">
            <Avatar className="bg-secondary" size="large">
              NN
            </Avatar>
          </a>
        </Dropdown>
      </Flex>
    </Header>
  )
}
