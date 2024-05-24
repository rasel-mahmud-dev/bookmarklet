import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtensionApp from './ExtensionApp';

// Create a container element
const container = document.createElement('div');
container.id = 'extension-app-container';
document.body.appendChild(container);

// Render the React component into the container
const root = ReactDOM.createRoot(container);
root.render(<ExtensionApp />);
