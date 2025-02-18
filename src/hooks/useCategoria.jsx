import { useEffect, useState } from "react";
import api from '../services/api';

export const useCategoria = () => {
    const [categoria, setCategoria] = useState(null); // Estado para armazenar uma única categoria
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros
    const [cancelled, setCancelled] = useState(false); // Estado para verificar se o componente foi desmontado

    // Função para verificar se o componente foi desmontado
    function checkIfIsCancelled() {
        if (cancelled) {
            return true;
        }
        return false;
    }

    // Função para criar uma categoria
    const createCategoria = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const response = await api.post("/categoria/save", {
                nome: data.nome,
            });

            if (response.data) {
                setCategoria(response.data); // Atualiza o estado com a nova categoria criada
            }

        } catch (err) {
            checkIfIsCancelled();

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

                if (status === 409) {
                    setError("Já existe uma categoria com esse nome.");
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

    // Função para deletar uma categoria
    const deleteCategoria = async (id) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const response = await api.delete(`/categoria/${id}`);
            if (response.status === 200) {
                setCategoria(null); // Limpa o estado da categoria após a exclusão
            }
        } catch (err) {
            checkIfIsCancelled();

            if (err.response) {
                const { status, error, messages } = err.response.data;
                setError(messages?.join(", ") || error || "Erro ao deletar a categoria.");
            } else {
                console.error("Erro inesperado:", err);
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Função para atualizar uma categoria
    const updateCategoria = async (id, data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const response = await api.put(`/categoria/${id}`, {
                nome: data.nome,
            });

            if (response.data) {
                setCategoria(response.data); // Atualiza o estado com a categoria modificada
            }
        } catch (err) {
            checkIfIsCancelled();

            if (err.response) {
                const { status, error, messages } = err.response.data;
                setError(messages?.join(", ") || error || "Erro ao atualizar a categoria.");
            } else {
                console.error("Erro inesperado:", err);
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Função para buscar uma categoria por ID
    const getCategoria = async (id) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/categoria/${id}`);
            if (response.data) {
                setCategoria(response.data); // Atualiza o estado com a categoria buscada
            }
        } catch (err) {
            checkIfIsCancelled();

            if (err.response) {
                const { status, error, messages } = err.response.data;
                setError(messages?.join(", ") || error || "Erro ao buscar a categoria.");
            } else {
                console.error("Erro inesperado:", err);
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get('/categoria/all');
            
            if (response.status !== 200) {
              throw new Error('Erro ao carregar os categorias');
            }
    
            setCategorias(response.data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchData(); 
      }, []);

    // Efeito para cancelar operações quando o componente é desmontado
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        categorias,
        categoria,
        loading,
        error,
        createCategoria,
        deleteCategoria,
        updateCategoria,
        getCategoria,
    };
};