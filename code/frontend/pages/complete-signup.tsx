import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CompleteSignup() {
  const [usernameOptions, setUsernameOptions] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/auth/signup-data', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('No verification data');
        return res.json();
      })
      .then(data => setUsernameOptions(data.usernameOptions))
      .catch(() => router.push('/'));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/finalize-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: selectedUsername, password, pin }),
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setRecoveryKey(data.recoveryKey);
      } else {
        alert('Signup failed: ' + data.error);
      }
    } catch (error) {
      alert('Signup failed');
    }
  };

  if (recoveryKey) {
    return (
      <div>
        <h1>Your Recovery Key</h1>
        <p>Save this key securely: <strong>{recoveryKey}</strong></p>
        <button onClick={() => navigator.clipboard.writeText(recoveryKey)}>Copy</button>
        <button onClick={() => router.push('/')}>Back to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Complete Your Sign-Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter PIN from Verification:</label><br />
        <input type="text" value={pin} onChange={e => setPin(e.target.value)} required /><br />
        <label>Select Username:</label><br />
        {usernameOptions.map(option => (
          <div key={option}>
            <input type="radio" name="username" value={option} onChange={() => setSelectedUsername(option)} required />
            {option}<br />
          </div>
        ))}
        <label>Password:</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Finish</button>
      </form>
    </div>
  );
}