import React from 'react';
import axios from 'axios';
function App() {
  const getImageFromNet = async ()=>{
      await axios.get()
  }
  return (
    <div className="App">
      <img alt="testing" src={getImageFromNet}></img>
    </div>
  );
}

export default App;
