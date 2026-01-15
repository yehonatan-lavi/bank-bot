import type { BotScenario } from '../types';

export class AutomationBot {
  private isRunning = false;
  private onComplete: (() => void) | null = null;
  private onError: ((error: string) => void) | null = null;

  async runScenario(
    scenario: BotScenario,
    onComplete?: () => void,
    onError?: (error: string) => void
  ) {
    if (this.isRunning) {
      onError?.('Bot is already running');
      return;
    }

    this.isRunning = true;
    this.onComplete = onComplete || null;
    this.onError = onError || null;

    try {
      for (const action of scenario.actions) {
        await this.executeAction(action);
      }
      this.onComplete?.();
    } catch (error) {
      this.onError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.isRunning = false;
    }
  }

  private async executeAction(action: any) {
    switch (action.type) {
      case 'wait':
        await this.wait(action.delay || 1000);
        break;

      case 'input':
        await this.fillInput(action.selector, action.value);
        break;

      case 'click':
        await this.clickElement(action.selector);
        break;

      default:
        throw new Error(`Unknown action: ${action.type}`);
    }
  }

  private async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fillInput(selector: string, value: string): Promise<void> {
    await this.wait(500); // Short wait before filling

    const element = document.querySelector(selector) as HTMLInputElement;
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    element.focus();
    
    // Clear the input in a way that React will notice
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(element, '');
    } else {
      element.value = '';
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));

    // Typing simulation character by character
    let currentValue = '';
    for (const char of value) {
      await this.wait(50 + Math.random() * 100); // Random typing time
      currentValue += char;
      
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(element, currentValue);
      } else {
        element.value = currentValue;
      }
      
      // Trigger input event for React to update its state
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Trigger final change and blur events
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.blur();
    await this.wait(300);
  }

  private async clickElement(selector: string): Promise<void> {
    await this.wait(500);

    const element = document.querySelector(selector) as HTMLElement;
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    // Mouse movement simulation
    const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
    element.dispatchEvent(mouseOverEvent);
    
    await this.wait(200);

    const clickEvent = new MouseEvent('click', { bubbles: true });
    element.dispatchEvent(clickEvent);

    element.click();
    
    await this.wait(500);
  }

  stop() {
    this.isRunning = false;
  }

  getIsRunning() {
    return this.isRunning;
  }
}

// Predefined scenarios
export const predefinedScenarios: BotScenario[] = [
  {
    name: 'Login with demo user',
    actions: [
      { type: 'wait', delay: 1000 },
      { type: 'input', selector: '#login-username', value: 'demo' },
      { type: 'wait', delay: 500 },
      { type: 'input', selector: '#login-password', value: 'demo123' },
      { type: 'wait', delay: 1500 },
      { type: 'click', selector: '[data-testid="login-submit"]' },
    ],
  },
  {
    name: 'Register new user',
    actions: [
      { type: 'wait', delay: 1000 },
      { type: 'input', selector: '#register-username', value: `user${Date.now()}` },
      { type: 'wait', delay: 500 },
      { type: 'input', selector: '#register-email', value: `user${Date.now()}@example.com` },
      { type: 'wait', delay: 500 },
      { type: 'input', selector: '#register-password', value: 'password123' },
      { type: 'wait', delay: 500 },
      { type: 'input', selector: '#register-confirm-password', value: 'password123' },
      { type: 'wait', delay: 500 },
      { type: 'click', selector: '[data-testid="register-submit"]' },
    ],
  },
  {
    name: 'Transfer money to user',
    actions: [
      { type: 'wait', delay: 1000 },
      { type: 'input', selector: '#transfer-recipient', value: 'demo' },
      { type: 'wait', delay: 500 },
      { type: 'input', selector: '#transfer-amount', value: '100' },
      { type: 'wait', delay: 500 },
      { type: 'input', selector: '#transfer-description', value: 'Test payment' },
      { type: 'wait', delay: 500 },
      { type: 'click', selector: '[data-testid="transfer-submit"]' },
    ],
  },
  {
    name: 'Go to register screen',
    actions: [
      { type: 'wait', delay: 1000 },
      { type: 'click', selector: '[data-testid="goto-register"]' },
    ],
  },
  {
    name: 'Go to login screen',
    actions: [
      { type: 'wait', delay: 1000 },
      { type: 'click', selector: '[data-testid="goto-login"]' },
    ],
  },
];


