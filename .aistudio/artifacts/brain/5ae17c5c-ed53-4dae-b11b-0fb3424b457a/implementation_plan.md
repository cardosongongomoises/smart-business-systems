# Assistente IA Operacional — Centro de Operações

Criação da seção dedicada **Assistente IA** no Centro de Operações da Agentes Digital. O assistente atuará como um copiloto operacional inteligente para a equipe comercial, analisando leads qualificados, sugerindo mensagens de alta conversão para WhatsApp (adaptadas ao mercado angolano), diagnosticando taxas de conversão de campanhas e respondendo dúvidas operacionais com contexto em tempo real.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões confirmadas com base nas suas preferências:**
>
> - **Foco principal**: Assistente completo para análise de leads e mensagens WhatsApp.
> - **Formato de interface**: Chat conversacional com prompts rápidos categorizados e atalhos de ação em um clique.
> - **Contexto operacional**: Conexão aos dados reais do sistema (leads cadastrados, status de qualificação, campanhas de disparo e métricas de conversão/MRR).
> - **Execução Segura de IA**: Chamadas executadas via servidor com o modelo `gemini-3.8-flash` (SDK `@google/genai`), com fallback analítico local para resiliência offline.

---

## 1. Overview & Core Concept

- **O que faz**: Oferece um centro de inteligência artificial embutido no Centro de Operações. Permite ao gestor comercial e aos operadores:
  1. Analisar qualquer lead em tempo real (objeções, score, histórico de conversa, temperatura de compra).
  2. Gerar abordagens e mensagens personalizadas para WhatsApp prontas para envio (com botão direto para copiar ou abrir no WhatsApp).
  3. Diagnosticar gargalos em campanhas e sugerir melhorias de copy para os pacotes da Agentes Digital (_Presença_, _Profissional_, _Autoridade_, _Domínio IA_, _Automate Pro_).
  4. Executar consultas rápidas de métricas ("Quais leads estão prontos para fechamento?", "Qual operadora teve melhor entrega nesta semana?").
- **Público-alvo**: Gestores comerciais, operadores de WhatsApp e administradores da Agentes Digital em Angola.
- **Valor agregado**: Redução de tempo na elaboração de mensagens de follow-up, padronização da linguagem de vendas e tomadas de decisão orientadas a dados.

---

## 2. User Experience & Visual Design

### Fluxo de Uso

1. **Acesso pela Barra Lateral**: Novo item com ícone e badge na barra lateral esquerda: **"Assistente IA"**.
2. **Contexto Ativo no Topo**: O assistente exibe o resumo operacional atual (total de leads, leads quentes, conversões e campanha ativa) como contexto vivo de conversa.
3. **Pílula de Prompts Rápidos / Ações**: Botões categorizados de um clique:
   - _Analisar Lead Atual_: "Diagnosticar o lead selecionado e indicar próximo passo"
   - _Copy de Follow-up WhatsApp_: "Gerar mensagem persuasiva para quebrar objeção de preço"
   - _Auditoria de Campanha_: "Analisar taxa de entrega e descartes de telefones fixos"
   - _Resumo Executivo do Dia_: "Listar oportunidades com maior probabilidade de fechamento hoje"
4. **Área Conversacional**:
   - Mensagens com tipografia nítida e contraste WCAG AA sobre fundo grafite/obsidiana (`#0E121A` e `#151A23`).
   - Respostas estruturadas com cartões de sugestão de mensagens com botão funcional **"Copiar Texto"** e **"Enviar via WhatsApp"**.
   - Indicador de processamento em tempo real e seletor rápido para focar a análise em um lead específico.
5. **Painel Lateral de Contexto (Drawer/Sidebar colapsável)**:
   - Exibe a lista rápida dos últimos leads para alternar o foco do copiloto sem sair da aba.

### Identidade Visual e Tema

- **Fundo dominante**: Obsidiana `#080A0F` e azul-marinho profundo `#0E121A`.
- **Superfícies**: Cartões de vidro grafite `#151A23` com bordas sutis `#252C38`.
- **Acentos**: Azul da marca `#3B82F6` e violeta IA `#8B5CF6` para estados ativos e botões de envio.
- **Tipografia**: `Inter` e `Manrope` para leitura fluida, com algarismos tabulares (`font-mono tabular-nums`) para métricas e scores de qualificação.
- **Restrição Anti-Slop**: Sem pills estáticas decorativas desnecessárias, sem dots pulsantes artificiais e sem bordas grossas assimétricas; todos os controles com botões de clique reais e estados funcionais completos.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Chat Integrado com Context Injection**:
  - _Abordagem_: O prompt enviado ao modelo recebe automaticamente um snapshot seguro e anonimizado do estado operacional atual (leads recentes, contatos com WhatsApp verificado, status de disparos).
  - _Por quê_: Torna as respostas imediatamente práticas e acionáveis, em vez de respostas genéricas de chatbot.
