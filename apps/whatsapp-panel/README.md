# Painel privado de ligação WhatsApp

Aplicação Node independente que mostra o estado da ligação Baileys e gera um QR temporário somente após ação manual. Não implementa leitura de mensagens, respostas automáticas, envio de mensagens, SMS, prospecção nem integração de e-mail.

## Desenvolvimento local

Use Node.js 20.19 ou superior. Instale dependências com `npm ci`, defina `PANEL_PASSWORD` (20 bytes ou mais em produção) e, em seguida, execute `npm start`. A variável `BAILEYS_AUTH_DIR` escolhe a pasta para as credenciais da sessão; no Render, ela deve apontar para o disco persistente. Nunca copie essa pasta, arquivos `.env` ou QR para o Git.

## Configuração do serviço Render

- Runtime: Node.js.
- Build: `cd apps/whatsapp-panel && npm ci --omit=dev`.
- Start: `node apps/whatsapp-panel/server.mjs`.
- `NODE_ENV=production`.
- `PANEL_PASSWORD`: segredo definido pelo proprietário, com no mínimo 20 bytes. Não registrar nem armazenar no repositório.
- `BAILEYS_AUTH_DIR=/var/data/baileys-auth`.
- Disco persistente montado em `/var/data`; a sessão Baileys é gravada somente em `/var/data/baileys-auth`.
- `PORT` é fornecida pelo Render.
- O painel deve executar em uma única instância quando utiliza disco persistente.

O login usa cookie `HttpOnly`, `Secure` em produção e `SameSite=Strict`; as rotas de estado e QR exigem autenticação e validação de origem. O QR expira em dois minutos e precisa ser solicitado novamente. A página `/healthz` revela somente se o processo está ativo.

## Rotas

- `GET /`: tela de login e painel.
- `POST /api/login`: início de sessão.
- `POST /api/logout`: encerra o cookie local.
- `GET /api/status`: estado autenticado da ligação.
- `POST /api/qr/start`: inicia o processo de ligação após clique autenticado.
- `GET /api/qr.svg`: obtém o QR temporário somente durante a janela autenticada.
- `GET /healthz`: verificação técnica mínima do processo.

Não há rota de envio/receção de mensagens.
