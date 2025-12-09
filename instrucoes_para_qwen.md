# Instruções para Qwen - Projeto FikiFit

## Visão Geral
FikiFit é um projeto educacional iniciante que demonstra uma aplicação mobile-backend completa para conectar personais trainers e alunos. O sistema permite que personais criem treinos personalizados, acompanhem o histórico dos alunos e respondam às dúvidas, enquanto os alunos podem visualizar seu histórico, treinos e conversar com seus personais.

## Estrutura do Projeto
```
FikiFit/
├── mobile/          # Aplicativo mobile React Native
├── server/          # API backend Express.js
└── supabase/        # Configuração do Supabase
```

## Componentes

### Mobile (React Native + Expo)
- Cadastro de usuários com validação de campos
- Conecta-se ao backend via IP local
- Usa Axios para requisições HTTP
- Layout responsivo para dispositivos móveis
- Interface para alunos e personais trainer

### Server (Express.js)
- API RESTful com operações CRUD completas
- Conectado ao Supabase como banco de dados
- Validação de dados de entrada
- Hashing de senhas com bcrypt
- Endpoints principais:
  - POST /api/auth/register (registro de usuário)
  - POST /api/auth/login (login de usuário)
  - POST /api/users (criar usuário)
  - GET /api/users (listar todos os usuários)
  - GET /api/users/:id (obter usuário por ID)
  - GET /api/users/email/:email (obter usuário por email)
  - PUT /api/users/update/:id (atualizar usuário)
  - DELETE /api/users/:id (excluir usuário)

### Database (Supabase PostgreSQL)
- Tabela `users` com campos: id, name, email, password (hashed), user_type
- Trigger para atualização automática do campo updated_at
- Índice em email para melhor performance

## Funcionalidades Planejadas
- Personais trainers podem adicionar treinos personalizados para alunos
- Histórico de treinos e progresso para alunos
- Sistema de mensagens entre personais e alunos
- Resposta de dúvidas por parte dos personais
- Visualização de treinos e histórico por parte dos alunos

## Observações Importantes
- Projeto é educacional e iniciante - mantenha soluções simples
- Não usar JWT ou autenticação avançada - o foco é CRUD básico
- A comunicação entre mobile e server é feita via IP local
- O backend está configurado para rodar na porta 5000
- O mobile precisa ter o IP correto configurado em config/api.js
- Projeto está em desenvolvimento para atender às necessidades de personais trainers e alunos

## Objetivo do Projeto
Conectar personais trainers e alunos, permitindo a criação de treinos personalizados, acompanhamento de histórico e comunicação direta entre ambos.

## Observações Importantes para Qwen
- NUNCA inicie servidores ou execute comandos que mantenham processos em execução
- Sempre que necessário executar o servidor, forneça os comandos para o usuário executar manualmente
- O sistema não funciona corretamente quando iniciado automaticamente pelo Qwen
- Sempre que houver necessidade de testar ou executar o servidor, informe os comandos apropriados para o usuário

## Comandos Úteis
- Para iniciar o servidor: `cd server && node server.js`
- Para iniciar o servidor com nodemon (durante desenvolvimento): `cd server && npx nodemon server.js`
- Para instalar dependências: `cd server && npm install`

Sempre que eu pedir para você ler este arquivo, você terá o contexto completo do projeto FikiFit para me ajudar com qualquer tarefa relacionada.