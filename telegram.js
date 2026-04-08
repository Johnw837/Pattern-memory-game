const tg = window.Telegram.WebApp;

tg.expand();

const user = tg.initDataUnsafe.user;

if(user){

console.log("Player:",user.username);

}
