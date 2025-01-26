import { useState, useEffect } from "react";
import api from "../services/api"; // Certifique-se de que api está configurado com axios

const useFetchProdutos = () => {
  const [loading, setLoading] = useState(true); // Inicia o loading como true
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos

  // Função para carregar os produtos
  const fetchProdutos = async () => {
    try {
      const response = await api.get("/produto/all"); // Requisição à API
      console.log("Resposta da API:", response); // Log da resposta completa
      setProdutos(response.data); // Armazena os produtos recebidos no estado
    } catch (err) {
      setError("Erro ao carregar os produtos"); // Armazena mensagem de erro
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  // Chama a função fetchProdutos assim que o componente for montado
  useEffect(() => {
    fetchProdutos();
  }, []); // O array vazio [] garante que seja chamado apenas uma vez na montagem

  return { loading, error, produtos }; // Retorna o estado para o componente
};

export default useFetchProdutos;
