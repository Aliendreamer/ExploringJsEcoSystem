import React from 'react'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
import './index.css'
import App from './App'
import { init } from '@noriginmedia/norigin-spatial-navigation';
init({
	debug:true,
	visualDebug:false,
	throttle:100,
	throttleKeypresses:true
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
