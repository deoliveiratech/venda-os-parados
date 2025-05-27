import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'items'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });
    return () => unsub();
  }, []);

  const total = items.reduce((sum, item) => sum + item.valor, 0);
  const totalVendido = items
    .filter((i) => i.status === 'Vendido')
    .reduce((sum, item) => sum + item.valor, 0);
  const totalPendente = items
    .filter((i) => i.status === 'Pendente')
    .reduce((sum, item) => sum + item.valor, 0);
  const totalAnunciado = items
    .filter((i) => i.status === 'Anunciado')
    .reduce((sum, item) => sum + item.valor, 0);

  return (
    <div className="dashboard">
      <div className="card">Total Geral: <strong>R$ {total.toFixed(2)}</strong></div>
      <div className="card">Vendido: <strong>R$ {totalVendido.toFixed(2)}</strong></div>
      <div className="card">Anunciado: <strong>R$ {totalAnunciado.toFixed(2)}</strong></div>
      <div className="card">Pendente: <strong>R$ {totalPendente.toFixed(2)}</strong></div>
    </div>
  );
}

export default Dashboard;
