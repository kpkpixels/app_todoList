const itens = document.querySelectorAll(".item_coluna");
const colunas = document.querySelectorAll(".itens_coluna");
let draggableItem = null;

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