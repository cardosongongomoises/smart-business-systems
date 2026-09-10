# Guia de Configuração do Supabase — Smart Business Systems

Este projeto está 100% estruturado para armazenar os dados do **Formulário de Contacto** e alimentar o **Centro de Operações** em tempo real através do Supabase.

---

## Passo 1: Criar o Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login na sua conta (ou crie uma gratuitamente).
2. Clique em **"New Project"**.
3. Escolha uma organização, defina o nome do projeto (ex: `smart-business-systems`), crie uma senha forte para o banco de dados e selecione a região mais próxima (ex: _São Paulo (sa-east-1)_ ou _Frankfurt (eu-central-1)_).
4. Aguarde 1 a 2 minutos para a inicialização do projeto.

---

## Passo 2: Executar o Script SQL das Tabelas

1. No painel do seu projeto no Supabase, clique no menu lateral **SQL Editor** (ícone `>_`).
2. Clique em **"New query"**.
3. Abra o arquivo local:
   `supabase/migrations/20260909_setup_smart_business_systems.sql`
4. Copie todo o conteúdo desse arquivo e cole no editor do Supabase.
5. Clique no botão **"Run"** (ou aperte `Ctrl + Enter`).
6. Você verá a mensagem de sucesso: `Success. No rows returned`.

### O que este script cria:

- **`leads`**: Tabela mestre que controla o fluxo comercial, status, pacote e qualificação IA.
- **`lead_nomes`**: Tabela dedicada para o nome do contacto.
- **`lead_empresas`**: Tabela dedicada para a empresa do lead.
- **`lead_telefones`**: Tabela dedicada para o telefone/WhatsApp.
- **`lead_emails`**: Tabela dedicada para o e-mail.
- **`lead_areas_atuacao`**: Tabela dedicada para a área de atuação no mercado.
- **`lead_servicos`**: Tabela dedicada para o serviço pretendido.
- **`lead_mensagens`**: Tabela dedicada para a mensagem e detalhes enviados.
- **`lead_notas`**: Tabela para anotações internas da equipe de operações.
- **`lead_atividades`**: Timeline de auditoria de eventos de cada lead.
- **`lead_agendamentos`**: Reuniões e diagnósticos estratégicos agendados.
- **`lead_conversas`**: Mensagens de chat (cliente, IA, operador humano) e telemetria de intenção.
- **`view_leads_completo`**: View SQL otimizada que junta todos esses campos em uma única consulta rápida.
- **`cadastrar_lead_formulario(...)`**: Função transacional que garante gravação atômica de todos os campos com 1 chamada.
- **Realtime**: Tabelas habilitadas na publicação `supabase_realtime` para atualização ao vivo.

---

## Passo 3: Configurar as Chaves no Arquivo `.env`

1. No Supabase, vá em **Project Settings** (ícone de engrenagem) > **API**.
2. Copie:
   - **Project URL** (ex: `https://xyzcompany.supabase.co`)
   - **Project API Keys** > chave **`anon` `public`** (ex: `eyJhbGciOi...`)
3. No projeto local, abra o arquivo `.env` na raiz e preencha:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
```

4. Reinicie o servidor de desenvolvimento (`npm run dev`) se ele estiver rodando.

---

## Passo 4: Pronto para a Operação!

- Qualquer pedido preenchido no site em `/` (`#contacto`) grava imediatamente nas tabelas no Supabase.
- No **Centro de Operações** (`/operacoes`), o indicador mostrará **`🟢 Supabase Conectado`** e você verá os novos leads chegarem em tempo real!
