const matrizGastos = [
    ["Alimentacao", 0],
    ["Transporte", 0],
    ["Lazer", 0],
    ["Outros", 0],
    ["Total", 0],
];

// === Funções utilitárias ===
const obterElemento = (id) => document.getElementById(id);
const valorNegativo = (valor) => valor < 0;
const somaValor = (total, valor) => total + valor;
const limparCampos = () => (obterElemento("valorGasto").value = "");

const formatarValor = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// === Obter valores do formulário ===
const obterValorInformado = () => parseFloat(obterElemento("valorGasto").value);
const obterCategoriaInformada = () => obterElemento("categoria").value;

// === Obter categoria da matriz ===
const obterCategoria = (matriz, nomeCategoria) =>
    matriz.find((item) => item[0] === nomeCategoria);

// === Atualizar valores da matriz ===
const atualizaValorCategoria = (categoria, valor) =>
    (categoria[1] = somaValor(categoria[1], valor));

const atualizarInterface = () => {
    matrizGastos.forEach(([nome, valor]) => {
        const elemento = obterElemento(nome);
        if (elemento) {
            elemento.textContent = `${nome}: ${formatarValor(valor)}`;
        }
    });
};

// === Função principal ===
function adicionarGastos() {
    const valorInformado = obterValorInformado();
    const categoriaInformada = obterCategoriaInformada();

    if (isNaN(valorInformado)) {
        alert("Digite um valor numérico válido.");
        return;
    }

    if (valorNegativo(valorInformado)) {
        alert("Valor inválido. O valor não pode ser negativo.");
        return;
    }

    const categoria = obterCategoria(matrizGastos, categoriaInformada);
    const total = obterCategoria(matrizGastos, "Total");

    if (!categoria) {
        alert("Categoria não encontrada.");
        return;
    }

    atualizaValorCategoria(categoria, valorInformado);
    atualizaValorCategoria(total, valorInformado);
    atualizarInterface();
    limparCampos();
}

