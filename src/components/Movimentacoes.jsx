import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const Movimentacoes = ({ movimentacoes, itens, onNovaMovimentacao }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  // Filtrar movimentações
  const movimentacoesFiltradas = movimentacoes.filter(mov => {
    const item = itens.find(i => i.id === mov.vacinaSerumId);
    const nomeItem = item ? item.nome : '';
    
    const matchSearch = nomeItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       mov.lote.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       mov.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || mov.tipo === filtroTipo;
    return matchSearch && matchTipo;
  });

  const getTipoBadge = (tipo) => {
    const tipoConfig = {
      entrada: { 
        label: 'Entrada', 
        className: 'bg-green-100 text-green-800',
        icon: TrendingUp
      },
      saida: { 
        label: 'Saída', 
        className: 'bg-red-100 text-red-800',
        icon: TrendingDown
      }
    };
    
    const config = tipoConfig[tipo] || tipoConfig.entrada;
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const obterNomeItem = (vacinaSerumId) => {
    const item = itens.find(i => i.id === vacinaSerumId);
    return item ? item.nome : 'Item não encontrado';
  };

  // Estatísticas das movimentações
  const totalEntradas = movimentacoes.filter(m => m.tipo === 'entrada').length;
  const totalSaidas = movimentacoes.filter(m => m.tipo === 'saida').length;
  const quantidadeEntradas = movimentacoes
    .filter(m => m.tipo === 'entrada')
    .reduce((total, m) => total + m.quantidade, 0);
  const quantidadeSaidas = movimentacoes
    .filter(m => m.tipo === 'saida')
    .reduce((total, m) => total + m.quantidade, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Movimentações</h2>
          <p className="text-gray-600">Histórico de entradas e saídas do estoque</p>
        </div>
        <Button onClick={onNovaMovimentacao} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nova Movimentação
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Entradas</p>
                <p className="text-2xl font-bold text-green-600">{totalEntradas}</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Saídas</p>
                <p className="text-2xl font-bold text-red-600">{totalSaidas}</p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qtd Entradas</p>
                <p className="text-2xl font-bold text-green-600">{quantidadeEntradas}</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qtd Saídas</p>
                <p className="text-2xl font-bold text-red-600">{quantidadeSaidas}</p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por item, lote ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Movimentações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Histórico de Movimentações ({movimentacoesFiltradas.length} registros)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Lote</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Quantidade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Responsável</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Observações</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoesFiltradas.map((mov) => (
                  <tr key={mov.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{formatarData(mov.data)}</td>
                    <td className="py-3 px-4">{getTipoBadge(mov.tipo)}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{obterNomeItem(mov.vacinaSerumId)}</td>
                    <td className="py-3 px-4 text-gray-600">{mov.lote}</td>
                    <td className="py-3 px-4 text-center font-medium text-gray-900">{mov.quantidade}</td>
                    <td className="py-3 px-4 text-gray-600">{mov.responsavel}</td>
                    <td className="py-3 px-4 text-gray-600">{mov.observacoes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {movimentacoesFiltradas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhuma movimentação encontrada</p>
                <p className="text-sm">Tente ajustar os filtros ou registrar novas movimentações</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Movimentacoes;

