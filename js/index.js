let itens = document.querySelectorAll(".item_coluna");
let colunas = document.querySelectorAll(".itens_coluna");
const container = document.querySelector(".container");

let draggableItem = null;

let colunasArray = [
    {
        "nome" : "Para Fazer",
        "itens" : []
    },
    {
        "nome" : "Fazendo",
        "itens" : []
    },
    {
        "nome" : "Pronto",
        "itens" : []
    },
];


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

function deletaItem(colunaIndex, itemIndex){
    colunasArray[colunaIndex].itens.forEach(item => {
        if (item == itemIndex){
            console.log("ababab");
        }
    });    
}
function getColunas(){
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

function getItens(){
    colunasArray[colunaIndex].itens.forEach(item => {
        colunas[colunaIndex].innerHTML += 
        '<div draggable="true" class="item_coluna">'+
            '<div class="titulo_item">'+
                '<input type="text" placeholder="Digite um título" value="">'+
                '<span onclick="deletaItem('+colunaIndex+','+index+')"><i class="fa-solid fa-x"></i></span>'+
            '</div>'+
            '<div class="descricao_item">'+
                '<textarea name="" id="" placeholder="Digite uma breve descrição..." cols="30" rows="4"></textarea>'+
            '</div>'+
        '</div> ';
    }); 
}

function addItem(colunaIndex){
    let index = colunasArray[colunaIndex].itens.length + 1;

    colunas[colunaIndex].innerHTML += 
    '<div draggable="true" class="item_coluna">'+
        '<div class="titulo_item">'+
            '<input type="text" placeholder="Digite um título" value="">'+
            '<span onclick="deletaItem('+colunaIndex+','+index+')"><i class="fa-solid fa-x"></i></span>'+
        '</div>'+
        '<div class="descricao_item">'+
            '<textarea name="" id="" placeholder="Digite uma breve descrição..." cols="30" rows="4"></textarea>'+
        '</div>'+
    '</div> ';

    colunasArray[colunaIndex].itens.push(new Item(index, "", ""));
    itens = document.querySelectorAll(".item_coluna");
    adicionaListenerItens();
}


window.onload = function() {
    getColunas();
}