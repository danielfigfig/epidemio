import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';

const TabelaEstoque = ({ itens, onEditItem, onDeleteItem, onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Filtrar dados
  const dadosFiltrados = itens.filter(item => {
    const matchSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.lote.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || item.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      ativo: { label: 'Ativo', className: 'bg-green-100 text-green-800' },
      vencendo: { label: 'Vencendo', className: 'bg-yellow-100 text-yellow-800' },
      vencido: { label: 'Vencido', className: 'bg-red-100 text-red-800' },
      baixo_estoque: { label: 'Baixo Estoque', className: 'bg-orange-100 text-orange-800' },
      sem_estoque: { label: 'Sem Estoque', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status] || statusConfig.ativo;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatarData = (data) => {
    if (!data) return '-';
    return data;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Controle de Estoque</h2>
          <p className="text-gray-600">Gerencie vacinas e soros disponíveis</p>
        </div>
        <Button onClick={onAddItem} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou lote..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os Status</option>
                <option value="ativo">Ativo</option>
                <option value="vencendo">Vencendo</option>
                <option value="vencido">Vencido</option>
                <option value="baixo_estoque">Baixo Estoque</option>
                <option value="sem_estoque">Sem Estoque</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Estoque Atual ({dadosFiltrados.length} itens)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Lote</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Qtd Anterior</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Qtd Atual</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Qtd Real</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Recebido</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Validade</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Última Conf.</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Utilizado</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dadosFiltrados.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.nome}</td>
                    <td className="py-3 px-4 text-gray-600">{item.lote}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{item.quantidadeAnterior}</td>
                    <td className="py-3 px-4 text-center font-medium text-gray-900">{item.quantidadeAtual}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{item.quantidadeReal}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{item.recebidoNoMes}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{formatarData(item.dataValidade)}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{formatarData(item.ultimaConferencia)}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{item.utilizado}</td>
                    <td className="py-3 px-4 text-center">{getStatusBadge(item.status)}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditItem(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteItem(item.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {dadosFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum item encontrado</p>
                <p className="text-sm">Tente ajustar os filtros ou adicionar novos itens</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TabelaEstoque;

