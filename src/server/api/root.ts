import { createTRPCRouter } from './trpc'
import { adminRouter } from './routers/admin'
import { menuRouter } from './routers/menu'
import { openingRouter } from './routers/opening'
import { checkoutRouter } from './routers/checkout'
// This is the primary router for your server.

// All routers added in /api/routers should be manually added here

export const appRouter = createTRPCRouter({
  menu: menuRouter,
  admin: adminRouter,
  opening: openingRouter,
  checkout: checkoutRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
