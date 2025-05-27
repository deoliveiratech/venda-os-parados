import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

function ItemForm() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Pendente');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !valor) return;

    await addDoc(collection(db, 'items'), {
      nome,
      valor: parseFloat(valor),
      status,
      createdAt: serverTimestamp(),
    });

    setNome('');
    setValor('');
    setStatus('Pendente');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Item"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pendente">Pendente</option>
        <option value="Anunciado">Anunciado</option>
        <option value="Vendido">Vendido</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default ItemForm;
