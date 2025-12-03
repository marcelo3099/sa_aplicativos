# FikiFit Mobile

Aplicativo mobile para testar o cadastro de usuários no backend FikiFit.

## Instalação

1. Certifique-se de ter o Node.js instalado
2. Instale o Expo CLI globalmente:
   ```
   npm install -g expo-cli
   ```
   
3. Instale as dependências:
   ```
   npm install
   ```

## Configuração

Antes de executar o aplicativo, certifique-se que:

1. O servidor backend está rodando (execute `npm run dev` no diretório server)

2. O IP no arquivo `config/api.js` está correto para a sua rede local:
   - Abra o prompt de comando (cmd)
   - Execute o comando `ipconfig`
   - Encontre o "Endereço IPv4" da sua conexão ativa (geralmente "Conexão de Área Local" ou "Adaptador Ethernet")
   - Substitua o IP no arquivo `config/api.js` pelo IP encontrado

3. Ambos, computador (backend) e dispositivo móvel (app), devem estar na mesma rede Wi-Fi

4. Certifique-se de que o firewall do Windows não está bloqueando conexões na porta 5000:
   - Vá para Configurações > Atualização e Segurança > Windows Security
   - Clique em Firewall e Proteção de Rede
   - Verifique se o Node.js e/ou a porta 5000 estão autorizados para conexões

## Execução

Para executar o aplicativo:

```
npm start
```

Ou para Android:
```
npm run android
```

Ou para iOS (se tiver o ambiente configurado):
```
npm run ios
```

## Funcionalidades

- Cadastro de novos usuários com validação de campos
- Validação de formato de email
- Feedback visual de sucesso ou erro
- Interface amigável para dispositivos móveis

## Notas Importantes

- O aplicativo se comunica com o backend via requisições HTTP
- Certifique-se de que o firewall não está bloqueando conexões
- Ambos dispositivos devem estar na mesma rede Wi-Fi
- O IP no código está configurado para 192.168.1.100:5000 - altere conforme necessário