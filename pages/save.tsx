import { useState } from "react";

export default function SavePage() {
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    if (!filename || !content) {
      setStatus("❗ Bitte Dateiname und Inhalt ausfüllen.");
      return;
    }

    setStatus("⏳ Wird gespeichert...");

    try {
      const res = await fetch("/api/save-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Gespeichert als: ${data.filename}`);
      } else {
        setStatus(`❌ Fehler: ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Netzwerkwfehler oder API nicht erreichbar.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "3rem auto", fontFamily: "sans-serif" }}>
      <h1>🧠 Branchenanalyse speichern</h1>
      <label>Dateiname (.txt):</label>
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="z. B. maschinenbau_dach_2024.txt"
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      />
      <label>Inhalt:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        placeholder="Hier den Analyse-Text einfügen..."
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      />
      <button onClick={handleSave} style={{ padding: "10px 20px" }}>
        💾 Speichern
      </button>
      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}
