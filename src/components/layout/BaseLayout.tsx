import { Layout, Typography } from 'antd'
import { Outlet } from 'react-router-dom'
import { BaseHeader } from './BaseHeader'
import { SideNav } from './SideNav'

export function BaseLayout() {
  return (
    <Layout>
      <BaseHeader />
      <Layout className="pt-16 h-dvh">
        <SideNav />
        <Layout className="px-6 pb-4 grow overflow-y-auto">
          <Outlet />
          <Typography.Text className="text-xs text-center mt-4">
            Thiết kế và phát triển bởi NTN Group ♥️
          </Typography.Text>
        </Layout>
      </Layout>
    </Layout>
  )
}
