// Dados mock baseados na planilha fornecida
export const mockVacinasSerum = [
  {
    id: '1',
    nome: 'SAB',
    lote: 'L001',
    quantidadeAnterior: 0,
    quantidadeAtual: 50,
    quantidadeReal: 50,
    recebidoNoMes: 0,
    dataValidade: '04/26',
    ultimaConferencia: '03/06',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'ativo',
    observacoes: ''
  },
  {
    id: '2',
    nome: 'SAC',
    lote: 'L002',
    quantidadeAnterior: 25,
    quantidadeAtual: 50,
    quantidadeReal: 50,
    recebidoNoMes: 0,
    dataValidade: '04/26',
    ultimaConferencia: '05/06',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'ativo',
    observacoes: ''
  },
  {
    id: '3',
    nome: 'SABEC',
    lote: 'L003',
    quantidadeAnterior: 3,
    quantidadeAtual: 10,
    quantidadeReal: 10,
    recebidoNoMes: 0,
    dataValidade: '11/26',
    ultimaConferencia: '05/06',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'ativo',
    observacoes: ''
  },
  {
    id: '4',
    nome: 'SAHEB',
    lote: 'L004',
    quantidadeAnterior: 10,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '05/24',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 10,
    status: 'vencido',
    observacoes: 'Vencido'
  },
  {
    id: '5',
    nome: 'SAA',
    lote: 'L005',
    quantidadeAnterior: 27,
    quantidadeAtual: 16,
    quantidadeReal: 16,
    recebidoNoMes: 0,
    dataValidade: '06/26',
    ultimaConferencia: '05/06',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'ativo',
    observacoes: ''
  },
  {
    id: '6',
    nome: 'SAE',
    lote: 'L006',
    quantidadeAnterior: 19,
    quantidadeAtual: 28,
    quantidadeReal: 28,
    recebidoNoMes: 0,
    dataValidade: '04/26',
    ultimaConferencia: '07/06',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'ativo',
    observacoes: ''
  },
  {
    id: '7',
    nome: 'SAT',
    lote: 'L007',
    quantidadeAnterior: 15,
    quantidadeAtual: 22,
    quantidadeReal: 22,
    recebidoNoMes: 0,
    dataValidade: '01/26',
    ultimaConferencia: '09/06/2025',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'vencendo',
    observacoes: 'Próximo ao vencimento'
  },
  {
    id: '8',
    nome: 'SAR',
    lote: 'L008',
    quantidadeAnterior: 31,
    quantidadeAtual: 31,
    quantidadeReal: 31,
    recebidoNoMes: 0,
    dataValidade: '01/26',
    ultimaConferencia: '11/06',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'vencendo',
    observacoes: 'Próximo ao vencimento'
  },
  {
    id: '9',
    nome: 'SAEL',
    lote: 'L009',
    quantidadeAnterior: 5,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'sem_estoque',
    observacoes: 'Sem estoque'
  },
  {
    id: '10',
    nome: 'S.VARICELA 125 UI',
    lote: 'L010',
    quantidadeAnterior: 0,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '05/25',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'vencido',
    observacoes: 'Vencido'
  },
  {
    id: '11',
    nome: 'VACBCG',
    lote: 'L011',
    quantidadeAnterior: 0,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'sem_estoque',
    observacoes: 'Sem estoque'
  },
  {
    id: '12',
    nome: 'VACHEPB',
    lote: 'L012',
    quantidadeAnterior: 0,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'sem_estoque',
    observacoes: 'Sem estoque'
  },
  {
    id: '13',
    nome: 'VACAR',
    lote: 'L013',
    quantidadeAnterior: 18,
    quantidadeAtual: 0,
    quantidadeReal: 0,
    recebidoNoMes: 0,
    dataValidade: '',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'sem_estoque',
    observacoes: 'Sem estoque'
  },
  {
    id: '14',
    nome: 'VDT',
    lote: 'L014',
    quantidadeAnterior: 0,
    quantidadeAtual: 4,
    quantidadeReal: 4,
    recebidoNoMes: 0,
    dataValidade: '20/09/25',
    ultimaConferencia: '',
    dataConferenciaQtdVencer: '',
    utilizado: 0,
    status: 'baixo_estoque',
    observacoes: 'Baixo estoque'
  }
];

export const mockMovimentacoes = [
  {
    id: '1',
    vacinaSerumId: '1',
    tipo: 'entrada',
    quantidade: 50,
    data: '2024-03-01',
    responsavel: 'Dr. Silva',
    observacoes: 'Recebimento mensal',
    lote: 'L001'
  },
  {
    id: '2',
    vacinaSerumId: '2',
    tipo: 'entrada',
    quantidade: 25,
    data: '2024-03-01',
    responsavel: 'Dr. Silva',
    observacoes: 'Recebimento mensal',
    lote: 'L002'
  },
  {
    id: '3',
    vacinaSerumId: '4',
    tipo: 'saida',
    quantidade: 10,
    data: '2024-06-15',
    responsavel: 'Enfermeira Ana',
    observacoes: 'Utilizado em paciente',
    lote: 'L004'
  }
];

