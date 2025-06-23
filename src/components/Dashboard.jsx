import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';

const Dashboard = ({ estatisticas, itensAtencao }) => {
  const estatisticasCards = [
    {
      titulo: 'Total de Itens',
      valor: estatisticas.totalItens,
      icon: Package,
      cor: 'text-blue-600',
      bgCor: 'bg-blue-50'
    },
    {
      titulo: 'Itens Ativos',
      valor: estatisticas.itensAtivos,
      icon: Package,
      cor: 'text-green-600',
      bgCor: 'bg-green-50'
    },
    {
      titulo: 'Próximos ao Vencimento',
      valor: estatisticas.itensVencendo,
      icon: Calendar,
      cor: 'text-yellow-600',
      bgCor: 'bg-yellow-50'
    },
    {
      titulo: 'Vencidos',
      valor: estatisticas.itensVencidos,
      icon: AlertTriangle,
      cor: 'text-red-600',
      bgCor: 'bg-red-50'
    },
    {
      titulo: 'Baixo Estoque',
      valor: estatisticas.itensBaixoEstoque,
      icon: TrendingDown,
      cor: 'text-orange-600',
      bgCor: 'bg-orange-50'
    },
    {
      titulo: 'Sem Estoque',
      valor: estatisticas.itensSemEstoque,
      icon: AlertTriangle,
      cor: 'text-gray-600',
      bgCor: 'bg-gray-50'
    }
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Visão geral do sistema de controle de vacinas e soros</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estatisticasCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.valor}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgCor}`}>
                    <Icon className={`h-6 w-6 ${stat.cor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alertas e Itens que Precisam de Atenção */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              Itens que Precisam de Atenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {itensAtencao.length > 0 ? (
                itensAtencao.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.nome}</p>
                      <p className="text-sm text-gray-600">
                        Lote: {item.lote} | Qtd: {item.quantidadeAtual}
                        {item.dataValidade && ` | Val: ${item.dataValidade}`}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhum item precisa de atenção no momento</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 text-blue-600 mr-2" />
              Resumo do Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total de Doses Disponíveis:</span>
                <span className="font-semibold text-lg">
                  {estatisticas.totalDoses}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Itens com Estoque:</span>
                <span className="font-semibold">
                  {estatisticas.itensComEstoque}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Itens Sem Estoque:</span>
                <span className="font-semibold text-red-600">
                  {estatisticas.itensSemEstoque}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxa de Disponibilidade:</span>
                  <span className="font-semibold text-green-600">
                    {estatisticas.taxaDisponibilidade}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

