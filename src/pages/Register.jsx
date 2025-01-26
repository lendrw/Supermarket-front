import React, { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import styles from './Register.module.css';

const Register = () => {
  const { createUser, loading, error: authError } = useAuthentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); 
    
    const user = {
      nome,
      email,
      password
    }

    const res = await createUser(user);

    if (!error) {
      setError("");
      setEmail(""); 
      setPassword("");
      setNome("");
      setSuccess("Registro realizado com sucesso!"); 
    }

    if (!nome || !email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
        {success && !error && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default Register;
