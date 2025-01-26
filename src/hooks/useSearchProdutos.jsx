import { useState, useEffect } from "react";
import api from "../services/api";

const useSearchProdutos = (params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [produtos, setProdutos] = useState([]);

  const searchProdutos = async () => {
    if (!params) return;

    setLoading(true);
    setError(null);

    try {
      let url = "/supermarket/produto";
      let queryParams = {};

      if (params.nome && params.marca && params.categoria) {
        url = "/supermarket/produto/by-categoria-nome";
        queryParams = { categoria: params.categoria, nome: params.nome };
      } else if (params.nome && params.marca) {
        url = "/supermarket/produto/by-marca-and-nome";
        queryParams = { nome: params.nome, marca: params.marca };
      } else if (params.nome) {
        url = "/supermarket/produto/by-nome";
        queryParams = { nome: params.nome };
      } else if (params.marca) {
        url = "/supermarket/produto/by-marca";
        queryParams = { marca: params.marca };
      }

      const response = await api.get(url, { params: queryParams });
      setProdutos(response.data);
    } catch (err) {
      setError("Erro ao realizar a busca");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProdutos();
  }, [params]);

  return { loading, error, produtos };
};

export default useSearchProdutos;
