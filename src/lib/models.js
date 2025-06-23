// Modelo de dados baseado na planilha fornecida
export const VacinaSerum = {
  id: '', // ID único
  nome: '', // Nome do soro/vacina (ex: SAB, SAC, SABEC, etc.)
  lote: '', // Número do lote
  quantidadeAnterior: 0, // Qtd ant.
  quantidadeAtual: 0, // Atual
  quantidadeReal: 0, // real
  recebidoNoMes: 0, // recebido NO MÊS
  dataValidade: '', // VAL (formato: MM/AA)
  ultimaConferencia: '', // ULTIMA CONF (formato: DD/MM)
  dataConferenciaQtdVencer: '', // data conferencia QTD A VENCER
  utilizado: 0, // UTILIZADO
  status: 'ativo', // Status do item (ativo, vencido, baixo_estoque)
  observacoes: '' // Campo adicional para observações
};

// Estrutura para movimentações (entradas e saídas)
export const Movimentacao = {
  id: '',
  vacinaSerumId: '', // Referência ao item
  tipo: '', // 'entrada' ou 'saida'
  quantidade: 0,
  data: '',
  responsavel: '',
  observacoes: '',
  lote: '' // Para rastreabilidade
};

// Estrutura para relatórios
export const RelatorioEstoque = {
  totalItens: 0,
  itensVencendo: 0, // Próximos ao vencimento
  itensVencidos: 0,
  itensBaixoEstoque: 0,
  ultimaAtualizacao: ''
};

// Configurações do sistema
export const ConfiguracaoSistema = {
  diasAlertaVencimento: 30, // Alertar quando faltam X dias para vencer
  estoqueMinimo: 5, // Quantidade mínima para alerta de baixo estoque
  formatoData: 'DD/MM/YYYY'
};

