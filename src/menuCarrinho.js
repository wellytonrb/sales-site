import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutosCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  if(Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = window.location.origin + "/checkout.html";
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoirParaCheckout = document.getElementById("finalizar-compra");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoirParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutosCarrinhoComQuantidade[idProduto];
  salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  rendenrizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutosCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
    if(idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
  idsProdutosCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutosCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find(p => p.id === idProduto);
  const containerProdutosCarrinho =
      document.getElementById("produtos-carrinho");

  const elementArticle = document.createElement('article'); //<article></article>
  const articleClasses = [
  "flex",
  "bg-zinc-200",
  "rounded-xl",
  "relative"
  ];

  for (const articleClass of articleClasses) {
    elementArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-1 right-2">
    <i class="text-slate-500 fa-solid fa-circle-xmark hover:text-slate-900"></i>
  </button> 
    <img 
    src="./assets/img/${produto.imagem}"
    alt="Carrinho: ${produto.nome}"
    class="h-24 rounded-lg "
    >
  <div class="p-4 flex flex-col justify-between">
    <p class="text-slate-900 text-sm">
    ${produto.nome}
    </p>
    <p class="text-slate-500 text-xs">Tamanho: M</p>
    <p class="text-green-900 text-lg">R$${produto.preco}</p>
  </div> 
    <div class='flex text-black items-end absolute bottom-0 right-3 text-lg'>
        <button class="ml-2" id='decrementar-produto-${produto.id}'>-</button>
        <p id='quantidade-${produto.id}'
        class="ml-2">${idsProdutosCarrinhoComQuantidade[produto.id]}</p>
        <button class="ml-2" id='incrementar-produto-${produto.id}'>+</button>
    </div>`;

    elementArticle.innerHTML += cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

    document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

    document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener('click', () => removerDoCarrinho(produto.id));
}


export function rendenrizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = '';

  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutosCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto);
        return;
    }
  idsProdutosCarrinhoComQuantidade[idProduto] = 1; 
  salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutosCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}