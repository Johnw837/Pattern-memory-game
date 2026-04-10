import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function saveScore(username, score, coins){
 await addDoc(collection(db,"players"),{
  username: username,
  score: score,
  coins: coins
 });
}

const grid = document.getElementById("grid");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const coinsDisplay = document.getElementById("coins");
const message = document.getElementById("message");

let dots = [];
let pattern = [];
let playerPattern = [];

let level = 1;
let score = 0;
let coins = 0;

function createGrid(){
 for(let i=0;i<16;i++){
  let dot=document.createElement("div");
  dot.classList.add("dot");
  dot.dataset.index=i;

  grid.appendChild(dot);

  dot.addEventListener("click",playerClick);

  dots.push(dot);
 }
}

createGrid();

startBtn.onclick = function(){
 level = 1;
 score = 0;
 startRound();
}

function startRound(){
 playerPattern=[];
 pattern=[];

 generatePattern();
 showPattern();
}

function generatePattern(){
 for(let i=0;i<level+2;i++){
  let random=Math.floor(Math.random()*16);
  pattern.push(random);
 }
}

function showPattern(){

 message.textContent="Watch the pattern";

 let i=0;

 let interval=setInterval(()=>{

  let index=pattern[i];

  dots[index].classList.add("active");

  setTimeout(()=>{
   dots[index].classList.remove("active");
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
  level++;

  scoreDisplay.innerText="Score: "+score;
  coinsDisplay.innerText="Coins: "+coins;

  message.textContent="Correct!";


 }

}

function gameOver(){

 saveScore("player", score, coins);

 alert("Game Over! Score: "+score);

 pattern=[];
 playerPattern=[];
 score=0;

 scoreDisplay.innerText="Score: 0";

     }
