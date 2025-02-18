import React from 'react';
import useFetchProdutos from '../hooks/useFetchProdutos';

const Produtos = () => {
  const { produtos, loading, error } = useFetchProdutos();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{produto.nome}</h2>
            <p><strong>Marca:</strong> {produto.marca}</p>
            <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
            <p><strong>Estoque:</strong> {produto.estoque} unidades</p>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>Disponível:</strong> {produto.disponivel ? 'Sim' : 'Não'}</p>

            <h3>Categorias:</h3>
            <ul>
              {produto.categorias.map((categoria) => (
                <li key={categoria.id}>{categoria.nome}</li>
              ))}
            </ul>

            <h3>Imagens:</h3>
            <ul>
              {produto.imagens.map((imagem) => (
                <li key={imagem.id}>
                  <p><strong>Nome do Arquivo:</strong> {imagem.nomeArquivo}</p>
                  <p><strong>Tipo do Arquivo:</strong> {imagem.tipoArquivo}</p>
                  <p><strong>URL de Download:</strong> <a href={imagem.urlDownload} target="_blank" rel="noopener noreferrer">Baixar</a></p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;