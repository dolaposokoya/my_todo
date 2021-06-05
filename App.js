
import React, { useEffect, useState } from 'react';
import Login from './src/Screens/Login/Index'
import { initializeApp } from './AppConfig';
import { TodoProvider } from './src/Context/TodoContext'

const App = () => {
  useEffect(() => {
    initializeApp()
  }, [])
  return (
    <TodoProvider>
      <Login />
    </TodoProvider>
  );
};



export default App;
