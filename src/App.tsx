import { AppProvider, useAppContext } from './context/AppContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Transfer } from './components/Transfer';
import { BotControl } from './components/BotControl';
import './App.css';
import {useEffect} from "react";

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
  useEffect(() => {
    const initBioCatch = () => {
      const sessionId = `session_${Math.random().toString(36).substr(2, 9)}`;

      if (window.cdApi) {
        window.cdApi.setCustomerSessionId(sessionId);
        console.log("BioCatch CSID initialized:", sessionId);
      } else {
        //setTimeout(initBioCatch, 500);
          console.log("BioCatch API not available");
      }
    };

    initBioCatch();
  }, []);
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
