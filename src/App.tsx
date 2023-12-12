import React, { useCallback } from 'react';
import './App.css';
import Map from './Map';

function App() {

  const onMapClick = useCallback((location:any) => {
    console.log(location)
  },[])

  return (
    <div className="App">
      <Map onClick={onMapClick}/>
    </div>
  );
}

export default App;
