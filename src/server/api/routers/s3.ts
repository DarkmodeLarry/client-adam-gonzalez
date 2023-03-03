import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'
import { env } from '../../../env/server.mjs'

export const s3Router = createTRPCRouter({
  getObjects: publicProcedure.query(async ({ ctx }) => {
    const { s3 } = ctx

    const listObjectsOutput = await s3.listObjectsV2({
      Bucket: env.AWS_BUCKET_NAME
    })

    return listObjectsOutput.Contents ?? []
  })
})
