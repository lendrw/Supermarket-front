import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
  const { user, logout } = useAuthentication();

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
        {!user && (
          <>
            <li>
              Você não está logado
            </li>
            <li>
              <NavLink to='/login'>
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink to='/register'>
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <span>Bem-vindo, {user}!</span>
              <button onClick={logout}>Sair</button>
            </li>
            <li>
              <NavLink to='/kart'>
                Carrinho
              </NavLink>
            </li>
          </>   
        )}
      </ul>
    </div>
  );
};

export default Navbar;
