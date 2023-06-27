let itens = document.querySelectorAll(".item_coluna");
let colunas = document.querySelectorAll(".itens_coluna");
const container = document.querySelector(".container");

let draggableItem = null;


let colunasArray = [];

//todo: isso aqui nao vai mais existir quando tiver o backend
function geraColunas(){
    listaColunas = ["Para Fazer", "Fazendo", "Pronto", "Sozuao", "teste"];

    listaColunas.forEach(col => {
        colunasArray.push(new Coluna("", col, []));
    });

    getColunas();
}


function adicionaListenerItens(){
    itens.forEach(item => {
        item.addEventListener("dragstart", arrastarComeca);
        item.addEventListener("dragend", arrastarTermina);
    });
}

function adicionaListenerColunas(){
    colunas.forEach(coluna => {             
        coluna.addEventListener("dragover", arrastarPorCima);
        coluna.addEventListener("dragenter", arrastarEntra);
        coluna.addEventListener("dragleave", arrastarSai);
        coluna.addEventListener("drop", arrastarDropa);
    });
}

function arrastarComeca(){
    draggableItem = this;
}
function arrastarTermina(){
    draggableItem = null;
}
function arrastarPorCima(e){
    e.preventDefault();
}
function arrastarEntra(){    
    this.closest(".coluna").classList.add("colunaAtual");
}
function arrastarSai(){
    this.closest(".coluna").classList.remove("colunaAtual");
}
function arrastarDropa(){
    this.appendChild(draggableItem);
    this.closest(".coluna").classList.remove("colunaAtual");
}

function deletaItem(colunaIndex, id){
    colunasArray[colunaIndex].itens = colunasArray[colunaIndex].itens.filter(item => item.id !== id);

    alert("Item "+ id + " Removido");

    getItens(colunaIndex);   
}
function getColunas(){
    container.innerHTML = "";

    for (let i = 0; i < colunasArray.length; i++) {
        container.innerHTML += 
        '<div class="coluna">'+
            '<div class="nome_coluna">'+
                '<h1>'+colunasArray[i].nome+'</h1>'+
            '</div>'+
            '<div onclick="addItem('+i+')" class="adicionar_item">'+
                '<i class="fa-solid fa-plus"></i>'+
            '</div>'+
            '<div class="itens_coluna"> '+
            '</div>'+
        '</div>';
    }    

    colunas = document.querySelectorAll(".itens_coluna");
    adicionaListenerColunas();
}

function getItens(colunaIndex){
    colunas[colunaIndex].innerHTML = "";

    colunasArray[colunaIndex].itens.forEach(item => {
        colunas[colunaIndex].innerHTML += 
        '<div draggable="true" class="item_coluna">'+
            '<div class="titulo_item">'+
                '<input onchange="setTituloItem('+item.id+','+colunaIndex+', this.value)"  type="text" placeholder="Digite um título" value="'+item.titulo+'">'+
                '<span onclick="deletaItem('+colunaIndex+','+item.id+')"><i class="fa-solid fa-x"></i></span>'+
            '</div>'+
            '<div class="descricao_item">'+
                '<textarea onchange="setDescricaoItem('+item.id+','+colunaIndex+', this.value)" name="" id="" placeholder="Digite uma breve descrição..." cols="30" rows="4">'+item.descricao+'</textarea>'+
            '</div>'+
        '</div> ';
    }); 
    
    itens = document.querySelectorAll(".item_coluna");
    adicionaListenerItens();
}

function addItem(colunaIndex){
    let itensColuna = colunasArray[colunaIndex].itens;

    let index = itensColuna.length > 0 ? itensColuna[itensColuna.length - 1].id + 1 : itensColuna.length + 1;

    colunas[colunaIndex].innerHTML += 
    '<div draggable="true" class="item_coluna">'+
        '<div class="titulo_item">'+
            '<input onchange="setTituloItem('+index+','+colunaIndex+', this.value)" type="text" placeholder="Digite um título" value="">'+
            '<span onclick="deletaItem('+colunaIndex+','+index+')"><i class="fa-solid fa-x"></i></span>'+
        '</div>'+
        '<div class="descricao_item">'+
            '<textarea onchange="setDescricaoItem('+index+','+colunaIndex+', this.value)" name="" id="" placeholder="Digite uma breve descrição..." cols="30" rows="4"></textarea>'+
        '</div>'+
    '</div> ';

    itensColuna.push(new Item(index, "", ""));
    itens = document.querySelectorAll(".item_coluna");
    adicionaListenerItens();
}
function setDescricaoItem(id, colunaId, value){
    const item = colunasArray[colunaId].itens.find(item => item.id === id);    
    if (item) item.descricao = value;
}
function setTituloItem(id, colunaId, value){
    const item = colunasArray[colunaId].itens.find(item => item.id === id);    
    if (item) item.titulo = value;
}


window.onload = function() {
    geraColunas();
}