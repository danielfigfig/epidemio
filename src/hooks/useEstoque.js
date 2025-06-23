import { useState, useEffect } from 'react';
import { mockVacinasSerum, mockMovimentacoes } from '../lib/mockData';

export const useEstoque = () => {
  const [itens, setItens] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setItens(mockVacinasSerum);
      setMovimentacoes(mockMovimentacoes);
      setLoading(false);
    }, 500);
  }, []);

  const adicionarItem = (novoItem) => {
    const itemComId = {
      ...novoItem,
      id: Date.now().toString()
    };
    setItens(prev => [...prev, itemComId]);
    
    // Registrar movimentação de entrada
    const movimentacao = {
      id: Date.now().toString() + '_mov',
      vacinaSerumId: itemComId.id,
      tipo: 'entrada',
      quantidade: novoItem.quantidadeAtual,
      data: new Date().toISOString().split('T')[0],
      responsavel: 'Sistema',
      observacoes: 'Item adicionado ao estoque',
      lote: novoItem.lote
    };
    setMovimentacoes(prev => [...prev, movimentacao]);
    
    return itemComId;
  };

  const editarItem = (itemEditado) => {
    setItens(prev => prev.map(item => 
      item.id === itemEditado.id ? itemEditado : item
    ));
    
    // Registrar movimentação de ajuste se a quantidade mudou
    const itemOriginal = itens.find(item => item.id === itemEditado.id);
    if (itemOriginal && itemOriginal.quantidadeAtual !== itemEditado.quantidadeAtual) {
      const diferenca = itemEditado.quantidadeAtual - itemOriginal.quantidadeAtual;
      const movimentacao = {
        id: Date.now().toString() + '_mov',
        vacinaSerumId: itemEditado.id,
        tipo: diferenca > 0 ? 'entrada' : 'saida',
        quantidade: Math.abs(diferenca),
        data: new Date().toISOString().split('T')[0],
        responsavel: 'Sistema',
        observacoes: 'Ajuste de estoque',
        lote: itemEditado.lote
      };
      setMovimentacoes(prev => [...prev, movimentacao]);
    }
    
    return itemEditado;
  };

  const excluirItem = (itemId) => {
    setItens(prev => prev.filter(item => item.id !== itemId));
    
    // Registrar movimentação de exclusão
    const item = itens.find(i => i.id === itemId);
    if (item) {
      const movimentacao = {
        id: Date.now().toString() + '_mov',
        vacinaSerumId: itemId,
        tipo: 'saida',
        quantidade: item.quantidadeAtual,
        data: new Date().toISOString().split('T')[0],
        responsavel: 'Sistema',
        observacoes: 'Item removido do estoque',
        lote: item.lote
      };
      setMovimentacoes(prev => [...prev, movimentacao]);
    }
    
    return true;
  };

  const registrarMovimentacao = (movimentacao) => {
    const novaMovimentacao = {
      ...movimentacao,
      id: Date.now().toString()
    };
    
    setMovimentacoes(prev => [...prev, novaMovimentacao]);
    
    // Atualizar quantidade do item
    setItens(prev => prev.map(item => {
      if (item.id === movimentacao.vacinaSerumId) {
        const novaQuantidade = movimentacao.tipo === 'entrada' 
          ? item.quantidadeAtual + movimentacao.quantidade
          : item.quantidadeAtual - movimentacao.quantidade;
        
        // Determinar novo status baseado na quantidade
        let novoStatus = 'ativo';
        if (novaQuantidade === 0) {
          novoStatus = 'sem_estoque';
        } else if (novaQuantidade <= 5) {
          novoStatus = 'baixo_estoque';
        }
        
        return {
          ...item,
          quantidadeAtual: Math.max(0, novaQuantidade),
          quantidadeReal: Math.max(0, novaQuantidade),
          status: novoStatus,
          ultimaConferencia: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
        };
      }
      return item;
    }));
    
    return novaMovimentacao;
  };

  const obterEstatisticas = () => {
    const totalItens = itens.length;
    const itensAtivos = itens.filter(item => item.status === 'ativo').length;
    const itensVencendo = itens.filter(item => item.status === 'vencendo').length;
    const itensVencidos = itens.filter(item => item.status === 'vencido').length;
    const itensBaixoEstoque = itens.filter(item => item.status === 'baixo_estoque').length;
    const itensSemEstoque = itens.filter(item => item.status === 'sem_estoque').length;
    const totalDoses = itens.reduce((total, item) => total + item.quantidadeAtual, 0);
    const itensComEstoque = itens.filter(item => item.quantidadeAtual > 0).length;
    const taxaDisponibilidade = totalItens > 0 ? Math.round((itensComEstoque / totalItens) * 100) : 0;

    return {
      totalItens,
      itensAtivos,
      itensVencendo,
      itensVencidos,
      itensBaixoEstoque,
      itensSemEstoque,
      totalDoses,
      itensComEstoque,
      taxaDisponibilidade
    };
  };

  const obterItensAtencao = () => {
    return itens.filter(item => 
      item.status === 'vencendo' || 
      item.status === 'vencido' || 
      item.status === 'baixo_estoque'
    );
  };

  return {
    itens,
    movimentacoes,
    loading,
    adicionarItem,
    editarItem,
    excluirItem,
    registrarMovimentacao,
    obterEstatisticas,
    obterItensAtencao
  };
};

