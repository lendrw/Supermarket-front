import React, { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import styles from "./Login.module.css"; 

const Login = () => {
  const { login, loading, error: authError } = useAuthentication();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    setError(""); 

    const user = { email, senha };

    try {
      const res = await login(user);

      if (res?.status === 200) {
        setEmail("");
        setSenha("");
        console.log("Login realizado com sucesso!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Erro ao realizar login.");
      } else {
        setError("Erro inesperado. Tente novamente mais tarde.");
      }
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Fazendo Login..." : "Entrar"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
