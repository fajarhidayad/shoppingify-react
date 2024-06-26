/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthItemsImport } from './routes/_auth/items'
import { Route as AuthHistoryImport } from './routes/_auth/history'
import { Route as AuthHistoryIdImport } from './routes/_auth/history.$id'

// Create Virtual Routes

const RegisterLazyImport = createFileRoute('/register')()
const LoginLazyImport = createFileRoute('/login')()
const AuthStatisticsLazyImport = createFileRoute('/_auth/statistics')()
const AuthHistoryIndexLazyImport = createFileRoute('/_auth/history/')()

// Create/Update Routes

const RegisterLazyRoute = RegisterLazyImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthStatisticsLazyRoute = AuthStatisticsLazyImport.update({
  path: '/statistics',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/statistics.lazy').then((d) => d.Route),
)

const AuthItemsRoute = AuthItemsImport.update({
  path: '/items',
  getParentRoute: () => AuthRoute,
} as any)

const AuthHistoryRoute = AuthHistoryImport.update({
  path: '/history',
  getParentRoute: () => AuthRoute,
} as any)

const AuthHistoryIndexLazyRoute = AuthHistoryIndexLazyImport.update({
  path: '/',
  getParentRoute: () => AuthHistoryRoute,
} as any).lazy(() =>
  import('./routes/_auth/history.index.lazy').then((d) => d.Route),
)

const AuthHistoryIdRoute = AuthHistoryIdImport.update({
  path: '/$id',
  getParentRoute: () => AuthHistoryRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/history': {
      id: '/_auth/history'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof AuthHistoryImport
      parentRoute: typeof AuthImport
    }
    '/_auth/items': {
      id: '/_auth/items'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof AuthItemsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/statistics': {
      id: '/_auth/statistics'
      path: '/statistics'
      fullPath: '/statistics'
      preLoaderRoute: typeof AuthStatisticsLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/history/$id': {
      id: '/_auth/history/$id'
      path: '/$id'
      fullPath: '/history/$id'
      preLoaderRoute: typeof AuthHistoryIdImport
      parentRoute: typeof AuthHistoryImport
    }
    '/_auth/history/': {
      id: '/_auth/history/'
      path: '/'
      fullPath: '/history/'
      preLoaderRoute: typeof AuthHistoryIndexLazyImport
      parentRoute: typeof AuthHistoryImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthHistoryRoute: AuthHistoryRoute.addChildren({
      AuthHistoryIdRoute,
      AuthHistoryIndexLazyRoute,
    }),
    AuthItemsRoute,
    AuthStatisticsLazyRoute,
  }),
  LoginLazyRoute,
  RegisterLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/history",
        "/_auth/items",
        "/_auth/statistics"
      ]
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/register": {
      "filePath": "register.lazy.tsx"
    },
    "/_auth/history": {
      "filePath": "_auth/history.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/history/$id",
        "/_auth/history/"
      ]
    },
    "/_auth/items": {
      "filePath": "_auth/items.tsx",
      "parent": "/_auth"
    },
    "/_auth/statistics": {
      "filePath": "_auth/statistics.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/history/$id": {
      "filePath": "_auth/history.$id.tsx",
      "parent": "/_auth/history"
    },
    "/_auth/history/": {
      "filePath": "_auth/history.index.lazy.tsx",
      "parent": "/_auth/history"
    }
  }
}
ROUTE_MANIFEST_END */
