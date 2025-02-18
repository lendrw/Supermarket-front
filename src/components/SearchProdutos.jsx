import React, { useState } from "react";
import useSearchProdutos from "../hooks/useSearchProdutos";

const SearchProdutos = () => {
  const [searchParams, setSearchParams] = useState({});
  const { loading, error, produtos } = useSearchProdutos(searchParams);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = {
      nome: formData.get("nome"),
      marca: formData.get("marca"),
      categoria: formData.get("categoria"),
    };
    setSearchParams(params);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="nome" placeholder="Nome" />
        <input type="text" name="marca" placeholder="Marca" />
        <input type="text" name="categoria" placeholder="Categoria" />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {Array.isArray(produtos) && produtos.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProdutos;