import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function ItemForm({ itemEdit, setItemEdit }) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [status, setStatus] = useState('Pendente');

  // Quando clicar no nome, preenche os campos
  useEffect(() => {
    if (itemEdit) {
      setNome(itemEdit.nome);
      setValor(itemEdit.valor);
      setObservacao(itemEdit.observacao || '');
      setStatus(itemEdit.status);
    }
  }, [itemEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !valor) return;

    if (itemEdit) {
      // Atualizar item existente
      const docRef = doc(db, 'items', itemEdit.id);
      await updateDoc(docRef, {
        nome,
        valor: parseFloat(valor),
        observacao,
        status,
      });
      setItemEdit(null); // limpa o modo de edição
    } else {
      // Cadastrar novo
      await addDoc(collection(db, 'items'), {
        nome,
        valor: parseFloat(valor),
        observacao,
        status,
        createdAt: serverTimestamp(),
      });
    }

    // Limpar campos
    setNome('');
    setValor('');
    setObservacao('');
    setStatus('Pendente');
  };

  const handleCancelEdit = () => {
    setItemEdit(null);
    setNome('');
    setValor('');
    setObservacao('');
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
      <input
        type="text"
        placeholder="Observação"
        value={observacao}
        onChange={(e) => setObservacao(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pendente">Pendente</option>
        <option value="Anunciado">Anunciado</option>
        <option value="Vendido">Vendido</option>
      </select>
      <button type="submit">{itemEdit ? 'Atualizar' : 'Cadastrar'}</button>
      {itemEdit && <button onClick={handleCancelEdit} type="button">Cancelar</button>}
    </form>
  );
}

export default ItemForm;
