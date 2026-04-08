import { db } from "./firebase.js";

import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
async function saveScore(username, score, coins){

await addDoc(collection(db,"players"),{

username: username,
score: score,
coins: coins

});

}
const board = document.getElementById("board");

let pattern=[];
let playerPattern=[];

let score=0;
let coins=0;

function createBoard(){

for(let i=0;i<16;i++){

let circle=document.createElement("div");

circle.classList.add("circle");

circle.dataset.index=i;

circle.addEventListener("click",playerClick);

board.appendChild(circle);

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
