import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: auto;
    }
    
    * {
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(style);
} 