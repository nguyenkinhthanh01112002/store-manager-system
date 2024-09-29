import { Button, ButtonProps, ConfigProvider } from 'antd'
import { COLORS } from '../../../constants/colors'

interface IBaseButton extends ButtonProps {
  variant?: 'container' | 'outlined'
  color?: keyof typeof COLORS
}

export function BaseButton(props: IBaseButton) {
  const { variant = 'container', color = 'primary', ...rest } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLORS[color].DEFAULT
        }
      }}
    >
      <Button type="primary" ghost={variant === 'outlined'} {...rest} />
    </ConfigProvider>
  )
}
