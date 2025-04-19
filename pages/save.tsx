import { useState } from 'react'

export default function SavePage() {
  const [filename, setFilename] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSave = async () => {
    if (!filename || !content) {
      setStatus('❗ Bitte Dateiname & Inhalt ausfüllen.')
      return
    }

    setLoading(true)
    setStatus(null)

    const res = await fetch('/api/save-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, content }),
    })

    const result = await res.json()
    setLoading(false)

    if (res.ok) {
      setStatus(`✅ Gespeichert als: ${result.filename}`)
      setFilename('')
      setContent('')
    } else {
      setStatus(`❌ Fehler: ${result.error || 'Unbekannter Fehler'}`)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '3rem auto', fontFamily: 'sans-serif' }}>
      <h1>🧠 Branchenprofi – Analyse speichern</h1>

      <label>📄 Dateiname (.txt):</label>
      <input
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="z. B. maschinenbau_dach_2024.txt"
        style={{ width: '100%', padding: '12px', fontSize: '1rem', marginBottom: '1rem' }}
      />

      <label>📝 Analyse-Inhalt:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        placeholder="Hier den Analyse-Text einfügen…"
        style={{ width: '100%', padding: '12px', fontSize: '1rem', fontFamily: 'monospace' }}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          marginTop: '2rem',
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        {loading ? '💾 Speichern…' : '💾 Speichern'}
      </button>

      {status && (
        <p style={{ marginTop: '1rem', color: status.startsWith('✅') ? 'green' : 'red' }}>{status}</p>
      )}
    </div>
  )
}
