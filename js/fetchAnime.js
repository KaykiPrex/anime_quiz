
const input = document.querySelector("input");
const btnSearch = document.querySelector("button");
const btnUp = document.querySelector("#btn_up");
const btnDown = document.querySelector("#btn_down");
const animeContainer = document.querySelector("#anime-container"); 
const animeRange = 50 ; // Cantidad maxima de anime en el juego
const url= 'https://api.jikan.moe/v3/top/anime/1'; // se puede generar anime o manga por medio de eleccion de usuario

let scoreLeft= 0;
let scoreRight= 0;
let indexNext = 0;
let indexOld = 0;
let nextRound = false;

btnSearch.addEventListener("click", (e) =>{
    e.preventDefault(); 
    crearCard(input.value);
})

btnDown.addEventListener("click",(e) =>{
    e.preventDefault(); 
    compararScoreMenos(scoreLeft,scoreRight);
})
btnUp.addEventListener("click",(e) =>{
    e.preventDefault(); 
    compararScoreMas(scoreLeft,scoreRight);
})

function crearAllCards() {  
        fetch(url) 
        .then(res => res.json())
        .then(data => {
            vaciarContainer();
            crearOldCard(data);
            crearNextcard(data);
        }) 
    
}
function vaciarContainer(){
    while(animeContainer.firstChild){
        animeContainer.removeChild(animeContainer.firstChild);
    }
}
// Se crea el primer card Anime , si pasa de ronda los datos del segundo card pasan al primero 
function crearOldCard(datajson){
    nextRound? indexOld = indexNext : indexOld = RandomNumber(animeRange) ;
    crearAnime(datajson,indexOld);
    scoreLeft = datajson.top[indexOld].score;
}

function crearNextcard(datajson){
    indexNext = RandomNumber(animeRange);
    crearAnime(datajson,indexNext);
    scoreRight = datajson.top[indexNext].score; 
}

//Se crea la vista
function crearAnime(data,pos) {  
    
    const img = document.createElement('img');
    const title = document.createElement('h2');
    const div = document.createElement('div');
    const cardImgOverlay = document.createElement('div');
    const score = document.createElement('h1');

    div.className = 'card text-white';
    img.className = 'card-img';
    cardImgOverlay.className = 'card-img-overlay';
    img.src = data.top[pos].image_url;
    title.textContent = data.top[pos].title; 
    score.textContent = `Score: ${data.top[pos].score}`;

    div.appendChild(img); 
    cardImgOverlay.appendChild(title);
    cardImgOverlay.appendChild(score);
    div.appendChild(cardImgOverlay);
    animeContainer.appendChild(div);    
}

function compararScoreMenos(scoreA,scoreB){
    if (scoreA > scoreB){
        nextRound = true ;
        crearAllCards()  ;
    } 
    else gameOver()  ; 
}
function compararScoreMas(scoreA,scoreB){
    if (scoreA < scoreB){
        nextRound = true ;
        crearAllCards()  ;
    } 
    else gameOver()  ; 
}

function gameOver(){
    vaciarContainer();
    const h1 = document.createElement('h1');
    h1.textContent = 'GAME OVER';
    const div = document.createElement('div');
    div.appendChild(h1);
    animeContainer.appendChild(div);
}

function RandomNumber(range){
    return Math.floor(Math.random() * range);
}

crearAllCards();
