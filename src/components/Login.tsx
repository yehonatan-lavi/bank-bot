import { useState, type FormEvent } from 'react';
import { useAppContext } from '../context/AppContext';
import './Login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setCurrentScreen, setCurrentUser, getUserByUsername } = useAppContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const user = getUserByUsername(username);
    if (!user) {
      setError('Username does not exist in the system');
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }

    setCurrentUser(user);
    setCurrentScreen('transfer');
  };

  return (
    <div className="screen-container">
      <div className="form-card">
        <div className="form-header">
          <h1>🏦 BioBank</h1>
          <h2>Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              data-testid="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              data-testid="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary"
            data-testid="login-submit"
          >
            Login
          </button>

          <div className="form-footer">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setCurrentScreen('register')}
              data-testid="goto-register"
            >
              Register now
            </button>
          </div>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Account:</strong></p>
          <p>Username: demo</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
};


