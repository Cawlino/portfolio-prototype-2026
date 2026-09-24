# Vitrine Web (Portfólio Interativo)

## 📌 Sobre o Projeto
Este é um projeto de portfólio moderno e altamente responsivo desenvolvido em conjunto por **Daniel** e **Nathanael**. O objetivo central desta aplicação é servir como uma vitrine interativa para exibir os projetos que já desenvolvemos. 

**Metas do projeto:**
- 🚀 **Captar leads** e novos clientes.
- 💼 **Conseguir trabalhos como freelancer**.
- 🛠️ **Produzir e catalogar novos projetos**.
- 🖥️ **Servir como demonstração** das nossas capacidades técnicas para potenciais clientes, mostrando o nível de design, responsividade e interatividade que podemos entregar.

## 🛠️ Tecnologias Utilizadas
O projeto utiliza uma stack moderna focada em performance e animações fluidas:
- **React 19** + **Vite**: Estrutura e build rápido.
- **Tailwind CSS v4**: Estilização utilitária e responsividade.
- **GSAP**: Animações avançadas, especialmente o *ScrollTrigger* para rolagem horizontal responsiva no desktop.
- **Lenis**: Smooth scrolling (rolagem suave).
- **Three.js** & **React Three Fiber**: Elementos e interações visuais em 3D.
- **Oxlint**: Linter de código.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

### Passos
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. O terminal mostrará a URL local (geralmente `http://localhost:5173`). Acesse-a no seu navegador.

## ➕ Como Adicionar Novos Projetos (Guia para o Nathanael)

Nathanael, quando você for adicionar seus projetos, basta seguir a estrutura abaixo. Não é necessário criar novas páginas, apenas alimentar o array já existente.

1. **Coloque suas imagens/assets:**
   Adicione as imagens dos seus projetos na pasta `public/` (na raiz do projeto). 
   *Exemplo: `public/meu-projeto.jpg`*

2. **Registre o projeto no Showcase:**
   Abra o arquivo `src/components/Showcase.jsx`. Logo no topo do arquivo, você verá um array chamado `projects`. Adicione um novo bloco (objeto) para o seu projeto seguindo este modelo:

   ```javascript
   {
     id: 'id-unico-do-projeto', // Use hífens, ex: 'sistema-clinica'
     title: 'Nome do Seu Projeto',
     description: 'Descrição atraente sobre o projeto. O que ele é, que problema resolve e quais tecnologias principais utilizou.',
     // Você pode usar uma única imagem:
     image: '/sua-imagem-no-public.jpg',
     // OU várias imagens (para versão mobile, por exemplo):
     // images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
     features: ['Destaque 1', 'Destaque 2', 'Destaque 3'],
   }
   ```
   
   O componente lidará automaticamente com a intercalação visual (texto na esquerda/imagem na direita e vice-versa) e a renderização do carrossel/scroll!

## 🤖 Contexto para Agentes de IA
Se você é uma IA ajudando na manutenção ou evolução deste código, tenha em mente:
- **Layout & Animações:** A seção principal de exibição de projetos (`Showcase.jsx`) utiliza GSAP com `ScrollTrigger`. No desktop (≥768px), ocorre um pin e rolagem horizontal (`xPercent`). No mobile, isso é desfeito (usando `matchMedia` do GSAP) para uma rolagem vertical natural.
- **Estilo:** Prioriza visual sofisticado ("clean"), contrastes altos, animações ativadas por hover e custom cursor (via `CustomCursor.jsx`). O Tailwind está configurado para V4.
- Sempre tente manter ou reaproveitar a estrutura de componentes que foca em micro-interações.
