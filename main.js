import { rendenrizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import {
    atualizarPrecoCarrinho,
    inicializarCarrinho,
    rendenrizarProdutosCarrinho
} from "./src/menuCarrinho";

rendenrizarCatalogo();
inicializarCarrinho();
rendenrizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros(); 