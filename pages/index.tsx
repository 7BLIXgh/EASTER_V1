import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/save');
  }, []);
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎉 Branchenprofi ist live!</h1>
      <p><a href="/save">➡️ Zur Speichern-Oberfläche</a></p>
    </div>
  );
}
