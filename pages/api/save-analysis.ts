import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { filename, content } = req.body

    console.log("📥 Eingehender Request:", { filename, content })

    if (!filename || !content) {
      return res.status(400).json({ error: 'Missing filename or content' })
    }

    const upload = await supabase.storage.from('branchen-doks').upload(
      `archiv/${filename}`,
      Buffer.from(content, 'utf-8'),
      {
        contentType: 'text/plain',
        upsert: true
      }
    )

    if (upload.error) {
      console.error("❌ Upload error:", upload.error.message)
      return res.status(500).json({ error: upload.error.message })
    }

    return res.status(200).json({ status: 'ok', filename })
  } catch (err: any) {
    console.error("❌ Unerwarteter Fehler:", err.message)
    return res.status(500).json({ error: err.message || 'Unknown error' })
  }
}
