# NFCe Recon

### Tecnologias utilizadas
- React Native
- SQLite
- Expo
- NodeJS
- Cheerio
- Fastify
- expo-camera

### Para rodar o projeto:

1. Baixar o repositório;
2. Instalar as dependências via NPM INSTALL
3. Usar o comando npx expo start -g
4. Baixar o aplicativo Expo GO no android
5. Ler o QRCode com via Expo GO
6. Clicar para abrir o projeto usando Expo GO caso solicitado
7. Conceder permissões ao aplicativo (camera)
8. Pronto para Uso

### Para resetar a base de dados SQLite:
Remover comentário do método await resetDatabase() na linha 21 do arquivo App.js

### Para simular uma base de dados:
Remover comentário do método await seedDatabase() na linha 22 do arquivo App.js

### API de web scrapping

Na raiz do projeto é possível encontrar a pasta nfce-scrap-api-vercel-app, onde contém todo código da implementação da api desenvolvida e hospedada na vercel.
O códgio foi colocado para consultar a implementação da API em si, dentro do projeto react native ela é consultada através da url: https://nfce-scrap-api.vercel.app/

**Não é necessário rodar a API para que o projeto funcione**, mas é possível executar através dos seguintes comandos:

1. cd nfce-scrap-api-vercel-app (entrar o diretório caso ainda não esteja dentro)
2. npm i (instalar as dependências)
3. node index.js ou npm start (para executar o projeto)
4. Realizar requisições do tipo POST para localhost:{porta onde api foi configurada}/
