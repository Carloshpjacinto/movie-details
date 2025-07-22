# 🎥 Movie Details

### Aplicação construída para exibir detalhes de filmes, desenvolvida com Next.js e TypeScript.

---

## 🚀 Tecnologias Utilizadas

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="45" height="45" style="margin-right: 50px;"/>
</div>

---

## 📁 Arquitetura

### A arquitetura monolítica baseada em Next.js segue o princípio da responsabilidade única (princípio do SOLID), com organização clara e foco em escalabilidade, testabilidade e manutenibilidade.

---

## 👨‍💻 Principais funcionalidades:

##### Exibição de títulos de filmes

##### Pesquisa de filmes

##### Visualização de detalhes do filme pesquisado

## </> Principais Endpoints da API:

#### GET (GetAll) - /api/movies 

#### GET (GetByImdbID) - /api/movies/[imdbID]

#### GET (GetByTitle) - /api/movies/search 

Exemplo do Get acima: http://localhost:3000/api/movies/search?title=Star Wars: Episode VIII

## ⚙️ Instalação e Execução

### 1. Clone o repositório

#### bash

    git clone https://github.com/Carloshpjacinto/movie-details.git

### 2. Instalação das dependencias

    npm install

### 6. Execução da aplicação

    npm run dev
