# Sistema de Controle de Vacinas e Soros

## Descrição
Sistema web moderno para controle de entrada e saída de vacinas e soros, desenvolvido em React com interface responsiva e funcionalidades completas de gestão de estoque.

## Funcionalidades Principais

### 📊 Dashboard
- Visão geral do sistema com estatísticas em tempo real
- Cards informativos com total de itens, itens ativos, vencimentos, etc.
- Lista de itens que precisam de atenção
- Resumo do estoque com taxa de disponibilidade

### 📦 Gestão de Estoque
- Tabela completa com todos os dados dos itens
- Filtros por nome/lote e status
- Funcionalidades CRUD (Criar, Ler, Atualizar, Deletar)
- Validações de formulário
- Status automático baseado em quantidade e validade

### 📈 Sistema de Movimentações
- Histórico completo de entradas e saídas
- Estatísticas de movimentações
- Registro de novas movimentações com validações
- Controle de estoque em tempo real

### 🚨 Central de Alertas
- Detecção automática de situações críticas
- Alertas de vencimento e baixo estoque
- Sistema de prioridades (Alta, Média, Baixa)
- Funcionalidade de marcar como lido

## Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **JavaScript ES6+** - Linguagem

## Estrutura do Projeto

```
sistema-vacinas/
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Layout principal
│   │   ├── Dashboard.jsx        # Dashboard
│   │   ├── TabelaEstoque.jsx    # Tabela de estoque
│   │   ├── Movimentacoes.jsx    # Página de movimentações
│   │   ├── Alertas.jsx          # Central de alertas
│   │   ├── ModalItem.jsx        # Modal para adicionar/editar itens
│   │   ├── ModalMovimentacao.jsx # Modal para movimentações
│   │   └── ModalConfirmacao.jsx # Modal de confirmação
│   ├── hooks/
│   │   └── useEstoque.js        # Hook para gerenciar dados
│   ├── lib/
│   │   ├── models.js            # Modelos de dados
│   │   └── mockData.js          # Dados de exemplo
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Ponto de entrada
├── package.json
└── vite.config.js
```

## Modelo de Dados

### Item de Estoque
```javascript
{
  id: string,
  nome: string,
  lote: string,
  quantidadeAnterior: number,
  quantidadeAtual: number,
  quantidadeReal: number,
  recebidoNoMes: number,
  dataValidade: string,
  ultimaConferencia: string,
  utilizado: number,
  status: 'ativo' | 'vencendo' | 'vencido' | 'baixo_estoque' | 'sem_estoque',
  observacoes: string
}
```

### Movimentação
```javascript
{
  id: string,
  vacinaSerumId: string,
  tipo: 'entrada' | 'saida',
  quantidade: number,
  data: string,
  responsavel: string,
  observacoes: string,
  lote: string
}
```

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

## Próximos Passos para Integração com Supabase

### 1. Configuração do Supabase
```bash
npm install @supabase/supabase-js
```

### 2. Estrutura das Tabelas
```sql
-- Tabela de itens
CREATE TABLE itens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR NOT NULL,
  lote VARCHAR NOT NULL,
  quantidade_anterior INTEGER DEFAULT 0,
  quantidade_atual INTEGER DEFAULT 0,
  quantidade_real INTEGER DEFAULT 0,
  recebido_no_mes INTEGER DEFAULT 0,
  data_validade VARCHAR,
  ultima_conferencia VARCHAR,
  utilizado INTEGER DEFAULT 0,
  status VARCHAR DEFAULT 'ativo',
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de movimentações
CREATE TABLE movimentacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vacina_serum_id UUID REFERENCES itens(id),
  tipo VARCHAR NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  quantidade INTEGER NOT NULL,
  data DATE NOT NULL,
  responsavel VARCHAR NOT NULL,
  observacoes TEXT,
  lote VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Configuração do Cliente
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 4. Adaptação do Hook useEstoque
O hook atual já está preparado para ser adaptado para usar APIs REST do Supabase, bastando substituir as operações locais por chamadas para o banco de dados.

## Características Técnicas

- **Responsivo**: Funciona em desktop, tablet e mobile
- **Acessível**: Componentes seguem padrões de acessibilidade
- **Performance**: Otimizado com React hooks e memoização
- **Validações**: Formulários com validação completa
- **UX/UI**: Interface moderna e intuitiva
- **Escalável**: Arquitetura preparada para crescimento

## Suporte

O sistema está pronto para uso imediato e pode ser facilmente expandido com novas funcionalidades conforme necessário.

