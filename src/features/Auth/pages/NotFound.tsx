import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BaseButton } from '../../../components/ui'
import { ROUTE_PATH } from '../../../constants/routePath'

function NotFound() {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="Không tìm thấy trang"
      subTitle="Xin lỗi, không tìm thấy trang bạn yêu cầu"
      extra={
        <BaseButton className="mt-4" variant="outlined" onClick={() => navigate(ROUTE_PATH.HOME)}>
          Về Trang chủ
        </BaseButton>
      }
    />
  )
}

export default NotFound
