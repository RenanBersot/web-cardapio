// 1. Configuração do Supabase
const supabaseUrl = 'https://ejptlkdrrnomtcaxqymj.supabase.co';
const supabaseKey = 'sb_publishable_15QQm3beVJ3evxJkeHDCmw_y25iqtzR'; 

// MUDANÇA AQUI: Trocamos o nome para 'clienteSupabase' para evitar o conflito
const clienteSupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. Variáveis Globais
let categorias = [];
let produtos = [];
let categoriaAtual = 0;

const categoriasContainer = document.getElementById('categorias-container');
const produtosContainer = document.getElementById('produtos-container');

// 3. Busca de Dados no Supabase
async function carregarDados() {
    try {
        // MUDANÇA AQUI: Usando 'clienteSupabase' para buscar as categorias
        const { data: catData, error: catError } = await clienteSupabase
            .from('categorias')
            .select('*')
            .order('ordem', { ascending: true });
        
        if (catError) throw catError;
        categorias = catData;

        // MUDANÇA AQUI: Usando 'clienteSupabase' para buscar os produtos
        const { data: prodData, error: prodError } = await clienteSupabase
            .from('produtos')
            .select('*')
            .eq('ativo', true);
            
        if (prodError) throw prodError;
        produtos = prodData;

        // Renderiza na tela após carregar tudo
        renderizarCategorias();
        renderizarProdutos();
    } catch (error) {
        console.error("Erro ao carregar dados do Supabase:", error);
        alert("Erro ao carregar o cardápio. Verifique o console.");
    }
}

// 4. Renderização
function renderizarCategorias() {
    categoriasContainer.innerHTML = '';
    categorias.forEach(categoria => {
        const btn = document.createElement('button');
        btn.className = `btn-categoria ${categoria.id === categoriaAtual ? 'ativo' : ''}`;
        btn.innerText = categoria.nome;
        btn.onclick = () => {
            categoriaAtual = categoria.id;
            renderizarCategorias(); 
            renderizarProdutos(); 
        };
        categoriasContainer.appendChild(btn);
    });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarProdutos() {
    produtosContainer.innerHTML = '';
    
    const produtosFiltrados = categoriaAtual === 0 
        ? produtos 
        : produtos.filter(produto => produto.categoria_id === categoriaAtual);
        
    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';
        card.innerHTML = `
            <img src="${produto.url_imagem}" alt="${produto.nome}" class="card-img">
            <div class="card-info">
                <div>
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                </div>
                <div class="card-meta">
                    <span class="preco">${formatarMoeda(produto.preco)}</span>
                    <button class="btn-add-sm" onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
                </div>
            </div>
        `;
        produtosContainer.appendChild(card);
    });
}
// --- LÓGICA DO CARRINHO ---
let carrinho = [];
const modalSacola = document.getElementById('modal-sacola');
const btnAbrirSacola = document.getElementById('btn-abrir-sacola');
const btnFecharSacola = document.getElementById('btn-fechar-sacola');
const listaSacola = document.getElementById('lista-sacola');
const valorTotalSacola = document.getElementById('valor-total-sacola');
const badgeSacola = document.getElementById('badge-sacola');

// Abrir e fechar modal
btnAbrirSacola.onclick = () => modalSacola.classList.remove('oculto');
btnFecharSacola.onclick = () => modalSacola.classList.add('oculto');

// Função para adicionar item
// ATUALIZE ESTA FUNÇÃO: Adiciona a tremidinha no botão principal
function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    carrinho.push(produto);
    atualizarInterfaceCarrinho();
    
    // Dispara a animação CSS de "shake"
    btnAbrirSacola.classList.add('anima-shake');
    
    // Remove a classe depois que a animação acaba para poder tremer de novo no próximo clique
    setTimeout(() => {
        btnAbrirSacola.classList.remove('anima-shake');
    }, 400);
}

// ADICIONE ISTO NO FINAL DO ARQUIVO: A mágica de finalizar o pedido
const btnFinalizar = document.querySelector('.btn-finalizar');

btnFinalizar.onclick = () => {
    if (carrinho.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    // 1. Muda o visual para "Processando..."
    btnFinalizar.classList.add('loading');

    // 2. Simula um tempo de processamento de rede (1.5 segundos)
    setTimeout(() => {
        // Tira o loading e põe o sucesso
        btnFinalizar.classList.remove('loading');
        btnFinalizar.classList.add('success');
        btnFinalizar.innerText = "Pedido Confirmado! ✓";
        btnFinalizar.style.color = "white";

        // 3. Monta a mensagem para o WhatsApp
        let textoPedido = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";
        let totalPedido = 0;
        
        carrinho.forEach(item => {
            textoPedido += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
            totalPedido += item.preco;
        });
        
        textoPedido += `%0A*Total: R$ ${totalPedido.toFixed(2)}*`;

        // 4. Redireciona e limpa a sacola (espera 1 segundo para o usuário ler "Confirmado")
        setTimeout(() => {
            // Substitua os zeros pelo número real do restaurante
            const numeroWhatsApp = "5521000000000"; 
            const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoPedido}`;
            
            // Abre o WhatsApp em outra aba
            window.open(linkWhatsApp, '_blank');
            
            // Esvazia o carrinho local e fecha o modal
            carrinho = [];
            atualizarInterfaceCarrinho();
            modalSacola.classList.add('oculto');
            
            // Reseta o botão para o formato original para compras futuras
            btnFinalizar.classList.remove('success');
            btnFinalizar.innerText = "Finalizar Pedido";
            
        }, 1000);

    }, 1500);
};

// Função para atualizar os dados na tela
function atualizarInterfaceCarrinho() {
    listaSacola.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        
        const div = document.createElement('div');
        div.className = 'item-sacola';
        div.innerHTML = `
            <div>
                <strong>${item.nome}</strong>
                <div style="color: var(--text-muted); font-size: 14px;">${formatarMoeda(item.preco)}</div>
            </div>
            <button onclick="removerDoCarrinho(${index})" style="background:none; border:none; color:red; cursor:pointer;">Remover</button>
        `;
        listaSacola.appendChild(div);
    });

    valorTotalSacola.innerText = formatarMoeda(total);
    badgeSacola.innerText = `(${carrinho.length})`;
}

// Função para remover item
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarInterfaceCarrinho();
}

// Inicializa buscando do banco
carregarDados();