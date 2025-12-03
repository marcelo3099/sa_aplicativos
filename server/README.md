# FikiFit Backend

Este é o servidor backend para o aplicativo FikiFit construído com Express.js e conectado ao banco de dados Supabase.

## Configuração

1. Certifique-se de ter o Node.js instalado
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` baseado em `.env.example` e adicione suas credenciais do Supabase e outras variáveis de ambiente

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do servidor e adicione o seguinte:

```
# Configuração do Servidor
PORT=5000
NODE_ENV=development

# Configuração do Supabase
SUPABASE_URL=sua_url_do_projeto_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

## Acesso Externo (para testes mobile)

Por padrão, o servidor está configurado para aceitar conexões de qualquer dispositivo na rede local. Para testar com dispositivos móveis:

1. Certifique-se de que o firewall do Windows permite conexões na porta 5000
2. Use o IP do seu computador na rede local (ex: `192.168.0.x:5000`) como URL base no aplicativo mobile

## Executando a Aplicação

Para executar no modo de desenvolvimento com reinício automático:
```bash
npm run dev
```

Para executar no modo de produção:
```bash
npm start
```

## Endpoints da API

- `POST /api/auth/register` - Registrar um novo usuário
- `POST /api/auth/login` - Autenticar usuário
- `GET /api/users` - Obter todos os usuários
- `GET /api/users/:id` - Obter usuário por ID
- `GET /api/users/email/:email` - Obter usuário por email
- `POST /api/users` - Criar novo usuário
- `POST /api/users/create` - Criar novo usuário (alternativo)
- `PUT /api/users/update/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Excluir usuário

## Estrutura do CRUD

O projeto segue a estrutura padrão de um CRUD (Create, Read, Update, Delete):

### CREATE (Criar)
- Método: POST
- Função: Cria um novo registro
- Exemplo: `POST /api/users` para criar um novo usuário
- No modelo: Função `create()` em `models/User.js`

### READ (Ler)
- Método: GET
- Funções: Obter registros individuais ou todos
- Exemplos:
  - `GET /api/users` para obter todos os usuários
  - `GET /api/users/:id` para obter um usuário específico
- No modelo: Funções `findAll()`, `findById()`, `findByEmail()` em `models/User.js`

### UPDATE (Atualizar)
- Método: PUT
- Função: Atualiza um registro existente
- Exemplo: `PUT /api/users/:id` para atualizar um usuário
- No modelo: Função `update()` em `models/User.js`

### DELETE (Excluir)
- Método: DELETE
- Função: Remove um registro
- Exemplo: `DELETE /api/users/:id` para excluir um usuário
- No modelo: Função `delete()` em `models/User.js`

## Banco de Dados

Esta aplicação utiliza o Supabase como provedor de banco de dados. Certifique-se de criar as tabelas necessárias no seu painel do Supabase.

## Estrutura de Pastas

```
server/
├── controllers/     # Manipuladores de requisições
├── models/          # Modelos de banco de dados
├── routes/          # Definições de rotas da API
├── middleware/      # Funções middleware personalizadas
├── config/          # Arquivos de configuração
├── .env            # Variáveis de ambiente (não commitado)
├── .gitignore      # Arquivo de exclusão do Git
├── server.js       # Arquivo principal do servidor
└── package*.json   # Dependências do Node.js
```