import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Package, TrendingDown, Bell, CheckCircle } from 'lucide-react';

const Alertas = ({ itens, estatisticas }) => {
  const [alertasSelecionados, setAlertasSelecionados] = useState([]);

  // Gerar alertas baseados nos dados
  const gerarAlertas = () => {
    const alertas = [];

    // Alertas de vencimento
    itens.forEach(item => {
      if (item.status === 'vencido') {
        alertas.push({
          id: `vencido_${item.id}`,
          tipo: 'vencido',
          prioridade: 'alta',
          titulo: `${item.nome} vencido`,
          descricao: `Lote ${item.lote} venceu em ${item.dataValidade}`,
          item: item,
          icon: AlertTriangle,
          cor: 'text-red-600',
          bgCor: 'bg-red-50'
        });
      } else if (item.status === 'vencendo') {
        alertas.push({
          id: `vencendo_${item.id}`,
          tipo: 'vencendo',
          prioridade: 'media',
          titulo: `${item.nome} próximo ao vencimento`,
          descricao: `Lote ${item.lote} vence em ${item.dataValidade}`,
          item: item,
          icon: Calendar,
          cor: 'text-yellow-600',
          bgCor: 'bg-yellow-50'
        });
      }
    });

    // Alertas de estoque baixo
    itens.forEach(item => {
      if (item.status === 'baixo_estoque') {
        alertas.push({
          id: `baixo_estoque_${item.id}`,
          tipo: 'baixo_estoque',
          prioridade: 'media',
          titulo: `${item.nome} com estoque baixo`,
          descricao: `Apenas ${item.quantidadeAtual} unidades disponíveis`,
          item: item,
          icon: TrendingDown,
          cor: 'text-orange-600',
          bgCor: 'bg-orange-50'
        });
      } else if (item.status === 'sem_estoque') {
        alertas.push({
          id: `sem_estoque_${item.id}`,
          tipo: 'sem_estoque',
          prioridade: 'alta',
          titulo: `${item.nome} sem estoque`,
          descricao: `Nenhuma unidade disponível`,
          item: item,
          icon: Package,
          cor: 'text-red-600',
          bgCor: 'bg-red-50'
        });
      }
    });

    // Alertas gerais do sistema
    if (estatisticas.itensVencidos > 0) {
      alertas.push({
        id: 'sistema_vencidos',
        tipo: 'sistema',
        prioridade: 'alta',
        titulo: 'Itens vencidos no sistema',
        descricao: `${estatisticas.itensVencidos} itens vencidos precisam ser removidos`,
        icon: AlertTriangle,
        cor: 'text-red-600',
        bgCor: 'bg-red-50'
      });
    }

    if (estatisticas.itensSemEstoque > 5) {
      alertas.push({
        id: 'sistema_sem_estoque',
        tipo: 'sistema',
        prioridade: 'media',
        titulo: 'Muitos itens sem estoque',
        descricao: `${estatisticas.itensSemEstoque} itens estão sem estoque`,
        icon: Package,
        cor: 'text-orange-600',
        bgCor: 'bg-orange-50'
      });
    }

    return alertas.sort((a, b) => {
      const prioridadeOrder = { alta: 3, media: 2, baixa: 1 };
      return prioridadeOrder[b.prioridade] - prioridadeOrder[a.prioridade];
    });
  };

  const alertas = gerarAlertas();

  const getPrioridadeBadge = (prioridade) => {
    const prioridadeConfig = {
      alta: { label: 'Alta', className: 'bg-red-100 text-red-800' },
      media: { label: 'Média', className: 'bg-yellow-100 text-yellow-800' },
      baixa: { label: 'Baixa', className: 'bg-blue-100 text-blue-800' }
    };
    
    const config = prioridadeConfig[prioridade] || prioridadeConfig.baixa;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleMarcarComoLido = (alertaId) => {
    setAlertasSelecionados(prev => [...prev, alertaId]);
  };

  const handleMarcarTodosComoLidos = () => {
    setAlertasSelecionados(alertas.map(a => a.id));
  };

  const alertasNaoLidos = alertas.filter(a => !alertasSelecionados.includes(a.id));
  const alertasLidos = alertas.filter(a => alertasSelecionados.includes(a.id));

  // Estatísticas dos alertas
  const alertasAlta = alertas.filter(a => a.prioridade === 'alta').length;
  const alertasMedia = alertas.filter(a => a.prioridade === 'media').length;
  const alertasBaixa = alertas.filter(a => a.prioridade === 'baixa').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Central de Alertas</h2>
          <p className="text-gray-600">Monitore situações que precisam de atenção</p>
        </div>
        {alertasNaoLidos.length > 0 && (
          <Button onClick={handleMarcarTodosComoLidos} variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar Todos como Lidos
          </Button>
        )}
      </div>

      {/* Cards de Estatísticas dos Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Alertas</p>
                <p className="text-2xl font-bold text-gray-900">{alertas.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prioridade Alta</p>
                <p className="text-2xl font-bold text-red-600">{alertasAlta}</p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prioridade Média</p>
                <p className="text-2xl font-bold text-yellow-600">{alertasMedia}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Não Lidos</p>
                <p className="text-2xl font-bold text-blue-600">{alertasNaoLidos.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas Não Lidos */}
      {alertasNaoLidos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 text-red-600 mr-2" />
              Alertas Não Lidos ({alertasNaoLidos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasNaoLidos.map((alerta) => {
                const Icon = alerta.icon;
                return (
                  <div key={alerta.id} className={`p-4 rounded-lg border-l-4 ${alerta.bgCor} border-l-current`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${alerta.bgCor}`}>
                          <Icon className={`h-5 w-5 ${alerta.cor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{alerta.titulo}</h4>
                            {getPrioridadeBadge(alerta.prioridade)}
                          </div>
                          <p className="text-sm text-gray-600">{alerta.descricao}</p>
                          {alerta.item && (
                            <div className="mt-2 text-xs text-gray-500">
                              Lote: {alerta.item.lote} | Qtd: {alerta.item.quantidadeAtual}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarcarComoLido(alerta.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Alertas Lidos */}
      {alertasLidos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Alertas Lidos ({alertasLidos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasLidos.map((alerta) => {
                const Icon = alerta.icon;
                return (
                  <div key={alerta.id} className="p-4 rounded-lg bg-gray-50 opacity-60">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-gray-100">
                        <Icon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-600">{alerta.titulo}</h4>
                          <Badge className="bg-gray-100 text-gray-600">Lido</Badge>
                        </div>
                        <p className="text-sm text-gray-500">{alerta.descricao}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estado vazio */}
      {alertas.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum alerta ativo</h3>
            <p className="text-gray-600">Tudo está funcionando perfeitamente! Não há alertas que precisem de atenção no momento.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Alertas;

