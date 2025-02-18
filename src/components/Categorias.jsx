import React from 'react';
import { useCategoria } from '../hooks/useCategoria';

const Categorias = () => {
  const {
    categorias,
    categoria,
    loading,
    error,
    createCategoria,
    deleteCategoria,
    updateCategoria,
    getCategoria,
  } = useCategoria();

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Lista de Categorias</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{categoria.nome}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;