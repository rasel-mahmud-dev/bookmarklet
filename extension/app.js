import React from 'react';
import ReactDOM from 'react-dom/client';
import ExtensionApp from './ExtensionApp';

const con = document.getElementById("extension-app-container")
if (con) {
    document.body.removeChild(con)
}

// Create a container element
const container = document.createElement('div');
container.id = 'extension-app-container';
document.body.appendChild(container);

// Inject the Font Awesome stylesheet
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
link.integrity = 'sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==';
link.crossOrigin = 'anonymous';
link.referrerPolicy = 'no-referrer';
container.appendChild(link);
document.head.appendChild(link);


// Render the React component into the container
const root = ReactDOM.createRoot(container);
root.render(<ExtensionApp/>);
