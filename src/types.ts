export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  balance: number;
}

export interface Transaction {
  id: string;
  fromUser: string;
  toUser: string;
  amount: number;
  date: Date;
  description: string;
}

export type Screen = 'login' | 'register' | 'transfer';

export interface BotAction {
  type: 'input' | 'click' | 'wait';
  selector?: string;
  value?: string;
  delay?: number;
}

export interface BotScenario {
  name: string;
  actions: BotAction[];
}


