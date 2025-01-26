import { useEffect, useState } from "react";
import { getImagemByProdutoId, downloadImagem } from "./imageService";

const ProdutoImagens = ({ produtoId }) => {
    const [imagens, setImagens] = useState([]);

    useEffect(() => {
        const fetchImagens = async () => {
            try {
                const response = await getImagemByProdutoId(produtoId);
                setImagens(response.data); // Supondo que a resposta seja um array de imagens
            } catch (error) {
                console.error("Erro ao carregar imagens:", error);
            }
        };

        fetchImagens();
    }, [produtoId]);

    const handleDownload = async (id) => {
        try {
            const response = await downloadImagem(id);
            const url = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `imagem_${id}.jpg`; // Nome da imagem
            link.click();
        } catch (error) {
            console.error("Erro ao baixar imagem:", error);
        }
    };

    return (
        <div>
            <h2>Imagens do Produto {produtoId}</h2>
            {imagens.map(imagem => (
                <div key={imagem.id}>
                    <img src={`data:image/jpeg;base64,${imagem.data}`} alt="Imagem" />
                    <button onClick={() => handleDownload(imagem.id)}>Baixar</button>
                </div>
            ))}
        </div>
    );
};

export default ProdutoImagens;
