import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useApplyTheme } from '@/shared/lib/theme/use-apply-theme'
import { Header } from '@/widgets/header/ui/header'

function RootLayout() {
  useApplyTheme()

  return (
    <div className="min-h-svh bg-bg-base text-fg">
      <Header />
      <Outlet />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      )}
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout
})
