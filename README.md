# FitTrack

O FitTrack App é uma aplicação projetada para ajudar os usuários a acompanhar seus treinos, definir metas de fitness e alcançar seus objetivos de forma eficaz. Com recursos abrangentes e uma interface intuitiva, o aplicativo oferece uma experiência personalizada para cada usuário.

## Funcionalidades Principais

- Acompanhamento de Treino: Registre e acompanhe seus treinos diários, incluindo exercícios, séries, repetições e pesos utilizados.
- Criação de Fichas de Treino: Crie fichas de treino personalizadas para atender às suas necessidades e objetivos específicos de fitness.
- Registro de Progresso: Monitore seu progresso ao longo do tempo com gráficos e estatísticas detalhadas.
- Definição de Metas: Estabeleça metas de curto e longo prazo e acompanhe seu progresso em direção a elas.
- Missões e Níveis: Complete missões de fitness para ganhar pontos de experiência (XP) e subir de nível, mantendo-se motivado e engajado.

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
