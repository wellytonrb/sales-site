import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function rendenrizarCatalogo(){
for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `<div class='shadow-xl rounded-md shadow-slate-300 border-solid w-48 m-2 flex flex-col p-2 justify-between group text-center ${produtoCatalogo.feminino ? 'feminino' : 'masculino'}' id="card-produto-${produtoCatalogo.id}">
        <img
        src="./assets/img/${produtoCatalogo.imagem}"
        alt="Produto 1 do Magazine Hashtag."
        class='group-hover:scale-110 duration-300 my-3 rounded-md
        />
        <p class='text-sm'>${produtoCatalogo.marca}</p>
        <p class='text-sm'>${produtoCatalogo.nome}</p>
        <p class='text-lg'>R$${produtoCatalogo.preco}</p>
        <button id='adicionar-${produtoCatalogo.id}' class='bg-green-500 hover:scale-105 rounded-md text-slate-200'>
        <i class="fa-solid fa-cart-plus"></i>
        </button>
        </div>`;
    document.getElementById("container-produto").innerHTML += cartaoProduto;
  }

for (const produtoCatalogo of catalogo) {
    document
        .getElementById(`adicionar-${produtoCatalogo.id}`)
        .addEventListener('click', () =>  adicionarAoCarrinho (produtoCatalogo.id));
    }
}