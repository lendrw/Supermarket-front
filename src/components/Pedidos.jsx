import { useEffect, useState } from "react";
import { getPedidosByUser, criarPedido, deletePedidosByUser } from "../services/produtoService";

const Pedidos = ({ userId }) => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await getPedidosByUser(userId);
                setPedidos(response.data); // Supondo que a resposta seja um array de pedidos
            } catch (error) {
                console.error("Erro ao carregar pedidos:", error);
            }
        };

        fetchPedidos();
    }, [userId]);

    const handleCriarPedido = async () => {
        const pedidoData = {
            // Dados do pedido a serem enviados
            produtos: [{ produtoId: 1, quantidade: 2 }],
            endereco: "Rua Exemplo, 123",
            metodoPagamento: "Cartão de Crédito",
        };

        try {
            await criarPedido(pedidoData);
            alert("Pedido criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
        }
    };

    const handleDeletarPedidos = async () => {
        try {
            await deletePedidosByUser(userId);
            setPedidos([]); // Limpar pedidos após a exclusão
            alert("Pedidos deletados com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar pedidos:", error);
        }
    };

    return (
        <div>
            <h2>Pedidos do Usuário {userId}</h2>
            <button onClick={handleCriarPedido}>Criar Pedido</button>
            <button onClick={handleDeletarPedidos}>Deletar Pedidos</button>
            {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                    <div key={pedido.id}>
                        <h3>Pedido ID: {pedido.id}</h3>
                        <p>Data: {pedido.data}</p>
                        <p>Status: {pedido.status}</p>
                        <ul>
                            {pedido.produtos.map((produto) => (
                                <li key={produto.id}>{produto.nome} - Quantidade: {produto.quantidade}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>Não há pedidos.</p>
            )}
        </div>
    );
};

export default Pedidos;
