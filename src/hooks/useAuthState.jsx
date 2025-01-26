import { useEffect, useState } from "react";
import api from "../services/api"; // Configuração da API com axios

const useAuthState = () => {
  const [user, setUser] = useState(undefined); // Estado do usuário
  const loadingUser = user === undefined; // Controle de carregamento do estado

  useEffect(() => {
    const checkAuthState = async () => {
      const token = localStorage.getItem("token"); // Obtém o token do localStorage
      const userId = localStorage.getItem("userId"); // Obtém o ID do usuário

      if (!token || !userId) {
        setUser(null); // Usuário não autenticado
        return;
      }

      try {
        // Faz a requisição ao backend para buscar os dados do usuário
        const response = await api.get(`/usuario/${userId}`);
        setUser(response.data); // Define o usuário com os dados retornados
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        localStorage.removeItem("token"); // Remove o token inválido
        localStorage.removeItem("userId"); // Remove o ID do usuário
        setUser(null); // Define usuário como não autenticado
      }
    };

    checkAuthState(); // Chama a função ao carregar o componente
  }, []);

  return { user, loadingUser };
};

export default useAuthState;
