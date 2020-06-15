import React from 'react';
import Reading from './pages/reading/index.js';
import Sidebar from './components/sidebar/index.js';


import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Reading/>
    </div>
  );
}

export default App;
