import { Breadcrumb } from 'antd'

function HomePage() {
  return (
    <>
      <Breadcrumb
        className="my-4"
        items={[
          {
            title: 'Trang chủ'
          }
        ]}
      />
      This is Home page content
    </>
  )
}

export default HomePage
