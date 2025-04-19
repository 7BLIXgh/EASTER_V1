import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename, content } = req.body

  if (!filename || !content) {
    return res.status(400).json({ error: 'Missing filename or content' })
  }

  const { error } = await supabase.storage.from('branchen-doks').upload(
    `archiv/${filename}`,
    new Blob([content], { type: 'text/plain' }),
    { upsert: true, contentType: 'text/plain' }
  )

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ status: 'ok', filename })
}