- **Decisão 2: Arquitetura Server-Side com `@google/genai`**:
  - _Abordagem_: Chamadas de IA isoladas no backend via TanStack Start server functions (`createServerFn`) ou endpoint de API `/api/v1/ai-assistant`, utilizando `gemini-3.8-flash`.
  - _Por quê_: Conformidade rigorosa com segurança (chave de API nunca exposta no navegador) e controle de cabeçalhos de auditoria (`User-Agent: 'aistudio-build'`).
- **Decisão 3: Mecanismo de Fallback Offline Inteligente**:
  - _Abordagem_: Se o ambiente estiver sem chave de API configurada temporariamente ou ocorrer indisponibilidade de rede, um motor heurístico com base na base de conhecimento comercial (`vendedorSkillsData`) responderá às consultas operacionais com copys reais pré-catalogadas.
  - _Por quê_: Garante zero falhas e interface sempre 100% utilizável.

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Arquitetura

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Centro de Operações                           │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   OperationsSidebar   │  │           OperationsTopbar            │  │
│  │   [Assistente IA]     │  │   (Search, Métricas, Ações)           │  │
│  └───────────┬───────────┘  └───────────────────┬───────────────────┘  │
└──────────────┼──────────────────────────────────┼──────────────────────┘
               ▼                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       Aba: AIAssistantView                             │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Barra Superior: Status Operacional + Seletor de Lead em Foco     │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Atalhos de Prompts Rápidos:                                      │  │
│  │ [Copy WhatsApp] [Analisar Objeção] [Resumo do Dia] [Follow-up]   │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Histórico de Mensagens do Chat (ScrollArea):                     │  │
│  │ - Mensagens do Usuário                                           │  │
│  │ - Respostas da IA com Formatação Markdown & Blocos de Ação       │  │
│  │   [Botão: Copiar Copy] [Botão: Abrir WhatsApp Web]               │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Barra de Entrada: TextArea + Anexo de Contexto + Enviar          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼ POST { message, operationalContext }
┌────────────────────────────────────────────────────────────────────────┐
│              Server RPC / Route: /api/v1/ai-assistant                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Injeta System Prompt Comercial da Agentes Digital + Diretrizes   │  │
│  │ Chamada @google/genai: gemini-3.8-flash                          │  │
│  │ Headers: User-Agent = 'aistudio-build'                           │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      ▼
                        Google Gemini API Service
```

### Componentes e Modificações Previstas

1. **`src/components/operations/OperationsSidebar.tsx`**:
   - Adicionar `"ai_assistant"` à união de tipos `ActiveTab`.
   - Adicionar o item **"Assistente IA"** ao menu principal com ícone `Bot` e badge `"Copilot"`.
2. **`src/components/operations/AIAssistantView.tsx` (Novo Componente)**:
   - Interface completa do chat com histórico de conversas, sugestões rápidas, integração de dados de leads e ações em um clique.
3. **`src/components/operations/OperationsCenter.tsx`**:
   - Renderizar `<AIAssistantView />` quando `currentTab === "ai_assistant"`, fornecendo `leads`, `selectedLeadId` e métricas atuais.
4. **`src/server/aiAssistantService.ts` / Endpoint Server**:
   - Integração com `@google/genai` utilizando `gemini-3.8-flash` e prompt operacional especializado em negócios em Angola.
5. **Dependências**:
   - Adicionar `@google/genai` caso ainda não instalado.

---

## Plano de Verificação

1. **Compilação e Tipagem**:
   - Executar `npx tsc --noEmit` para validar conformidade com `exactOptionalPropertyTypes` e `noUncheckedIndexedAccess`.
2. **Qualidade e Estilo**:
   - Executar `npm run lint` para garantir zero erros de ESLint/Prettier.
3. **Build da Aplicação**:
   - Executar `compile_applet` e `npm run build` para garantir geração estática e SSR sem falhas.
4. **Verificação Funcional na Interface**:
   - Acessar `/operacoes`, navegar até a aba **Assistente IA**.
   - Testar o envio de mensagens livres e cliques nos atalhos rápidos.
   - Testar a cópia de mensagens e abertura no WhatsApp.
