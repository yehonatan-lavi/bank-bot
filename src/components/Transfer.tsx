import { useState, type FormEvent } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Transaction } from '../types';
import './Transfer.css';

export const Transfer = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { 
    currentUser, 
    setCurrentScreen, 
    setCurrentUser,
    getUserByUsername,
    addTransaction,
    updateUserBalance,
    users,
  } = useAppContext();

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!currentUser) {
      setError('User not logged in');
      return;
    }

    const recipientUser = getUserByUsername(recipient);
    if (!recipientUser) {
      setError('Recipient not found in the system');
      return;
    }

    if (recipientUser.id === currentUser.id) {
      setError('Cannot transfer money to yourself');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Invalid amount');
      return;
    }

    if (transferAmount > currentUser.balance) {
      setError('Insufficient funds in account');
      return;
    }

    // Executing transfer
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      fromUser: currentUser.username,
      toUser: recipientUser.username,
      amount: transferAmount,
      date: new Date(),
      description: description || 'Money transfer',
    };

    updateUserBalance(currentUser.id, currentUser.balance - transferAmount);
    updateUserBalance(recipientUser.id, recipientUser.balance + transferAmount);
    addTransaction(newTransaction);

    setSuccess(true);
    setRecipient('');
    setAmount('');
    setDescription('');

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="screen-container">
      <div className="form-card transfer-card">
        <div className="form-header">
          <h1>🏦 BioBank</h1>
          <h2>Money Transfer</h2>
        </div>

        <div className="user-info">
          <div className="user-greeting">
            <span>Hello, {currentUser.username}</span>
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary btn-small"
              data-testid="logout-button"
            >
              Logout
            </button>
          </div>
          <div className="balance">
            <span className="balance-label">Current Balance:</span>
            <span className="balance-amount">₪{currentUser.balance.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="transfer-recipient">Recipient Username</label>
            <input
              id="transfer-recipient"
              data-testid="transfer-recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter username"
              required
              list="users-list"
            />
            <datalist id="users-list">
              {users
                .filter(u => u.id !== currentUser.id)
                .map(u => (
                  <option key={u.id} value={u.username} />
                ))
              }
            </datalist>
          </div>

          <div className="form-group">
            <label htmlFor="transfer-amount">Amount to Transfer</label>
            <input
              id="transfer-amount"
              data-testid="transfer-amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="transfer-description">Description (Optional)</label>
            <input
              id="transfer-description"
              data-testid="transfer-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter transfer description"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Transfer completed successfully! ✓</div>}

          <button 
            type="submit" 
            className="btn btn-primary"
            data-testid="transfer-submit"
          >
            Transfer Money
          </button>
        </form>

        <div className="available-users">
          <h3>Available Users:</h3>
          <div className="users-list">
            {users
              .filter(u => u.id !== currentUser.id)
              .map(u => (
                <div key={u.id} className="user-item">
                  <span>{u.username}</span>
                  <span className="user-email">{u.email}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};


