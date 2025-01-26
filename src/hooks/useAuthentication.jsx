import { useState } from "react";
import api from "../services/api"; 

export const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if(cancelled) {
        return;
    }
}

const createUser = async (data) => {
  checkIfIsCancelled();

  setLoading(true);
  setError(null);

  try {
    console.log("Dados enviados para o backend:", {
      email: data.email,
      nome: data.nome,
      password: data.password,
    });

    const response = await api.post("/auth/registrar", {
      email: data.email,
      nome: data.nome,
      password: data.password,
    });

    const { user, token } = response.data;

    localStorage.setItem("token", token);

    setUser(user);

    console.log("Usuário criado com sucesso:");

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
        setError("Já existe um usuário cadastrado com este e-mail.");
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

  const login = async (data) => {
    checkIfIsCancelled();
  
    setLoading(true);
    setError(null);
  
    try {
      console.log("Dados enviados para o backend:", {
        email: data.email,
        senha: data.senha,
      });
  
      const response = await api.post("/auth/login", {
        email: data.email,
        senha: data.senha,
      });
  
      const { nome, token } = response.data;
  
      localStorage.setItem("token", token);
  
      setUser({ nome });
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
  

  const logout = () => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      localStorage.removeItem("token");

      setUser(null);
    } catch (err) {
      setError("Erro ao fazer logout. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    createUser,
    login,
    logout,
    loading,
    error,
  };
};
