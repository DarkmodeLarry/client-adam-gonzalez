import { createTRPCRouter } from './trpc'
import { adminRouter } from './routers/admin'
import { menuRouter } from './routers/menu'
import { openingRouter } from './routers/opening'
import { s3Router } from './routers/s3'
// This is the primary router for your server.

// All routers added in /api/routers should be manually added here

export const appRouter = createTRPCRouter({
  menu: menuRouter,
  admin: adminRouter,
  opening: openingRouter,
  s3: s3Router
})

// export type definition of API
export type AppRouter = typeof appRouter
