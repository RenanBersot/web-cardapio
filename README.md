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
   
2. Acesse a pasta do projeto:
    Bash

    cd web-cardapio

    Configure o Banco de Dados (Supabase):

        Crie um projeto no Supabase.

        Execute o script SQL (fornecido na documentação do projeto) para criar as tabelas categorias e produtos.

        Desative o RLS (Row Level Security) para leitura pública ou configure as políticas de acesso.

    Conecte as variáveis de ambiente:

        No arquivo script.js, insira a sua SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY.

    Abra o arquivo index.html em seu navegador ou utilize a extensão Live Server.

3. Modelagem de Dados

O banco de dados foi estruturado com as seguintes tabelas principais:

    categorias: id, nome, ordem

    produtos: id, categoria_id (FK), nome, descricao, preco, url_imagem, ativo

Desenvolvido por Renan Pereira Bersot

Lembre-se de trocar o `SEU-USUARIO` no link do `git clone` pelo seu usuário real do GitHub.

Para salvar essa atualização maravilhosa, você só precisa rodar os comandos básicos no terminal do VS Code:
```bash
git add README.md
git commit -m "docs: atualiza README com tecnologias e features do projeto final"
git push origin main
