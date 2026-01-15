import { useState, type FormEvent } from 'react';
import { useAppContext } from '../context/AppContext';
import type { User } from '../types';
import './Login.css';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setCurrentScreen, addUser, getUserByUsername } = useAppContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (username.length < 3) {
      setError('Username must contain at least 3 characters');
      return;
    }

    if (getUserByUsername(username)) {
      setError('Username already exists in the system');
      return;
    }

    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
      balance: 5000, // Initial balance
    };

    addUser(newUser);
    setSuccess(true);

    setTimeout(() => {
      setCurrentScreen('login');
    }, 2000);
  };

  return (
    <div className="screen-container">
      <div className="form-card">
        <div className="form-header">
          <h1>🏦 BioBank</h1>
          <h2>Registration</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              data-testid="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username (at least 3 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              data-testid="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              data-testid="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password (at least 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <input
              id="register-confirm-password"
              data-testid="register-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter the password again"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Registration completed successfully! Redirecting to login...</div>}

          <button 
            type="submit" 
            className="btn btn-primary"
            data-testid="register-submit"
            disabled={success}
          >
            Register
          </button>

          <div className="form-footer">
            <p>Already have an account?</p>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setCurrentScreen('login')}
              data-testid="goto-login"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


