import { Spin } from 'antd'
import React, { Fragment, Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { RouteItem } from '~/models/routes'
import { ROUTE_PATH } from '~/constants/routePath'
import { BaseLayout } from '~/components/layout'

const routes: RouteItem[] = [
  {
    path: ROUTE_PATH.LOGIN,
    component: React.lazy(() => import('~/features/Auth/pages/LoginPage'))
  },
  {
    path: ROUTE_PATH.FORGOT_PASSWORD,
    component: React.lazy(() => import('../features/Auth/pages/ForgotPasswordPage'))
  },
  {
    path: ROUTE_PATH.RESET_PASSWORD,
    component: React.lazy(() => import('../features/Auth/pages/ResetPasswordPage'))
  },
  {
    path: ROUTE_PATH.FORGOT_PASSWORD,
    component: React.lazy(() => import('../features/Auth/pages/ForgotPasswordPage'))
  },
  {
    path: ROUTE_PATH.RESET_PASSWORD,
    component: React.lazy(() => import('../features/Auth/pages/ResetPasswordPage'))
  },
  {
    path: ROUTE_PATH.NOT_FOUND,
    component: React.lazy(() => import('~/features/Auth/pages/NotFound'))
  },
  {
    path: ROUTE_PATH.NOT_AUTHORIZED,
    component: React.lazy(() => import('~/features/Auth/pages/NotAuthorized'))
  },
  {
    path: '/',
    component: BaseLayout,
    routes: [
      {
        path: ROUTE_PATH.HOME,
        component: React.lazy(() => import('~/features/Home/pages/HomePage'))
      },
      // Staff
      {
        path: ROUTE_PATH.STAFF.MANAGER.LIST,
        component: React.lazy(() => import('~/features/Staff/pages/ListPage'))
      },
      {
        path: ROUTE_PATH.STAFF.MANAGER.ADD,
        component: React.lazy(() => import('~/features/Staff/pages/AddPage'))
      },
      // Category
      {
        path: ROUTE_PATH.PRODUCT.CATEGORY.LIST,
        component: React.lazy(() => import('~/features/Product/pages/ListPage'))
      }
    ]
  },
  {
    path: '*',
    component: React.lazy(() => import('~/features/Auth/pages/NotFound'))
  }
]

const renderRoutes = (routes: Array<RouteItem>) => {
  return routes?.map((route: RouteItem, index: number) => {
    const Component = route.component
    const Guard = route.guard || Fragment

    return (
      <Route
        key={`routes-${index}`}
        path={route.path}
        element={
          <Guard>
            <Suspense fallback={<Spin className="flex justify-center items-center h-full" />}>
              <Component />
            </Suspense>
          </Guard>
        }
      >
        {route.routes && renderRoutes(route.routes)}
      </Route>
    )
  })
}

function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  )
}

export default RoutesList
