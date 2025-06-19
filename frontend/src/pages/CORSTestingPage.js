import React, { useState } from 'react';

function CORSTestingPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cors-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="container">
      <h2>Advanced CORS Testing (Python backend)</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter full target URL"
      />
      <button onClick={handleTest}>Run CORS Test</button>

      {result && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CORSTestingPage;
