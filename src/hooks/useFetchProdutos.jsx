import { useState, useEffect } from 'react';
import api from '../services/api'; 

const useFetchProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/produto/all');
        
        if (response.status !== 200) {
          throw new Error('Erro ao carregar os produtos');
        }

        setProdutos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  return { produtos, loading, error };
};

export default useFetchProdutos;