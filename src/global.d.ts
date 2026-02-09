export {};

declare global {
  interface Window {
    cdApi?: {
      setCustomerSessionId: (sessionId: string) => void;
    };
  }
}