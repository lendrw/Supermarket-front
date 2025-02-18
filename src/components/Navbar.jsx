import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  
  return (
    <div>
      <NavLink to='/'>
        Super<span>Market</span>
      </NavLink>
      <ul>
        <li>
          <NavLink to='/'>
            Home
          </NavLink>
        </li>
        {!auth.isAuthenticated && (
          <>
            <li>Você não está logado</li>
            <li>
              <NavLink to='/login'>Entrar</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Cadastrar</NavLink>
            </li>
          </>
        )}
        {auth.isAuthenticated && (
          <>
            <li>
              <span>Bem-vindo, {auth.user}!</span>
              <button onClick={logout}>Sair</button>
            </li>
            <li>
              <NavLink to='/kart'>Carrinho</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
