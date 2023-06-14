const itens = document.querySelectorAll(".item_coluna");
const colunas = document.querySelectorAll(".itens_coluna");
let draggableItem = null;

let itensArray = [];

itens.forEach(item => {
    item.addEventListener("dragstart", arrastarComeca);
    item.addEventListener("dragend", arrastarTermina);
});
colunas.forEach(coluna => {
    coluna.addEventListener("dragover", arrastarPorCima);
    coluna.addEventListener("dragenter", arrastarEntra);
    coluna.addEventListener("dragleave", arrastarSai);
    coluna.addEventListener("drop", arrastarDropa);
});

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

function deletaItem(){
    console.log(this);
    
}

function addItem(colunaIndex){
    colunas[colunaIndex].innerHTML += 
    '<div draggable="true" class="item_coluna">'+
        '<div class="titulo_item">'+
            '<input type="text" placeholder="Digite um título" value="">'+
            '<span onclick="deletaItem()"><i class="fa-solid fa-x"></i></span>'+
        '</div>'+
        '<div class="descricao_item">'+
            '<textarea name="" id="" placeholder="Digite uma breve descrição..." cols="30" rows="4"></textarea>'+
        '</div>'+
    '</div> ';
    
    itensArray.push(itensArray.length + 1);
}