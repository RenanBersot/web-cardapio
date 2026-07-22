# 🍔 Web Cardápio Premium

Um cardápio digital interativo e responsivo, desenvolvido com foco na experiência do usuário (Mobile-First) e design de alto padrão (Dark Gourmet). O sistema conta com gerenciamento de estado local para a sacola de compras e finalização de pedidos via integração direta com o WhatsApp.

> 💡 **Status do Projeto:** MVP Concluído e Funcional.

## 📱 Funcionalidades

*   **Design Premium & Mobile-First:** Interface elegante no estilo "Dark Mode Gourmet", otimizada para dispositivos móveis e leitura via QR Code.
*   **Integração em Tempo Real:** Catálogo de produtos e categorias consumidos diretamente de um banco de dados relacional (PostgreSQL via Supabase).
*   **Sacola de Compras Dinâmica:** Lógica de carrinho construída em Vanilla JavaScript (adicionar, remover, cálculo de totais).
*   **Microinterações (UX):** Efeitos visuais (shake) ao adicionar itens, botões com feedback de carregamento (loading states) e transições suaves.
*   **Checkout via WhatsApp:** Geração automática do resumo do pedido formatado, redirecionando o cliente direto para o WhatsApp do restaurante.

## 🛠️ Tecnologias Utilizadas

*   **Front-end:** HTML5, CSS3 (Vanilla, Animações, CSS Variables), JavaScript (ES6+).
*   **Back-end (BaaS):** [Supabase](https://supabase.com/) (PostgreSQL e API REST).
*   **Tipografia:** Google Fonts (Playfair Display para títulos, Inter para textos).

## 🚀 Como executar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/RenanBersot/web-cardapio.git](https://github.com/RenanBersot/web-cardapio.git)
