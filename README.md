# FitTrack

O FitTrack App é uma aplicação projetada para ajudar os usuários a acompanhar seus treinos, definir metas de fitness e alcançar seus objetivos de forma eficaz. Com recursos abrangentes e uma interface intuitiva, o aplicativo oferece uma experiência personalizada para cada usuário.

## Participantes
- [Kauã Librelato da Costa](https://www.github.com/KauaLibrelato)
- [Jean Carlos Nesi](https://www.github.com/JeanNesi)
- [Kauan Laureano Cândido](https://www.github.com/kauanlc1)
- [Lucas Ribeiro Guidi](https://www.github.com/lucasrguidi)
- [João Victor Miotelli Vitali](https://www.github.com/JoaoMiotelli)

## Funcionalidades Principais

- Acompanhamento de Treino: Registre e acompanhe seus treinos diários.
- Amizade: Faça amizades dentro app.
- Missões e Níveis: Complete missões de fitness para ganhar pontos de experiência (XP) e subir de nível, mantendo-se motivado e engajado.
- Ranking: Suba seu nível e compare com o ranking geral ou entre amigos.

## Tecnologias

<div align="center">
  <img width=200 align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <img width=200 align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" />
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <img width=200 align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" />
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  <img width=200 align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original-wordmark.svg" />     
</div>

## Instalação
Para utilizar o backend do FitTrack, é necessário ter uma instância do PostgreSQL em sua máquina. 
Para isso, você pode optar por instalar o PgAdmin ou utilizar o Docker para configurar facilmente o ambiente de desenvolvimento.

Tendo o ambiente do banco de dados configurado, siga estas etapas para executar o projeto:

1- Clone este repositório para o seu ambiente local:
```
git clone https://github.com/seu-usuario/fitness-app.git
```

2- Instale as dependências necessárias:
```
npm install
```

3- Execute as migrations do Prisma ORM para criar o banco de dados:
```
npx prisma migrate dev
```

4- Execute as seeds do Prisma ORM para popular o banco de dados com informações essenciais para o funcionamento do projeto.
```
npx prisma db seed
```

5- Inicie o servidor de desenvolvimento:
```
npm run dev
```

Seu servidor de desenvolvimento está pronto e em execução. Agora você pode acessar todas as APIs por meio da URL base:
```
http://localhost:8080/api/client
```

