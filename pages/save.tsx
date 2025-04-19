import { useState } from 'react'

export default function SaveAnalysisPage() {
  const [filename, setFilename] = useState('')
  const [content, setContent] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/save-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filename, content })
    })

    const data = await res.json()
    if (res.ok) {
      setResponse(`✅ Gespeichert als: ${data.filename}`)
    } else {
      setResponse(`❌ Fehler: ${data.error}`)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>📂 Analyse speichern</h1>

      <label>Dateiname (.txt):</label>
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>Inhalt:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
        Speichern
      </button>

      {response && <p style={{ marginTop: '1rem' }}>{response}</p>}
    </div>
  )
}
