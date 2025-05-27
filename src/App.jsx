import { useState } from 'react'
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Dashboard from './components/Dashboard';
import './App.css'

function App() {
  const [itemEdit, setItemEdit] = useState(null);

  return (
    <>
      <div className="container">
      <h1>VendaOsParadosApp</h1>
      <Dashboard />
      <ItemForm itemEdit={itemEdit} setItemEdit={setItemEdit} />
      <ItemList setItemEdit={setItemEdit} />
    </div>
    </>
  )
}

export default App
