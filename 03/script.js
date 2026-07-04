const mess_div = document.querySelector('.main');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');


let element = document.createElement('p');
const click = new Audio('click.mp3')

startBtn.addEventListener("click", (e)=>{
    click.currentTime = 0;
    click.play();
    
})