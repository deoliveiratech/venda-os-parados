import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'items'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'items', id), { status });
  };

  return (
    <div className="list">
      <h2>Itens Cadastrados</h2>
      {items.map((item) => (
        <div key={item.id} className="list-item">
          <strong>{item.nome}</strong> - R$ {item.valor.toFixed(2)} 
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Anunciado">Anunciado</option>
            <option value="Vendido">Vendido</option>
          </select>
          <button onClick={() => handleDelete(item.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
