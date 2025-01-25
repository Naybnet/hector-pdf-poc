import { z } from 'zod'
import { generatePdf } from '../services/generate-pdf'
import { permissions } from '~~/domains/permissions'

const inputSchema = z.object({
  name: z.string().default('sample.pdf'),
  role: z.enum(['admin', 'user']),
}).strict()

export type InputSchema = z.infer<typeof inputSchema>

export default defineEventHandler(async (event) => {
  // Schema validation
  const result = await readValidatedBody(event, body => inputSchema.safeParse(body))

  if (!result.success)
    throw result.error.issues

  const data = result.data

  // Security Check
  if (!permissions[data.role].export) {
    throw createError({ status: 403, statusMessage: 'forbidden', message: 'Request failed due to insufficient permissions' })
  }

  const buffer = await generatePdf(data.name)
  setHeader(event, 'Content-Disposition', `filename=${data.name}`)
  setHeader(event, 'Content-Type', 'application/pdf')

  return buffer
})
