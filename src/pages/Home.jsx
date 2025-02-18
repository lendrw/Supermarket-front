import Produtos from '../components/Produtos';
import Categorias from '../components/Categorias';
import SearchProdutos from '../components/SearchProdutos';

const Home = () => {

    return (
      <div>
        <h2>Bem-vindo ao Supermarket!</h2>
        <SearchProdutos/>
        <Categorias/>
        <Produtos/>
      </div>
    );
  };
  
  export default Home;
  