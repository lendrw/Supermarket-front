import React, { useEffect, useState } from "react";
import { getAllProdutos } from "../services/produtoService";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getAllProdutos()
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;
