import { db } from "./firebase.js";

import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
async function saveScore(username, score, coins){

await addDoc(collection(db,"players"),{

username: username,
score: score,
coins: coins

});

}
const grid = document.getElementById("board");

let dots = []
let pattern=[];
let playerPattern=[];

let level=1;
let score=0;
let coins=0;

function creategrid(){

for(let i=0;i<16;i++){

let dot=document.createElement("div");

dot.classList.add("dot");

dot.dataset.index=i;

grid.appendChild(dot);

dot.addEventListener("dot",playerClick);

dots.push(dot)
  
}
  
}

function beginRound(){

playerPattern=[];

let random=Math.floor(Math.random()*16);

pattern.push(random);

showPattern();

}

function showPattern(){

let circles=document.querySelectorAll(".circle");

let i=0;

let interval=setInterval(()=>{

let index=pattern[i];

circles[index].classList.add("active");

setTimeout(()=>{

circles[index].classList.remove("active");

},500);

i++;

if(i>=pattern.length){

clearInterval(interval);

}

},700);

}

function playerClick(){

let index=this.dataset.index;

playerPattern.push(Number(index));

checkPattern();

}

function checkPattern(){

let current=playerPattern.length-1;

if(playerPattern[current]!=pattern[current]){

gameOver();

return;

}

if(playerPattern.length==pattern.length){

score++;

coins++;

document.getElementById("score").innerText="Score: "+score;

document.getElementById("coins").innerText="Coins: "+coins;

setTimeout(beginRound,1000);

}

}

function gameOver(){
saveScore("player", score, coins);
alert("Game Over! Score: "+score);

pattern=[];
playerPattern=[];
score=0;

document.getElementById("score").innerText="Score: 0";

}
