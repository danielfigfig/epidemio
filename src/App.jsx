import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TabelaEstoque from './components/TabelaEstoque';
import Movimentacoes from './components/Movimentacoes';
import Alertas from './components/Alertas';
import ModalItem from './components/ModalItem';
import ModalConfirmacao from './components/ModalConfirmacao';
import ModalMovimentacao from './components/ModalMovimentacao';
import { useEstoque } from './hooks/useEstoque';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [modalItemOpen, setModalItemOpen] = useState(false);
  const [modalConfirmacaoOpen, setModalConfirmacaoOpen] = useState(false);
  const [modalMovimentacaoOpen, setModalMovimentacaoOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  const {
    itens,
    movimentacoes,
    loading,
    adicionarItem,
    editarItem,
    excluirItem,
    registrarMovimentacao,
    obterEstatisticas,
    obterItensAtencao
  } = useEstoque();

  const handleEditItem = (item) => {
    setItemSelecionado(item);
    setModalItemOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    const item = itens.find(i => i.id === itemId);
    setItemParaExcluir(item);
    setModalConfirmacaoOpen(true);
  };

  const handleAddItem = () => {
    setItemSelecionado(null);
    setModalItemOpen(true);
  };

  const handleNovaMovimentacao = () => {
    setModalMovimentacaoOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (itemSelecionado) {
      editarItem(itemData);
    } else {
      adicionarItem(itemData);
    }
    setModalItemOpen(false);
    setItemSelecionado(null);
  };

  const handleSaveMovimentacao = (movimentacaoData) => {
    registrarMovimentacao(movimentacaoData);
    setModalMovimentacaoOpen(false);
  };

  const handleConfirmDelete = () => {
    if (itemParaExcluir) {
      excluirItem(itemParaExcluir.id);
      setItemParaExcluir(null);
    }
  };

  const renderCurrentPage = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            estatisticas={obterEstatisticas()} 
            itensAtencao={obterItensAtencao()} 
          />
        );
      case 'estoque':
        return (
          <TabelaEstoque
            itens={itens}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem}
          />
        );
      case 'movimentacoes':
        return (
          <Movimentacoes
            movimentacoes={movimentacoes}
            itens={itens}
            onNovaMovimentacao={handleNovaMovimentacao}
          />
        );
      case 'alertas':
        return (
          <Alertas
            itens={itens}
            estatisticas={obterEstatisticas()}
          />
        );
      default:
        return (
          <Dashboard 
            estatisticas={obterEstatisticas()} 
            itensAtencao={obterItensAtencao()} 
          />
        );
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderCurrentPage()}
      </Layout>

      <ModalItem
        isOpen={modalItemOpen}
        onClose={() => {
          setModalItemOpen(false);
          setItemSelecionado(null);
        }}
        onSave={handleSaveItem}
        item={itemSelecionado}
        title={itemSelecionado ? 'Editar Item' : 'Adicionar Novo Item'}
      />

      <ModalMovimentacao
        isOpen={modalMovimentacaoOpen}
        onClose={() => setModalMovimentacaoOpen(false)}
        onSave={handleSaveMovimentacao}
        itens={itens}
      />

      <ModalConfirmacao
        isOpen={modalConfirmacaoOpen}
        onClose={() => {
          setModalConfirmacaoOpen(false);
          setItemParaExcluir(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este item do estoque? Esta ação não pode ser desfeita."
        item={itemParaExcluir}
      />
    </>
  );
}

export default App;

