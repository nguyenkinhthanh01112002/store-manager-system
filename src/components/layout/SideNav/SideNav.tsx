import { HomeOutlined, ProductOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '~/constants/routePath'
import { getDefaultPath } from '~/utils/routeUtil'

const { Sider } = Layout

const SIDE_NAV: MenuProps['items'] = [
  {
    key: ROUTE_PATH.HOME,
    icon: <HomeOutlined />,
    label: <span className="font-openSans700">Trang chủ</span>
  },
  {
    key: ROUTE_PATH.STAFF.DEFAULT,
    icon: <UsergroupAddOutlined />,
    label: <span className="font-openSans700">Nhân viên</span>,
    children: [
      { key: ROUTE_PATH.STAFF.MANAGER.LIST, label: 'Quản lý nhân viên' },
      { key: ROUTE_PATH.STAFF.MANAGER.ADD, label: 'Thêm nhân viên mới' }
    ]
  },
  {
    key: ROUTE_PATH.PRODUCT.DEFAULT,
    icon: <ProductOutlined />,
    label: <span className="font-openSans700">Sản phẩm</span>,
    children: [
      { key: ROUTE_PATH.PRODUCT.MANAGER.LIST, label: 'Danh sách sản phẩm' },
      { key: ROUTE_PATH.PRODUCT.CATEGORY.LIST, label: 'Danh mục' }
    ]
  }
]

export function SideNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key)
  }

  return (
    <Sider width={220} className="shrink-0">
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={[getDefaultPath(pathname)]}
        style={{ height: '100%', borderRight: 0 }}
        items={SIDE_NAV}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}
