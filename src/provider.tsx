import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { COLORS } from './constants/colors'
import { queryClient } from './config/queryClient'
import viVN from 'antd/es/locale/vi_VN'
import { MESSAGE } from './constants/message'

type Props = {
  children?: React.ReactNode
}

export function QueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export function AntProvider({ children }: Props) {
  return (
    <ConfigProvider
      direction="ltr"
      locale={{ ...viVN }}
      form={{
        validateMessages: {
          required: MESSAGE.REQUIRED
        }
      }}
      pagination={{
        showSizeChanger: true
      }}
      theme={{
        token: {
          fontFamily: 'OpenSans500',
          colorText: COLORS.gray.text
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
