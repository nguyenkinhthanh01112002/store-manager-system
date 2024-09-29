import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BaseButton } from '../../../components/ui'
import { ROUTE_PATH } from '../../../constants/routePath'

function NotAuthorized() {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="Không có quyền truy cập"
      subTitle="Xin lỗi, bạn không được phép truy cập trang này"
      extra={
        <BaseButton className="mt-4" variant="outlined" onClick={() => navigate(ROUTE_PATH.HOME)}>
          Về Trang chủ
        </BaseButton>
      }
    />
  )
}

export default NotAuthorized
