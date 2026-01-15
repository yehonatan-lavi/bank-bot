import { useState } from 'react';
import { AutomationBot, predefinedScenarios } from '../bot/AutomationBot';
import './BotControl.css';

const bot = new AutomationBot();

export const BotControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const runScenario = (scenarioIndex: number) => {
    const scenario = predefinedScenarios[scenarioIndex];
    
    setMessage(`Running: ${scenario.name}...`);
    setMessageType('');
    setIsRunning(true);

    bot.runScenario(
      scenario,
      () => {
        setMessage(`✓ Completed: ${scenario.name}`);
        setMessageType('success');
        setIsRunning(false);
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 3000);
      },
      (error) => {
        setMessage(`✗ Error: ${error}`);
        setMessageType('error');
        setIsRunning(false);
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      }
    );
  };

  const stopBot = () => {
    bot.stop();
    setIsRunning(false);
    setMessage('Bot stopped');
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2000);
  };

  return (
    <>
      <button
        className="bot-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Bot Control"
      >
        🤖
      </button>

      {isOpen && (
        <div className="bot-control-panel">
          <div className="bot-header">
            <h3>🤖 Automation Bot Control</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {message && (
            <div className={`bot-message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="bot-scenarios">
            <h4>Available Scenarios:</h4>
            
            {predefinedScenarios.map((scenario, index) => (
              <button
                key={index}
                className="scenario-button"
                onClick={() => runScenario(index)}
                disabled={isRunning}
              >
                {scenario.name}
              </button>
            ))}

            {isRunning && (
              <button
                className="stop-button"
                onClick={stopBot}
              >
                ⏹ Stop Bot
              </button>
            )}
          </div>

          <div className="bot-info">
            <p><strong>Usage Instructions:</strong></p>
            <ul>
              <li>Choose a scenario from the list</li>
              <li>The bot will automatically fill the fields</li>
              <li>You can stop the bot at any time</li>
              <li>After completion, the bot will display a message</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};


