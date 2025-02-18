import { useState, useEffect, useRef } from "react";
import api from "../services/api";

const useSearchProdutos = (params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const abortControllerRef = useRef(null);

  const buildUrlAndParams = (params) => {
    let url = "/produto/by-nome";
    let queryParams = {};

    if (params.nome && params.marca && params.categoria) {
      url = "/produto/by-categoria-nome";
      queryParams = { categoria: params.categoria, nome: params.nome };
    } else if (params.nome && params.marca) {
      url = "/produto/by-marca-and-nome";
      queryParams = { nome: params.nome, marca: params.marca };
    } else if (params.nome) {
      url = "/produto/by-nome";
      queryParams = { nome: params.nome };
    } else if (params.marca) {
      url = "/produto/by-marca";
      queryParams = { marca: params.marca };
    }

    return { url, queryParams };
  };

  const searchProdutos = async () => {
    if (!params || Object.keys(params).length === 0) return;

    // Cancela a requisição anterior, se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Cria um novo AbortController para a requisição atual
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const { url, queryParams } = buildUrlAndParams(params);

      const response = await api.get(url, {
        params: queryParams,
        signal: abortControllerRef.current.signal,
      });

      setProdutos(response.data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.response?.data?.mensagem || "Erro ao realizar a busca");
      }

      if (err.response) {
        const { timestamp, status, error, path, messages } = err.response.data;

        console.error("Detalhes do erro:");
        console.log({
          timestamp,
          status,
          error,
          path,
          messages,
        });

        if (status === 400) {
          setError("Ocorreu um erro");
        } else {
          setError(messages?.join(", ") || error || "Ocorreu um erro, tente novamente mais tarde.");
        }
        
      } else {
        console.error("Erro inesperado:", err);
        setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchProdutos();

    // Cancela a requisição se o componente for desmontado ou os parâmetros mudarem
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [params]); // Dependência direta de `params`, sem JSON.stringify

  return { loading, error, produtos };
};

export default useSearchProdutos;