import { useState } from 'react'
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Dashboard from './components/Dashboard';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
      <h1>Meu Controle de Vendas</h1>
      <Dashboard />
      <ItemForm />
      <ItemList />
    </div>
    </>
  )
}

export default App
