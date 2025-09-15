'use client';

import React, { useState } from 'react';

export default function GLRSApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
            GLRS Recovery Connect
          </h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>GLRS Connect</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            Welcome to GLRS Recovery Connect!
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Your recovery journey starts here. This app will help you track your progress,
            connect with peers, and stay motivated.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Daily Check-ins
              </h3>
              <p style={{ color: '#6b7280' }}>Track your mood and progress</p>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Peer Connections
              </h3>
              <p style={{ color: '#6b7280' }}>Connect with recovery buddies</p>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Progress Tracking
              </h3>
              <p style={{ color: '#6b7280' }}>Celebrate your milestones</p>
            </div>
            
            <div style={{
              padding: '20px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Messages
              </h3>
              <p style={{ color: '#6b7280' }}>Stay connected with your support network</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
