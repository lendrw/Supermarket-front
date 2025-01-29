import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const userStorage = localStorage.getItem("user");

        if (userToken && userStorage) {
            const hasUser = JSON.parse(userStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const login = (email, senha) => {
        const userStorage = JSON.parse(localStorage.getItem("user"));

        const hasUser = userStorage?.filter((user) => user.email === email);

        if (hasUser?.length) {
            if (hasUser[0].email === email && hasUser[0].senha === senha) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("token", JSON.stringify({ email, token }));
                setUser({ email, password });
                return;
            } else {
                return "E-mail ou senha incorretos";
            }
        } else {
            return "Usuário não cadastrado";
        } 
    };

    const register = (nome, email, senha) => {
        const userStorage = JSON.parse(localStorage.getItem("user"));

        const hasUser = userStorage?.filter((user) => user.email === email);

        if (hasUser?.length) {
            return "Já há um usuário registrado com esse e-mail";
        }

        let newUser;

        if (userStorage) {
            newUser = [...userStorage, { nome, email, senha }];
        } else {
            newUser = [{ nome, email, senha}];
        }

        localStorage.setItem("user", JSON.stringify(newUser));
        return;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, login, register, logout }}
            >
                {children}
            </AuthContext.Provider>
            );
};

