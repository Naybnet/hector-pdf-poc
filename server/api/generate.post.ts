import { z } from 'zod'
import { permissions } from '~~/modules/permissions'

const inputSchema = z.object({
  name: z.string().default('sample.pdf'),
  role: z.enum(['admin', 'user']),
}).strict()

export type InputSchema = z.infer<typeof inputSchema>

export default defineEventHandler<{ body: InputSchema }>(async (event) => {
  // Schema validation
  const result = await readValidatedBody(event, body => inputSchema.safeParse(body))

  if (!result.success)
    throw result.error.issues

  const data = result.data

  // Security Check
  if (!permissions[data.role].export) {
    throw createError({ status: 403, statusMessage: 'forbidden', message: 'Request failed due to insufficient permissions' })
  }

  return { status: true, data }
})
