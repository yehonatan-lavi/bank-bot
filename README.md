# 🏦 BioBank - Bank App with Automation Bot

A modern bank application built with React + TypeScript + Vite, featuring an advanced automation bot system for simulating user interactions.

## ✨ Features

### Screens
1. **Login Screen** - Login for existing users
2. **Register Screen** - Creating new users
3. **Transfer Screen** - Transferring funds between users

### Bot System 🤖
- **Full Automation** - Automatic field filling with typing simulation
- **Predefined Scenarios**:
  - Login with demo user
  - Register new user
  - Transfer money to user
  - Navigate between screens
- **Full Control** - Start, stop, and track bot status

### Modern Design
- Designed and user-friendly interface
- Smooth animations
- Responsive Design for all devices

## 🚀 Installation and Setup

### Prerequisites
- Node.js (version 18 and above)
- npm or yarn

### Installation

```bash
cd bank-bot
npm install
```

### Run in Development Mode

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage

### Demo Account
To get started quickly, use the demo account:
- **Username:** demo
- **Password:** demo123
- **Balance:** ₪10,000

### Using the Automation Bot

1. Click the bot button 🤖 in the bottom right corner
2. Select a scenario from the list:
   - **Login with demo user** - Automatic login
   - **Register new user** - Automatic new user creation
   - **Transfer money to user** - Automatic transfer (only from the Transfer screen)
   - **Go to register/login screen** - Navigate between screens
3. The bot will perform the actions automatically
4. You can stop the bot at any time

## 🏗️ Project Structure

```
bank-bot/
├── src/
│   ├── bot/
│   │   └── AutomationBot.ts       # Bot system
│   ├── components/
│   │   ├── Login.tsx              # Login screen
│   │   ├── Login.css
│   │   ├── Register.tsx           # Registration screen
│   │   ├── Transfer.tsx           # Money transfer screen
│   │   ├── Transfer.css
│   │   ├── BotControl.tsx         # Bot control
│   │   └── BotControl.css
│   ├── context/
│   │   └── AppContext.tsx         # Global state management
│   ├── types.ts                   # Type definitions
│   ├── App.tsx                    # Main component
│   ├── App.css
│   ├── main.tsx                   # Entry point
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Technologies

- **React 19** - UI library
- **TypeScript** - Typed programming language
- **Vite** - Fast build tool
- **Context API** - State management
- **CSS3** - Advanced design with animations

## 🎯 Technical Features

### Automation System
- Authentic typing simulation (character by character)
- Mouse event simulation (hover, click)
- Random wait times for more natural typing
- Triggering of all relevant events (input, change, focus, blur)

### State Management
- Context API for user and transaction management
- Real-time balance updates
- Transaction history tracking

### Security (Demo)
- Input field validation
- Balance check before transfer
- Prevent self-transfer

## 📝 Development Notes

### Adding a New Bot Scenario

Edit the file `src/bot/AutomationBot.ts` and add a new scenario to the `predefinedScenarios` array:

```typescript
{
  name: 'Scenario Name',
  actions: [
    { type: 'wait', delay: 1000 },
    { type: 'input', selector: '#field-id', value: 'value' },
    { type: 'click', selector: '[data-testid="button-id"]' },
  ],
}
```

### Available Bot Actions

- **wait** - Delay (in milliseconds)
- **input** - Fill text field
- **click** - Click an element

## 🤝 Contributing

The project is open for contributions! If you have ideas or improvements, feel free to create a Pull Request.

## 📄 License

MIT License - Free to use and modify.

## 📞 Contact

For questions or suggestions, open an Issue in the project.

---

**Created with ❤️ and AI**
