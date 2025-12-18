
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("ShopncarT: Initializing application...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("ShopncarT: Root element #root not found in DOM.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("ShopncarT: Application successfully mounted.");
} catch (error) {
  console.error("ShopncarT: Fatal error during mounting:", error);
}
