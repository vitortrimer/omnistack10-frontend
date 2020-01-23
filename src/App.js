import React, { useState, useEffect } from 'react';

import api from './services/api';
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import './styles/global.css';
import './styles/app.css';
import './styles/main.css';
import './styles/sidebar.css';

function App() {
  
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    loadDevs()
  }, []) 

  async function onSubmit(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
       <DevForm onSubmit={onSubmit}/>
      </aside>
      <main>
        <ul>
          { devs.map(dev => (
           <DevItem dev={dev}  key={dev._id} />
          ))
          }
        </ul>
      </main>
    </div>
  )
}

export default App;
