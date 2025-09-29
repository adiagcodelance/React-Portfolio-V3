import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const ApiTest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testGetAPI = async () => {
    setLoading(true);
    try {
      const response = await client.get({
        apiName: 'portfolioBackend',
        path: '/api'
      });
      setResponse({ type: 'GET', data: response });
    } catch (error) {
      setResponse({ type: 'GET', error: error.message });
    }
    setLoading(false);
  };

  const testPostAPI = async () => {
    setLoading(true);
    try {
      const response = await client.post({
        apiName: 'portfolioBackend',
        path: '/api',
        options: {
          body: { message: 'Hello from React!', timestamp: new Date().toISOString() }
        }
      });
      setResponse({ type: 'POST', data: response });
    } catch (error) {
      setResponse({ type: 'POST', error: error.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h3>API Test Component</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={testGetAPI} disabled={loading} style={{ marginRight: '10px' }}>
          {loading ? 'Testing...' : 'Test GET'}
        </button>
        <button onClick={testPostAPI} disabled={loading}>
          {loading ? 'Testing...' : 'Test POST'}
        </button>
      </div>

      {response && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h4>{response.type} Response:</h4>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(response.data || response.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;