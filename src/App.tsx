import { AppProvider, useAppContext } from './context/AppContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Transfer } from './components/Transfer';
import { BotControl } from './components/BotControl';
import './App.css';

const AppContent = () => {
  const { currentScreen } = useAppContext();

  return (
    <>
      {currentScreen === 'login' && <Login />}
      {currentScreen === 'register' && <Register />}
      {currentScreen === 'transfer' && <Transfer />}
      <BotControl />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
